# Bloomere Studio

Loja online de digital art prints para a Bloomere Studio — [bloommerestudio.etsy.com](https://bloommerestudio.etsy.com).

> *Where soft art quietly blooms* — Márcia Firmo, Lisboa, Portugal

---

## Stack técnica

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** + design system personalizado (paleta Bloomere)
- **Shadcn/ui** — componentes de interface
- **Stripe** — pagamentos + webhooks para digital downloads
- **Prisma** + **SQLite** (dev) / PostgreSQL (prod)
- Tipografia: Cormorant Garamond (display) + DM Sans (body)

## Funcionalidades

- 36 produtos em 3 categorias (Botanical Prints, Fruit Prints, Soft Landscapes)
- Carrinho persistente no lado do cliente
- Checkout com Stripe (cartão)
- Webhook Stripe → cria ordem + tokens de download com expiração 48h
- Página de sucesso com links de download
- Filtro por categoria
- SEO com metadata por página
- Design responsivo (mobile-first)
- "Bloom" hover effect — assinatura visual única

## Instalação local

```bash
git clone https://github.com/Papoite282/bloomere.git
cd bloomere
npm install

# Copiar env
cp .env.example .env
# Preencher STRIPE_SECRET_KEY e STRIPE_WEBHOOK_SECRET

# Base de dados
npx prisma migrate dev --name init
npm run db:seed

# Arrancar
npm run dev
```

Abrir em: `http://localhost:3000`

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | `file:./dev.db` (local) ou URL PostgreSQL (prod) |
| `STRIPE_SECRET_KEY` | Chave secreta Stripe (sk_test_...) |
| `STRIPE_PUBLISHABLE_KEY` | Chave pública Stripe (pk_test_...) |
| `STRIPE_WEBHOOK_SECRET` | Secret do webhook Stripe (whsec_...) |
| `NEXT_PUBLIC_BASE_URL` | URL base da aplicação |

## Comandos úteis

```bash
npm run dev           # Servidor de desenvolvimento
npm run build         # Build de produção
npm run db:seed       # Popular BD com 36 produtos
npm run db:studio     # Prisma Studio (UI de BD)
npm run db:reset      # Reset completo da BD + seed
```

## Estrutura do projecto

```
bloomere/
├── prisma/
│   ├── schema.prisma     # Modelos: Product, Order, Download
│   └── seed.ts           # 36 produtos Bloomere
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home
│   │   ├── shop/             # Listagem + produto individual
│   │   ├── about/            # Sobre a artista
│   │   ├── success/          # Pós-pagamento + downloads
│   │   └── api/
│   │       ├── checkout/     # Cria sessão Stripe
│   │       └── webhooks/stripe/ # Processa pagamento
│   ├── components/
│   │   ├── layout/       # Header, Footer
│   │   ├── shop/         # ProductCard, Grid, Filter
│   │   └── cart/         # CartProvider, CartDrawer
│   ├── lib/              # prisma, stripe, utils
│   └── types/            # Tipos TypeScript
└── README.md
```

## Deploy (Vercel recomendado)

1. Push para GitHub
2. Importar projecto na Vercel
3. Definir variáveis de ambiente
4. Adicionar webhook no dashboard Stripe: `https://dominio.vercel.app/api/webhooks/stripe`
5. Migrar BD para PostgreSQL (Neon ou Supabase)

---

Desenvolvido por **Eduardo Carvalho** para a **Bloomere Studio** · 2026
