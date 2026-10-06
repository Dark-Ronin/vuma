# VUMA — Documentação do frontend

Mapa completo do que existe no projeto: estrutura, rotas, fluxos, dados, regras, componentes e limites.
Estado: **protótipo navegável**, sem backend. Tudo o que parece "real" (carrinho, pedidos, favoritos) vive no navegador.

---

## 1. Visão geral

| Item | Valor |
|---|---|
| Stack | React 18, Vite 5, React Router DOM 6, CSS próprio |
| Linguagem | JavaScript (JSX), sem TypeScript |
| Dependências de runtime | `react`, `react-dom`, `react-router-dom` (mais nada) |
| Persistência | `localStorage` (4 chaves, ver secção 6) |
| Backend / API / auth / pagamentos | **Não existem** |
| Tamanho | 45 ficheiros em `src/`, ~2.300 linhas |
| Moeda | MT, formatada como `45.000 MT` |
| Idioma da interface | Português |

**Como correr**

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # build de produção em dist/
npm run preview  # servir o build
```

---

## 2. Estrutura de pastas

```
src/
├── main.jsx                 Ponto de entrada: BrowserRouter + StoreProvider + App
├── App.jsx                  Só as rotas
├── index.css                Todo o CSS (tokens no topo, responsivo no fim)
├── config.js                Marca, entrega, pagamentos, províncias
│
├── layouts/
│   ├── StoreLayout.jsx      Header + <Outlet/> + Footer + toast + scroll ao topo
│   └── AccountLayout.jsx    Navegação lateral da conta (Perfil/Pedidos/Endereços/Favoritos)
│
├── context/
│   └── StoreContext.jsx     Estado global: carrinho, favoritos, pedidos, endereços, toast
│
├── data/                    Dados mockados (separados dos componentes)
│   ├── products.js          32 produtos + getProduct(id)
│   ├── categories.js        9 categorias
│   ├── sellers.js           5 vendedores
│   ├── orders.js            5 pedidos, endereços iniciais, ORDER_STEPS, buildOrder()
│   └── reviews.js           8 avaliações-modelo + getReviews(productId)
│
├── utils/
│   ├── helpers.js           formatMT, formatDate, norm, matchesSearch, discountPct, shippingFor
│   └── placeholder.js       Gera imagens SVG provisórias dos produtos
│
├── components/              Peças reutilizáveis (ver secção 8)
│
└── pages/
    ├── store/               Home, Products, ProductDetails, Cart, Checkout,
    │                        OrderSuccess, OrderDetails, InfoPage, NotFound
    ├── account/             Profile, Orders, Addresses, Wishlist
    └── seller/              Stores, SellerStore
```

---

## 3. Rotas

Todas definidas em `App.jsx`. Há dois layouts aninhados: `StoreLayout` envolve tudo; `AccountLayout` envolve só as páginas de conta.

| URL | Página | Layout | Notas |
|---|---|---|---|
| `/` | `Home` | Store | Hero, categorias, ofertas, mais vendidos, lojas |
| `/products` | `Products` | Store | Catálogo; lê filtros do URL (secção 4) |
| `/products/:id` | `ProductDetails` | Store | Produto inexistente mostra estado vazio |
| `/cart` | `Cart` | Store | Vazio mostra CTA para voltar às compras |
| `/checkout` | `Checkout` | Store | 3 passos; carrinho vazio mostra aviso |
| `/orders/:id` | `OrderDetails` | Store | Timeline de estado, produtos, endereço, total |
| `/orders/:id/success` | `OrderSuccess` | Store | Página de confirmação logo após comprar |
| `/stores` | `Stores` | Store | Lista de lojas |
| `/stores/:id` | `SellerStore` | Store | Loja do vendedor |
| `/info/:slug` | `InfoPage` | Store | `about`, `contact`, `help`, `shipping`, `returns`, `terms`, `privacy`, `sell` |
| `/profile` | `Profile` | Store + Conta | |
| `/orders` | `Orders` | Store + Conta | Histórico |
| `/addresses` | `Addresses` | Store + Conta | |
| `/wishlist` | `Wishlist` | Store + Conta | |
| `*` | `NotFound` | Store | |

> A página de sucesso está em `/orders/:id/success` (e não em `/orders/:id`) porque as duas páginas precisam de URLs diferentes. O botão "Acompanhar pedido" leva de uma para a outra.

---

## 4. Parâmetros do catálogo (`/products`)

Todo o estado dos filtros vive no URL, por isso qualquer pesquisa ou filtro pode ser partilhado como link.

| Parâmetro | Exemplo | Efeito |
|---|---|---|
| `search` | `?search=samsung` | Procura em nome, categoria e vendedor (sem acentos, todas as palavras têm de existir) |
| `category` | `?category=audio` | Id da categoria |
| `seller` | `?seller=tech-store` | Id do vendedor |
| `price` | `?price=5000-15000` | Faixas: `0-5000`, `5000-15000`, `15000-40000`, `40000-` |
| `rating` | `?rating=4.5` | Avaliação mínima (`4` ou `4.5`) |
| `stock` | `?stock=1` | Só produtos em stock |
| `deal` | `?deal=1` | Só produtos em promoção |
| `sort` | `?sort=price-asc` | `relevance` (padrão), `bestsellers`, `price-asc`, `price-desc`, `rating`, `newest` |

Atalhos do header: **Ofertas** = `?deal=1`, **Mais vendidos** = `?sort=bestsellers`, **Novidades** = `?sort=newest`.

Ordenação "Relevância": produtos `featured` primeiro, depois por mais vendidos. "Mais recentes" ordena por `id` decrescente.

---

## 5. Jornada do cliente (o que acontece em cada passo)

1. **Home** — navegação por categoria, oferta, mais vendido ou loja; pesquisa no header.
2. **Pesquisa** — ao escrever 2+ letras aparecem até 5 sugestões; Enter ou o botão vai para `/products?search=...`.
3. **Produto** — galeria (3 imagens), preço, vendedor, stock, quantidade, **Adicionar ao carrinho** (mostra aviso) ou **Comprar agora** (adiciona e vai direto para `/checkout`).
4. **Carrinho** — altera quantidade (limitada ao stock), remove, vê subtotal, desconto, entrega e total. Mostra quanto falta para entrega grátis.
5. **Checkout**
   - **Passo 1 Endereço:** escolhe um endereço guardado ou preenche um novo (validação: nome, telefone com 9+ dígitos, cidade, bairro, endereço). Pode guardá-lo na conta.
   - **Passo 2 Entrega:** normal ou expressa. O preço atualiza o total.
   - **Passo 3 Pagamento:** M-Pesa, e-Mola, Cartão ou Pagamento na entrega. Só seleciona, não cobra nada.
   - Passos concluídos ficam clicáveis para voltar.
6. **Confirmar pedido** — cria o pedido localmente, esvazia o carrinho, vai para `/orders/VUM-xxxxx/success`.
7. **Sucesso** — número do pedido, endereço, entrega, pagamento, produtos. Botão "Acompanhar pedido".
8. **Detalhes do pedido** — timeline de 6 estados com o atual destacado, produtos (com vendedor), endereço, entrega, pagamento, totais.
9. **Histórico** (`/orders`) — todos os pedidos, mais recentes primeiro.
10. **Conta, favoritos, lojas** — ver as respetivas páginas na secção 7.

---

## 6. Estado e persistência

Tudo em `context/StoreContext.jsx`, acessível com `const { ... } = useStore()`.

**Chaves no `localStorage`**

| Chave | Conteúdo |
|---|---|
| `vuma_cart` | `[{ id, qty }]` |
| `vuma_wishlist` | `[id, id, ...]` |
| `vuma_orders` | Pedidos criados pelo utilizador (os 5 mockados não são guardados, vêm do código) |
| `vuma_addresses` | Lista de endereços (começa com 2) |

Para "reiniciar" a loja: apagar estas chaves nas ferramentas do navegador (Application → Local Storage).

**O que o `useStore()` devolve**

| Nome | Descrição |
|---|---|
| `lines` | Linhas do carrinho já com o produto: `{ id, qty, product }` |
| `cartCount`, `itemsTotal`, `originalTotal` | Nº de unidades; total a preço atual; total a preço anterior |
| `addToCart(id, qty = 1, silent = false)` | Adiciona (respeita stock; ignora produtos esgotados) |
| `setQty(id, qty)` | Define quantidade (menos de 1 remove) |
| `removeFromCart(id)` | Remove |
| `wishlist`, `toggleWishlist(id)`, `isWished(id)` | Favoritos |
| `orders`, `getOrder(id)` | Pedidos do utilizador + 5 mockados |
| `placeOrder({ address, deliveryId, paymentId })` | Cria pedido, esvazia carrinho, devolve o pedido |
| `addresses`, `addAddress(a)`, `removeAddress(id)` | Endereços |
| `toast` | Mensagem de aviso atual (o `StoreLayout` mostra-a) |

---

## 7. Páginas, uma a uma

**Home** — Hero com 3 produtos fixos (ids 1, 9, 13), faixa de vantagens, 9 categorias, 5 maiores descontos, banner de entrega grátis, 8 mais vendidos, 5 lojas, banner "Vender na VUMA".

**Products** — título dinâmico, contagem, ordenação, filtros laterais (no mobile abrem com o botão "Filtros"), grelha, estado "nenhum produto encontrado" com botão para limpar.

**ProductDetails** — migalhas de pão, galeria, preço/desconto, estado de stock (`Em stock`, `Últimas N unidades` se ≤ 5, `Indisponível`), quantidade, comprar, favorito, entrega/garantia/devolução, descrição, tabela de especificações, card do vendedor, 3 avaliações, 4 produtos relacionados (mesma categoria primeiro). Produto esgotado não mostra botões de compra.

**Cart / Checkout / OrderSuccess / OrderDetails** — ver secção 5.

**Profile** — dados pessoais fixos (Ana Machava, utilizador de demonstração), contadores com ligação para pedidos/endereços/favoritos, definições (SMS, ofertas por e-mail, idioma). As definições **não são guardadas**.

**Orders** — lista com miniaturas, número, data, estado, nº de produtos, total e botão "Ver pedido".

**Addresses** — lista, adicionar (formulário), remover.

**Wishlist** — grelha com os favoritos (cada card já tem o botão de adicionar ao carrinho) ou estado vazio.

**Stores / SellerStore** — loja com banner, logo, avaliação, descrição, dados (desde, localização, seguidores, expedição), filtro por categoria e produtos. "Seguir loja" alterna e soma 1 aos seguidores, mas **não é guardado**.

**InfoPage** — textos curtos para Sobre, Contacto, Ajuda, Entregas, Devoluções, Termos, Privacidade e Vender. **Termos e Privacidade são texto provisório.**

---

## 8. Componentes (`src/components/`)

| Componente | Props principais | Para quê |
|---|---|---|
| `Button` | `to?`, `variant` (primary/secondary/accent/ghost), `size` (sm/md/lg), `block` | Botão ou link com aspeto de botão |
| `Badge` | `variant` (deal/new/ok/ink/muted/danger) | Etiquetas (desconto, novo, estado) |
| `Rating` | `value`, `count?` | Estrelas + nota + nº de avaliações |
| `Price` | `price`, `oldPrice?`, `size` (sm/md/lg) | Preço atual e riscado |
| `QuantitySelector` | `value`, `onChange`, `max` | − / + |
| `ProductCard` | `product` | Card completo: favorito, badges, rating, preço, vendedor, adicionar. O card inteiro abre o produto |
| `ProductGrid` | `products` | Grelha de ProductCards |
| `CategoryCard` | `category` | Atalho para `/products?category=...` |
| `SellerCard` / `SellerLogo` | `seller` / `seller`, `size` | Card de loja; logo com iniciais |
| `CartItem` | `line` | Linha do carrinho |
| `OrderSummary` | `originalTotal`, `itemsTotal`, `shipping`, `title?`, `children` | Subtotal/Desconto/Entrega/Total (usado em carrinho, checkout e pedido) |
| `OrderStatus` | `current` (0 a 5) | Timeline de estados |
| `EmptyState` | `icon`, `title`, `text`, `actionTo`, `actionLabel` | Qualquer ecrã vazio |
| `SearchBar` | `onDone?` | Pesquisa com sugestões |
| `Header` (+ `Logo`) | — | Barra principal, barra de navegação, menu mobile |
| `Footer` | — | Rodapé |

---

## 9. Dados

### 9.1 Produto (`data/products.js`)

```js
{
  id, name, description,
  category, categoryName,        // categoria (id e nome)
  seller, sellerId,              // vendedor (nome e id)
  price, oldPrice, discount,     // discount é calculado: % entre price e oldPrice
  rating, reviews,               // nota e nº de avaliações
  stock, sold,                   // stock atual e vendidos (usado na ordenação)
  specifications,                // objeto { Nome: 'valor' }
  images,                        // 3 imagens (hoje SVG gerados)
  featured, bestSeller, isNew    // calculados / marcados
}
```

- `featured` = vendidos ≥ 500 ou (tem promoção e nota ≥ 4,5).
- `bestSeller` = vendidos ≥ 400.
- `isNew` = ids 2, 9, 12, 17, 20, 28, 31, 32 (lista `NEW_IDS`).
- Dados "em bruto" ficam numa tabela de arrays no topo do ficheiro; é aí que se edita.

### 9.2 Catálogo atual

32 produtos, 18 com promoção, 1 esgotado (id 24, Ferro a Vapor, para testar o estado "Indisponível").

| Categoria (id) | Produtos | Vendedor | Produtos |
|---|---|---|---|
| Smartphones (`smartphones`) | 4 | Mobile Zone (`mobile-zone`) | 7 |
| Computadores (`computadores`) | 4 | Tech Store (`tech-store`) | 8 |
| Eletrônicos (`eletronicos`) | 4 | Audio House (`audio-house`) | 5 |
| Áudio (`audio`) | 4 | Casa & Cia (`casa-cia`) | 7 |
| Câmeras (`cameras`) | 3 | Office Pro (`office-pro`) | 5 |
| Casa (`casa`) | 5 | | |
| Moda (`moda`) | 2 | | |
| Escritório (`escritorio`) | 4 | | |
| Acessórios (`acessorios`) | 2 | | |

### 9.3 Vendedor (`data/sellers.js`)

`{ id, name, initials, hue, rating, reviews, since, city, followers, dispatch, description }`. O nº de produtos de cada loja é **calculado** a partir dos produtos, não guardado.

### 9.4 Categoria (`data/categories.js`)

`{ id, name, icon, hue }`. O `icon` é um emoji e o `hue` dá a cor de fundo do card.

### 9.5 Pedido (`data/orders.js`)

```js
{
  id: 'VUM-48281', date, status,          // status: índice 0 a 5 em ORDER_STEPS
  lines: [{ id, name, image, seller, sellerId, price, oldPrice, qty }],
  address, deliveryId, paymentId,
  itemsTotal, originalTotal, shipping, total
}
```

As linhas guardam uma **cópia** do nome, imagem e preço no momento da compra. Se o preço do produto mudar depois, o pedido antigo não muda.

Estados (`ORDER_STEPS`): 0 Pedido realizado, 1 Pagamento confirmado, 2 Preparando pedido, 3 Enviado, 4 Em trânsito, 5 Entregue.

Pedidos mockados:

| Número | Estado | Entrega | Pagamento |
|---|---|---|---|
| VUM-48281 | 0 Pedido realizado | Normal | Na entrega |
| VUM-48260 | 2 Preparando | Expressa | M-Pesa |
| VUM-48237 | 4 Em trânsito | Normal | e-Mola |
| VUM-48102 | 5 Entregue | Normal | M-Pesa |
| VUM-47955 | 5 Entregue | Expressa | Cartão |

### 9.6 Endereço

`{ id, label, name, phone, province, city, district, street }`. Começa com 2 (Casa e Trabalho).

### 9.7 Imagens

`utils/placeholder.js` gera um SVG por produto (emoji da categoria + nome). Para usar fotos reais, troque `images` em `data/products.js` por URLs. O resto do código só usa `product.images[n]`.

---

## 10. Regras de negócio mockadas

| Regra | Valor | Onde mudar |
|---|---|---|
| Entrega normal | 250 MT, 2 a 4 dias úteis | `config.js` → `DELIVERY_OPTIONS` |
| Entrega expressa | 600 MT, 24 h (Maputo e Matola) | `config.js` |
| Entrega normal grátis | a partir de 10.000 MT | `config.js` → `FREE_SHIPPING_FROM` |
| Entrega expressa | nunca é grátis | `utils/helpers.js` → `shippingFor` |
| Subtotal | soma dos preços **anteriores** | `OrderSummary` / `StoreContext` |
| Desconto | subtotal − soma dos preços atuais (informativo) | idem |
| Total | preços atuais + entrega | idem |
| Quantidade máxima | o stock do produto | `StoreContext` |
| Número do pedido | `VUM-` + 5 dígitos aleatórios, sem repetir | `StoreContext.placeOrder` |
| Estado inicial do pedido | 0 se pagamento na entrega, senão 1 | `StoreContext.placeOrder` |
| Devolução / garantia | 7 dias / campo `Garantia` do produto (12 meses se não houver) | `ProductDetails` |
| Pagamentos | M-Pesa, e-Mola, Cartão, Na entrega (só seleção) | `config.js` → `PAYMENT_OPTIONS` |

---

## 11. Design e CSS

Um único ficheiro, `index.css`, organizado por secções (tokens, botões, header, footer, home, cards, catálogo, produto, carrinho/checkout, pedido, conta, loja, estados vazios, responsivo).

**Tokens (topo do ficheiro, `:root`)**

| Token | Valor | Uso |
|---|---|---|
| `--brand` | `#0e5a3c` | Verde da marca, header, botões principais |
| `--brand-dark` | `#0a4530` | Hover, banner escuro |
| `--brand-tint` | `#e3efe8` | Fundos suaves, item selecionado |
| `--accent` | `#f2b400` | Amarelo: promoções, pesquisa, CTA principal da Home |
| `--ink` | `#16201b` | Texto |
| `--muted` | `#5b6760` | Texto secundário |
| `--line` | `#dce1db` | Bordas |
| `--bg` | `#f3f5f2` | Fundo da página |

**Tipografia:** *Bricolage Grotesque* (títulos e preços) e *Figtree* (texto), carregadas do Google Fonts em `index.html`, com fontes do sistema como alternativa.

**Breakpoints:** `1000px` (tablet: filtros recolhem, colunas empilham, header simplifica) e `760px` (mobile: pesquisa numa linha própria, menu em gaveta, grelhas a 2 colunas).

**Convenções:** classes simples por componente (`.pcard`, `.citem`, `.summary`, `.timeline`...). Sem CSS-in-JS, sem módulos. As poucas cores dinâmicas usam a variável CSS `--hue`.

---

## 12. Acessibilidade

- HTML semântico (`header`, `nav`, `main`, `footer`, `aside`, `fieldset/legend`, tabelas com `th scope`).
- Link "Saltar para o conteúdo".
- Botões reais, `aria-label` nos ícones, `aria-pressed` nos favoritos/seguir, `aria-current="step"` nos passos e na timeline.
- `alt` em todas as imagens de produto; imagens decorativas com `alt=""`.
- Campos com `label`, erros ligados com `aria-describedby`.
- Foco visível, avisos com `role="status"`, animações desligadas com `prefers-reduced-motion`.
- Card de produto inteiro clicável com "link esticado" (um só link por card, botões independentes).

---

## 13. O que é mock e o que não existe

**É simulado:** todos os dados, o pagamento, a confirmação do pagamento, a evolução do estado do pedido (nunca avança sozinho), o utilizador (Ana Machava), as avaliações (8 modelos reaproveitados), as imagens.

**Não existe:** login/registo, backend, base de dados, pagamentos reais, emails/SMS, painel de vendedor ou de administração, escrever avaliações, cupões, comparação de produtos, paginação do catálogo (mostra tudo), pesquisa por voz/imagem, tradução (só português).

**Limitações conhecidas**
- Os dados de `localStorage` são por navegador; limpar os dados do site apaga carrinho, pedidos e endereços criados.
- Se mudar preços ou stock em `products.js`, o carrinho guardado usa os valores novos, mas pedidos antigos mantêm os valores da compra.
- Endereços dos 5 pedidos mockados são cópias fixas; apagar um endereço da conta não os afeta.
- A Home usa 3 produtos fixos no hero (ids 1, 9, 13). Se apagar um deles, a Home quebra.
- Definições do perfil e "Seguir loja" não persistem.
- O layout foi verificado por build e testes de renderização/fluxo, **não** por inspeção visual em browsers reais. Vale rever manualmente em desktop e telemóvel.

---

## 14. Receitas rápidas

| Quero... | Faço |
|---|---|
| Mudar o nome da marca | `config.js` → `BRAND.name` (e o `<title>` em `index.html`) |
| Mudar as cores | `:root` no topo de `index.css` |
| Adicionar um produto | Nova linha no array `raw` em `data/products.js` (id novo, `category` e `sellerId` existentes) |
| Adicionar uma categoria | Nova entrada em `data/categories.js` |
| Adicionar uma loja | Nova entrada em `data/sellers.js` |
| Usar fotos reais | Substituir `images` do produto por URLs |
| Mudar custos de entrega | `config.js` |
| Mudar o estado de um pedido de teste | Campo `status` (0 a 5) em `data/orders.js` |
| Adicionar uma página institucional | Nova entrada em `PAGES` em `pages/store/InfoPage.jsx` e, se quiser, um link no `Footer.jsx` |
| Adicionar um método de pagamento | `PAYMENT_OPTIONS` em `config.js` |
| Mudar os links do header | Constante `NAV` em `components/Header.jsx` |

---

## 14.1 Ponte para o futuro backend

Entidades que o frontend já pressupõe (para quando for desenhar o backend):

- **Produto** (pertence a 1 categoria e 1 vendedor; tem preço, preço anterior, stock, especificações, imagens)
- **Categoria**
- **Vendedor/Loja** (tem produtos, avaliação, descrição, localização, prazo de expedição)
- **Cliente** e **Endereço**
- **Carrinho** (hoje local)
- **Pedido** com **linhas** (cópia de nome/preço no momento da compra), endereço, método de entrega, método de pagamento, totais e **estado**
- **Avaliação** (produto, autor, nota, texto, data)
- **Favorito** (cliente + produto)

Perguntas de negócio que o protótipo deixa em aberto: um pedido com produtos de vários vendedores gera um pedido único ou sub-pedidos por vendedor? Quem calcula a entrega (plataforma ou loja)? Como e quando se faz o repasse ao vendedor? Quem valida o pagamento M-Pesa/e-Mola? Hoje o frontend trata tudo como um único pedido com entrega única.
