// -----------------------------------------------------------------------------
// PRODUTOS DO VUMA
// -----------------------------------------------------------------------------

const raw = [
  [1, 'Samsung Galaxy A55 5G 128GB', 'smartphones', 'Apple Store', 24990, 29990, 4.6, 312, 18, 940,
    'Smartphone 5G com ecrã Super AMOLED de 120Hz, câmara principal de 50MP e bateria que dura o dia inteiro.',
    { Ecrã: '6,6" Super AMOLED 120Hz', Memória: '8GB RAM / 128GB', Câmara: '50MP + 12MP + 5MP', Bateria: '5000 mAh', Garantia: '12 meses' }],

  [2, 'Xiaomi Redmi Note 13 256GB', 'smartphones', 'Apple Store', 14990, 17500, 4.4, 528, 32, 1210,
    'Ecrã AMOLED, câmara de 108MP e carregamento rápido de 33W a um preço acessível.',
    { Ecrã: '6,67" AMOLED 120Hz', Memória: '8GB RAM / 256GB', Câmara: '108MP', Bateria: '5000 mAh · 33W', Garantia: '12 meses' }],

  [3, 'iPhone 13 128GB', 'smartphones', 'Apple Store', 46900, null, 4.8, 205, 6, 610,
    'Chip A15 Bionic, câmara dupla e ecrã Super Retina XDR. Desbloqueado para todas as operadoras.',
    { Ecrã: '6,1" Super Retina XDR', Memória: '128GB', Câmara: '12MP + 12MP', Chip: 'A15 Bionic', Garantia: '12 meses' }],

  [4, 'Tecno Spark 20 Pro 256GB', 'smartphones', 'Apple Store', 9490, 11990, 4.2, 391, 40, 1500,
    'Grande ecrã de 120Hz, 256GB de armazenamento e câmara de 108MP para quem quer muito por pouco.',
    { Ecrã: '6,78" FHD+ 120Hz', Memória: '8GB RAM / 256GB', Câmara: '108MP', Bateria: '5000 mAh', Garantia: '12 meses' }],

  [5, 'Laptop HP 15 Core i5 8GB/512GB', 'computadores', 'Tech Store', 38500, 44900, 4.5, 143, 9, 380,
    'Portátil equilibrado para trabalho e estudo: arranca depressa, tem bom ecrã e bateria para várias horas.',
    { Processador: 'Intel Core i5 12ª geração', Memória: '8GB RAM / 512GB SSD', Ecrã: '15,6" Full HD', Sistema: 'Windows 11', Garantia: '12 meses' }],

  [6, 'Lenovo IdeaPad 3 Ryzen 5 16GB', 'computadores', 'Tech Store', 35900, null, 4.6, 98, 12, 290,
    'Desempenho sólido para multitarefa, com 16GB de memória e SSD rápido.',
    { Processador: 'AMD Ryzen 5 5500U', Memória: '16GB RAM / 512GB SSD', Ecrã: '15,6" Full HD', Sistema: 'Windows 11', Garantia: '12 meses' }],

  [7, 'Monitor Samsung 24" Full HD', 'computadores', 'Tech Store', 9900, 12500, 4.5, 176, 25, 350,
    'Painel IPS com cores fiéis e moldura fina. Ideal para trabalhar ou estudar durante horas.',
    { Tamanho: '24"', Resolução: '1920 x 1080', Painel: 'IPS 75Hz', Portas: 'HDMI, VGA', Garantia: '12 meses' }],

  [8, 'Teclado Mecânico Redragon Kumara', 'computadores', 'Tech Store', 3290, null, 4.7, 254, 30, 520,
    'Teclado compacto com switches mecânicos e retroiluminação, resistente e agradável de escrever.',
    { Formato: 'TKL (87 teclas)', Switch: 'Outemu Blue', Ligação: 'USB com fio', Luz: 'LED vermelho', Garantia: '6 meses' }],

  [9, 'Smart TV LG 43" 4K UHD', 'eletronicos', 'Tech Store', 32900, 39900, 4.6, 187, 7, 460,
    'Imagem 4K nítida, aplicações de streaming integradas e comando por voz.',
    { Tamanho: '43"', Resolução: '3840 x 2160 (4K)', Sistema: 'webOS', Ligações: '3x HDMI, 2x USB, Wi-Fi', Garantia: '24 meses' }],

  [10, 'Power Bank Anker 20000mAh', 'eletronicos', 'Apple Store', 3490, null, 4.7, 611, 60, 880,
    'Carrega o telemóvel até cinco vezes e tem duas saídas USB. Essencial para cortes de energia.',
    { Capacidade: '20000 mAh', Saídas: '2x USB-A + 1x USB-C', Potência: '22,5W', Peso: '350 g', Garantia: '12 meses' }],

  [11, 'Router Wi-Fi 6 TP-Link Archer AX10', 'eletronicos', 'Tech Store', 3990, 4800, 4.5, 302, 22, 410,
    'Wi-Fi 6 para ligar vários dispositivos ao mesmo tempo, sem quebras de sinal.',
    { Velocidade: 'Até 1500 Mbps', Banda: 'Dual-band 2,4 / 5 GHz', Portas: '4x Gigabit LAN', Antenas: '4', Garantia: '24 meses' }],

  [12, 'Smartwatch Amazfit Bip 5', 'eletronicos', 'Apple Store', 5990, null, 4.3, 121, 15, 260,
    'Ecrã grande, GPS integrado e até 10 dias de bateria. Acompanha passos, sono e batimentos.',
    { Ecrã: '1,91" LCD', Bateria: 'Até 10 dias', Sensores: 'GPS, batimentos, SpO2', Resistência: '5 ATM', Garantia: '12 meses' }],

  [13, 'Coluna Bluetooth JBL Flip 6', 'audio', 'Audio House', 7990, 9500, 4.8, 433, 20, 960,
    'Som potente e graves profundos numa coluna à prova de água e poeira.',
    { Potência: '30W', Autonomia: '12 horas', Proteção: 'IP67', Ligação: 'Bluetooth 5.1', Garantia: '12 meses' }],

  [14, 'Auscultadores Sony WH-CH520', 'audio', 'Audio House', 4290, null, 4.5, 267, 27, 540,
    'Auscultadores sem fios leves, com microfone e até 50 horas de bateria.',
    { Tipo: 'On-ear', Autonomia: 'Até 50 horas', Ligação: 'Bluetooth 5.2', Microfone: 'Sim', Garantia: '12 meses' }],

  [15, 'Auriculares Redmi Buds 5', 'audio', 'Audio House', 1990, 2490, 4.3, 489, 48, 1120,
    'Auriculares sem fios com cancelamento de ruído e estojo de carregamento.',
    { Tipo: 'In-ear', Autonomia: '10h + estojo', Ligação: 'Bluetooth 5.3', Ruído: 'Cancelamento ativo', Garantia: '6 meses' }],

  [16, 'Soundbar Samsung 2.1 300W', 'audio', 'Audio House', 12900, null, 4.4, 76, 5, 190,
    'Som de cinema em casa, com subwoofer sem fios e ligação direta à televisão.',
    { Canais: '2.1', Potência: '300W', Ligações: 'HDMI ARC, Bluetooth, Óptica', Subwoofer: 'Sem fios', Garantia: '12 meses' }],

  [17, 'Câmera Canon EOS 2000D + Lente 18-55mm', 'cameras', 'Audio House', 42900, 48500, 4.7, 64, 4, 120,
    'Reflex digital para começar a sério em fotografia e vídeo Full HD.',
    { Sensor: 'APS-C 24,1MP', Vídeo: 'Full HD 30fps', Lente: '18-55mm f/3.5-5.6', Ligação: 'Wi-Fi, NFC', Garantia: '12 meses' }],

  [18, 'Câmera de Ação 4K Eken H9R', 'cameras', 'Tech Store', 3990, null, 4.0, 158, 19, 240,
    'Câmera de ação com vídeo 4K, comando à distância e caixa estanque.',
    { Vídeo: '4K 30fps', Ecrã: '2" LCD', Proteção: 'Caixa estanque 30m', Extras: 'Comando e suportes', Garantia: '6 meses' }],

  [19, 'Câmera de Segurança Wi-Fi TP-Link Tapo C200', 'cameras', 'Tech Store', 1890, 2390, 4.6, 344, 45, 700,
    'Vigie a sua casa ou loja pelo telemóvel, com visão noturna e áudio nos dois sentidos.',
    { Resolução: '1080p Full HD', Rotação: '360° horizontal', 'Visão noturna': 'Até 9 m', Armazenamento: 'Cartão microSD até 256GB', Garantia: '24 meses' }],

  [20, 'Air Fryer Philips 4,1L', 'casa', 'Casa & Cia', 6490, 7990, 4.7, 512, 14, 830,
    'Cozinha com pouco ou nenhum óleo. Fica pronta em minutos e é fácil de limpar.',
    { Capacidade: '4,1 L', Potência: '1400W', Temperatura: 'Até 200 °C', Cesto: 'Antiaderente', Garantia: '24 meses' }],

  [21, 'Liquidificador Oster 600W', 'casa', 'Casa & Cia', 2290, null, 4.4, 203, 33, 430,
    'Copo de vidro resistente e lâminas de aço para sumos, molhos e batidos.',
    { Potência: '600W', Copo: 'Vidro 1,5 L', Velocidades: '2 + pulsar', Lâminas: 'Aço inoxidável', Garantia: '12 meses' }],

  [22, 'Ventoinha de Pé 16" Mellerware', 'casa', 'Casa & Cia', 1790, 2190, 4.2, 267, 38, 610,
    'Ventoinha silenciosa com três velocidades e altura ajustável, para os dias de calor.',
    { Diâmetro: '16"', Velocidades: '3', Oscilação: 'Sim', Altura: 'Ajustável', Garantia: '12 meses' }],

  [23, 'Jogo de Panelas Antiaderente 7 Peças', 'casa', 'Casa & Cia', 3590, 4500, 4.5, 176, 21, 340,
    'Conjunto completo com tampas de vidro, adequado para fogão a gás e elétrico.',
    { Peças: '7', Material: 'Alumínio forjado', Revestimento: 'Antiaderente', Tampas: 'Vidro temperado', Garantia: '12 meses' }],

  [24, 'Ferro a Vapor 2200W', 'casa', 'Casa & Cia', 1290, null, 4.3, 142, 0, 210,
    'Ferro potente com jato de vapor e base antiaderente. Temporariamente esgotado.',
    { Potência: '2200W', Base: 'Cerâmica', Depósito: '300 ml', Vapor: 'Contínuo e jato', Garantia: '12 meses' }],

  [25, 'Sapatilhas Urbanas Unissexo', 'moda', 'Casa & Cia', 2490, 3200, 4.4, 231, 26, 480,
    'Sapatilhas confortáveis para o dia a dia, com sola de borracha antiderrapante.',
    { Género: 'Unissexo', Material: 'Sintético respirável', Sola: 'Borracha', Tamanhos: '38 a 45', Cor: 'Branco' }],

  [26, 'Mochila Impermeável 25L', 'moda', 'Casa & Cia', 1590, null, 4.5, 187, 35, 390,
    'Mochila resistente à água com compartimento acolchoado para portátil até 15,6".',
    { Capacidade: '25 L', Material: 'Poliéster impermeável', Portátil: 'Até 15,6"', Extras: 'Porta USB externa', Cor: 'Preto' }],

  [27, 'Cadeira Ergonómica de Escritório', 'escritorio', 'Office Pro', 8900, 10900, 4.6, 119, 11, 270,
    'Apoio lombar, encosto em rede e altura ajustável para trabalhar sem dores.',
    { Encosto: 'Rede respirável', Altura: 'Ajustável a gás', Apoio: 'Lombar + braços', Carga: 'Até 120 kg', Garantia: '12 meses' }],

  [28, 'Impressora Epson EcoTank L3250', 'escritorio', 'Office Pro', 14500, null, 4.8, 158, 8, 340,
    'Multifunções com depósitos de tinta recarregáveis: imprime muito, gasta pouco.',
    { Funções: 'Imprime, copia, digitaliza', Tinta: 'Depósito recarregável', Ligação: 'Wi-Fi, USB', Rendimento: 'Até 4500 pág. a cores', Garantia: '12 meses' }],

  [29, 'Secretária Ajustável 120cm', 'escritorio', 'Office Pro', 6900, null, 4.3, 64, 10, 150,
    'Tampo amplo e estrutura em aço, com altura regulável para trabalho sentado ou em pé.',
    { Tampo: '120 x 60 cm', Estrutura: 'Aço reforçado', Altura: 'Regulável', Carga: 'Até 80 kg', Garantia: '12 meses' }],

  [30, 'Carregador Rápido GaN 65W', 'acessorios', 'Apple Store', 1290, 1690, 4.6, 402, 55, 990,
    'Carrega telemóvel, tablet e portátil com um só carregador compacto.',
    { Potência: '65W', Portas: '2x USB-C + 1x USB-A', Tecnologia: 'GaN', Proteção: 'Sobreaquecimento', Garantia: '12 meses' }],

  [31, 'Rato Sem Fios Logitech M170', 'acessorios', 'Office Pro', 690, null, 4.6, 723, 80, 1400,
    'Rato sem fios simples e fiável, com receptor USB e pilha de longa duração.',
    { Ligação: 'Receptor USB 2,4 GHz', Alcance: '10 m', Pilha: 'Até 12 meses', Compatível: 'Windows, macOS, Linux', Garantia: '12 meses' }],

  [32, 'Candeeiro de Secretária LED', 'escritorio', 'Office Pro', 990, 1290, 4.4, 88, 29, 170,
    'Luz ajustável em três tons e cinco intensidades, com braço flexível e carregamento USB.',
    { Luz: '3 tons / 5 níveis', Potência: '8W', Braço: 'Flexível', Alimentação: 'USB', Garantia: '6 meses' }],
]

// -----------------------------------------------------------------------------
// PRODUTOS NOVOS
// -----------------------------------------------------------------------------

const NEW_IDS = [1, 9, 12, 17, 20, 28, 31, 32]

// -----------------------------------------------------------------------------
// IMAGENS
// -----------------------------------------------------------------------------

const productImages = {
  1: [
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600',
  ],
  2: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
  ],
  3: [
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600',
  ],
  4: [
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600',
  ],
  5: [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600',
  ],
  6: [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600',
  ],
  7: [
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600',
  ],
  8: [
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600',
  ],
  9: [
    'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600',
  ],
  10: [
    'https://images.unsplash.com/photo-1609592424938-4b5b7c2b9d6b?w=600',
  ],
  11: [
    'https://images.unsplash.com/photo-1606904825846-647eb07b5be5?w=600',
  ],
  12: [
    'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600',
  ],
  13: [
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600',
  ],
  14: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
  ],
  15: [
    'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600',
  ],
  16: [
    'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600',
  ],
  17: [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600',
  ],
  18: [
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600',
  ],
  19: [
    'https://images.unsplash.com/photo-1558008258-3256797b43f3?w=600',
  ],
  20: [
    'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600',
  ],
  21: [
    'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600',
  ],
  22: [
    'https://images.unsplash.com/photo-1523321360875-1f0f9b4b5b2c?w=600',
  ],
  23: [
    'https://images.unsplash.com/photo-1584990347449-ae9c6b7e6b89?w=600',
  ],
  24: [
    'https://images.unsplash.com/photo-1616627561950-9f746e330187?w=600',
  ],
  25: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
  ],
  26: [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
  ],
  27: [
    'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600',
  ],
  28: [
    'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600',
  ],
  29: [
    'https://images.unsplash.com/photo-1593642532400-2682810df593?w=600',
  ],
  30: [
    'https://images.unsplash.com/photo-1609592424926-7b2b4c7f4e9b?w=600',
  ],
  31: [
    'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600',
  ],
  32: [
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600',
  ],
}

// -----------------------------------------------------------------------------
// CÁLCULO DE DESCONTO
// -----------------------------------------------------------------------------

const discountPct = (price, oldPrice) => {
  if (!oldPrice || oldPrice <= price) {
    return 0
  }

  return Math.round(((oldPrice - price) / oldPrice) * 100)
}

// -----------------------------------------------------------------------------
// CATEGORIAS
// -----------------------------------------------------------------------------

const categoryNames = {
  smartphones: 'Smartphones',
  computadores: 'Computadores',
  eletronicos: 'Eletrónicos',
  audio: 'Áudio',
  cameras: 'Câmaras',
  casa: 'Casa',
  moda: 'Moda',
  escritorio: 'Escritório',
  acessorios: 'Acessórios',
}

// -----------------------------------------------------------------------------
// PRODUTOS FINAIS
// -----------------------------------------------------------------------------

export const products = raw.map(
  ([
    id,
    name,
    category,
    seller,
    price,
    oldPrice,
    rating,
    reviews,
    stock,
    sold,
    description,
    specifications,
  ]) => ({
    id,
    name,
    description,

    category,
    categoryName: categoryNames[category] || category,

    seller,
    sellerId: seller.toLowerCase().replace(/\s+/g, '-'),

    price,
    oldPrice,
    discount: discountPct(price, oldPrice),

    rating,
    reviews,
    stock,
    sold,

    specifications,

    images: productImages[id] || [],

    featured:
      sold >= 500 ||
      Boolean(oldPrice && rating >= 4.5),

    bestSeller: sold >= 400,

    isNew: NEW_IDS.includes(id),
  })
)

// -----------------------------------------------------------------------------
// BUSCAR PRODUTO
// -----------------------------------------------------------------------------

export const getProduct = (id) => {
  return products.find(
    (product) => String(product.id) === String(id)
  )
}