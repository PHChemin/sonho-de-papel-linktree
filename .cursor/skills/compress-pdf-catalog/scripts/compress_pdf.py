#!/usr/bin/env python3
"""Compress a catalog PDF for static sites while preserving soft-mask images.

Keeps the source file. Writes an optimized copy. Never use update_stream on
image xrefs — that turns product photos black.

Requires: pip install pymupdf
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path


def compress(
    source: Path,
    output: Path,
    *,
    dpi_threshold: int = 200,
    dpi_target: int = 160,
    quality: int = 82,
    lossless: bool = False,
) -> None:
    import fitz

    if not source.is_file():
        raise FileNotFoundError(f"Source PDF not found: {source}")

    doc = fitz.open(source)
    page_count = doc.page_count
    original_mb = source.stat().st_size / 1e6

    # lossy=True recompresses JPEGs. lossless=False avoids crushing PNG+smask
    # (those became ~94px and looked blurred on catalog pages 15–16).
    doc.rewrite_images(
        dpi_threshold=dpi_threshold,
        dpi_target=dpi_target,
        quality=quality,
        lossy=True,
        lossless=lossless,
        bitonal=True,
        color=True,
        gray=True,
        set_to_gray=False,
    )

    output.parent.mkdir(parents=True, exist_ok=True)
    doc.save(
        output,
        garbage=4,
        deflate=True,
        deflate_images=True,
        deflate_fonts=True,
        clean=True,
    )
    doc.close()

    out_mb = output.stat().st_size / 1e6
    print(
        f"OK pages={page_count} {original_mb:.1f}MB → {out_mb:.1f}MB\n"
        f"  source: {source}\n"
        f"  output: {output}"
    )


def verify_pages(pdf: Path, pages: list[int], min_side: int = 200) -> int:
    """Return number of suspiciously tiny images on 1-based page numbers."""
    import fitz

    doc = fitz.open(pdf)
    issues = 0
    for page_no in pages:
        if page_no < 1 or page_no > doc.page_count:
            print(f"WARN page {page_no} out of range")
            continue
        page = doc[page_no - 1]
        for img in page.get_images(full=True):
            xref = img[0]
            pix = fitz.Pixmap(doc, xref)
            rects = page.get_image_rects(xref)
            display = max((max(r.width, r.height) for r in rects), default=0)
            if display >= 180 and max(pix.width, pix.height) < min_side:
                issues += 1
                print(
                    f"BLUR RISK p{page_no} xref={xref} "
                    f"pix={pix.width}x{pix.height} display≈{display:.0f}"
                )
    doc.close()
    if issues == 0:
        print(f"Verify OK — no tiny images on pages {pages}")
    return issues


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Compress catalog PDF for GitHub Pages / linktree."
    )
    parser.add_argument(
        "source",
        nargs="?",
        default="public/catalogo-original.pdf",
        type=Path,
        help="Original PDF (kept intact)",
    )
    parser.add_argument(
        "-o",
        "--output",
        default="public/catalogo.pdf",
        type=Path,
        help="Optimized PDF for the site",
    )
    parser.add_argument("--dpi-threshold", type=int, default=200)
    parser.add_argument("--dpi-target", type=int, default=160)
    parser.add_argument("--quality", type=int, default=82)
    parser.add_argument(
        "--lossless",
        action="store_true",
        help="Also recompress PNG/lossless (can blur soft-mask art — off by default)",
    )
    parser.add_argument(
        "--verify-pages",
        default="15,16",
        help="Comma-separated 1-based pages to check for over-downsampling",
    )
    args = parser.parse_args()

    try:
        compress(
            args.source,
            args.output,
            dpi_threshold=args.dpi_threshold,
            dpi_target=args.dpi_target,
            quality=args.quality,
            lossless=args.lossless,
        )
    except Exception as exc:  # noqa: BLE001 — CLI surface
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1

    pages = [int(p.strip()) for p in args.verify_pages.split(",") if p.strip()]
    if pages:
        issues = verify_pages(args.output, pages)
        if issues:
            print(
                "HINT: re-run without --lossless (default) or raise --dpi-target",
                file=sys.stderr,
            )
            return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
