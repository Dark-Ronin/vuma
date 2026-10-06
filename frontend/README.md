# VUMA — frontend (protótipo navegável)

React + Vite + React Router + CSS próprio. Sem backend: carrinho, favoritos, endereços e pedidos ficam no `localStorage`.

## Usar no projeto existente
1. Copie a pasta `src/` (substitui a atual) e o `index.html` para o seu projeto.
2. `npm install react-router-dom`
3. `npm run dev`

## Onde mexer
- `src/config.js` — nome da marca, entrega, pagamentos, províncias
- `src/index.css` — cores da marca no topo (`:root`)
- `src/data/` — produtos, categorias, lojas, pedidos (trocar `images` por URLs reais)
- `src/context/StoreContext.jsx` — carrinho, favoritos, pedidos
