# Deploy — GitHub Pages e domínio

Domínio do cliente: **sonhodepapelartes.com.br**  
Repo: `PHChemin/sonho-de-papel-linktree`  
Site Pages padrão: `https://phchemin.github.io/sonho-de-papel-linktree/`

## 1. Ativar Pages com Actions (uma vez)

1. No GitHub: **Settings → Pages**
2. Em **Build and deployment → Source**, escolha **GitHub Actions**
3. Push na `main` (ou rode o workflow em **Actions**)
4. O workflow `.github/workflows/deploy.yml` faz: `npm ci` → `npm run build` → publica `dist/`

> Com domínio custom e `base: './'`, não precisa de `VITE_BASE_PATH`.

## 2. Domínio personalizado no GitHub

1. **Settings → Pages → Custom domain** → `sonhodepapelartes.com.br` → Save
2. Aguarde a checagem DNS (pode levar minutos a algumas horas)
3. Quando OK, marque **Enforce HTTPS**

O arquivo `public/CNAME` já contém o domínio e é publicado com o site, para o custom domain não sumir a cada deploy.

## 3. DNS no Registro.br

Painel: [registro.br](https://registro.br) → domínio **sonhodepapelartes.com.br** → **DNS** / **Editar zona**.

### Apex (raiz) + www (recomendado)

| Tipo | Nome | Dados / valor |
| --- | --- | --- |
| **A** | `@` (ou em branco) | `185.199.108.153` |
| **A** | `@` | `185.199.109.153` |
| **A** | `@` | `185.199.110.153` |
| **A** | `@` | `185.199.111.153` |
| **CNAME** | `www` | `phchemin.github.io` |

Opcional (IPv6):

| Tipo | Nome | Dados |
| --- | --- | --- |
| **AAAA** | `@` | `2606:50c0:8000::153` |
| **AAAA** | `@` | `2606:50c0:8001::153` |
| **AAAA** | `@` | `2606:50c0:8002::153` |
| **AAAA** | `@` | `2606:50c0:8003::153` |

### Se o Registro.br já tiver registros antigos

- Remova **A / AAAA / CNAME** conflitantes do `@` e do `www` antes de salvar.
- Não use o “hospedagem de e-mail / parking” do Registro.br no mesmo apex se ele criar A records próprios.
- Propagação: minutos a **48h**. Enquanto isso o `*.github.io` já funciona.

### Conferir

```bash
dig sonhodepapelartes.com.br +short
dig www.sonhodepapelartes.com.br +short
```

Os A do apex devem ser os IPs do GitHub; o `www` deve apontar para `phchemin.github.io`.

## 4. Fluxo local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview  # testa o build
```

## 5. Checklist de entrega

- [ ] Source do Pages = GitHub Actions
- [ ] Último workflow em verde
- [ ] Custom domain `sonhodepapelartes.com.br` + **Enforce HTTPS**
- [ ] DNS no Registro.br (4× A + CNAME www)
- [ ] Catálogo PDF abre em nova aba
- [ ] WhatsApp e Instagram abrem corretamente
- [ ] Favicon (pássaro) e preview de link (og:image) ok
