const pool = [
  { author: 'Amélia C.', city: 'Maputo', rating: 5, date: '2026-08-21', text: 'Chegou no prazo e bem embalado. Exatamente como na descrição, recomendo.' },
  { author: 'Nelson M.', city: 'Matola', rating: 4, date: '2026-08-02', text: 'Muito bom pelo preço. Só demorou um dia a mais do que o previsto para chegar.' },
  { author: 'Helena S.', city: 'Beira', rating: 5, date: '2026-07-18', text: 'Qualidade acima do que esperava. O vendedor respondeu logo às minhas dúvidas.' },
  { author: 'Tiago F.', city: 'Nampula', rating: 4, date: '2026-07-05', text: 'Produto original e com fatura. Faria a compra outra vez.' },
  { author: 'Sónia B.', city: 'Maputo', rating: 3, date: '2026-06-27', text: 'Bom produto, mas a caixa chegou um pouco amassada. O produto estava intacto.' },
  { author: 'Rui A.', city: 'Xai-Xai', rating: 5, date: '2026-06-11', text: 'Funciona perfeitamente. A entrega expressa compensou.' },
  { author: 'Carla N.', city: 'Inhambane', rating: 4, date: '2026-05-30', text: 'Cumpre o que promete. Fácil de usar logo à primeira.' },
  { author: 'Edson P.', city: 'Maputo', rating: 5, date: '2026-05-14', text: 'Melhor compra do mês. Já indiquei a loja a colegas de trabalho.' },
]

// 3 avaliações por produto, escolhidas de forma estável
export const getReviews = (productId) => [0, 3, 5].map((k) => pool[(productId + k) % pool.length])
