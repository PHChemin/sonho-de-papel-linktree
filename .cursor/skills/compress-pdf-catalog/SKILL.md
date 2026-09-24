---
name: compress-pdf-catalog
description: >-
  Compress catalog/product PDFs for static landings and linktrees with PyMuPDF
  rewrite_images, keeping the original file and avoiding black or blurred photos.
  Use when the user asks to compress, optimize, or shrink a PDF catalog, fix
  black/blurred images after compression, or prepare public/catalogo.pdf for
  GitHub Pages.
---

# Compress PDF catalog

## Rules

1. **Never delete** the source PDF. Write a separate optimized file.
2. **Never** replace image streams with `doc.update_stream(xref, jpeg_bytes)` — that turns product photos **black**.
3. Prefer `Document.rewrite_images(...)` then `save(garbage=4, deflate=True, ...)`.
4. Keep **`lossless=False` by default** so PNG + soft-mask art is not crushed (blur on section covers / small product shots).
5. After compress, **verify** image-heavy pages (spot-check renders or `--verify-pages`).
6. Gitignore heavy originals (e.g. `public/catalogo-original.pdf`). Commit only the optimized site PDF.

## Defaults (this project)

| Role | Path |
| --- | --- |
| Original (local only) | `public/catalogo-original.pdf` |
| Site CTA | `public/catalogo.pdf` |

Dependency: `pip install pymupdf` (or `pymupdf` already available).

## Run

From the repo root:

```bash
python3 .cursor/skills/compress-pdf-catalog/scripts/compress_pdf.py \
  public/catalogo-original.pdf \
  -o public/catalogo.pdf
```

Custom source/output:

```bash
python3 .cursor/skills/compress-pdf-catalog/scripts/compress_pdf.py \
  path/to/original.pdf \
  -o path/to/site.pdf \
  --verify-pages 4,15,16
```

Flags:

- `--dpi-threshold 200` / `--dpi-target 160` / `--quality 82` — milder downscale
- `--lossless` — also recompress PNG (smaller file, **risk of blur**; avoid unless verified)
- `--verify-pages 15,16` — flag images that display large but raster tiny

## If images look wrong

| Symptom | Cause | Fix |
| --- | --- | --- |
| Photos solid **black** | Bad `update_stream` rewrite | Re-run from original with this script only |
| Soft / pixelated section art | `lossless=True` or low `dpi_target` | Re-run **without** `--lossless`; raise `--dpi-target` (e.g. 160–180) |
| File still huge (>15–20 MB) | Photo-heavy catalog | Slightly lower `--quality` (70–75); if still huge, host PDF externally |

## Do not

- Embed a PDF viewer in the linktree page
- Commit originals > ~20 MB without asking
- Force-download as the only catalog CTA (prefer open in new tab to `/catalogo.pdf`)
