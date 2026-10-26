const API_BASE = 'http://localhost:8080/receitas';
const HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'Basic ' + btoa('admin:secret')
};
const STORAGE_KEY = 'receitas-oma-local-state';

const FALLBACK_RECEITAS = [
  {
    id: 'r1',
    nome: 'Apfelstrudel',
    categoria: 'Doce',
    pais: 'Alemanha',
    ingredientes: ['250 g de farinha de trigo', '125 ml de água morna', '1 colher (sopa) de óleo', '1 pitada de sal', '5 maçãs descascadas e fatiadas', '80 g de açúcar', '1 colher (chá) de canela', '50 g de uvas-passas (opcional)', '50 g de farinha de rosca', '60 g de manteiga derretida'],
    preparo: 'Rendimento: 8 porções | Preparo: cerca de 1 h 30 min\\n\\n1. Prepare a massa: misture a farinha e o sal. Junte a água morna e o óleo aos poucos e sove por 8 a 10 minutos, até ficar lisa e elástica. Forme uma bola, pincele com um pouco de óleo, cubra e deixe descansar por 30 minutos.\\n\\n2. Faça o recheio: misture as maçãs fatiadas com o açúcar, a canela e as uvas-passas. Reserve.\\n\\n3. Abra a massa sobre um pano limpo e enfarinhado. Com as mãos, estique-a cuidadosamente do centro para as bordas até ficar bem fina, quase transparente. Retire as bordas mais grossas.\\n\\n4. Pincele a massa com parte da manteiga derretida e espalhe a farinha de rosca em uma faixa, deixando espaço nas bordas. Distribua o recheio por cima.\\n\\n5. Use o pano para enrolar o strudel sem apertar demais. Feche as pontas e transfira com cuidado para uma assadeira forrada, deixando a emenda para baixo.\\n\\n6. Pincele com o restante da manteiga e asse em forno preaquecido a 180 °C por 35 a 45 minutos, até dourar. Deixe descansar por 15 minutos antes de cortar. Sirva morno, se desejar com açúcar de confeiteiro ou chantilly.',
    tempoPreparo: 60,
    dificuldade: 'Média',
    nota: 4.9,
    favorito: true,
    comentario: 'Receita clássica da cozinha bávara da Oma.',
    vendas: 1480
  },
  {
    id: 'r2',
    nome: 'Schnitzel',
    categoria: 'Principal',
    pais: 'Alemanha',
    ingredientes: ['4 bifes finos de vitela ou lombo suíno (150 g cada)', 'sal e pimenta-do-reino', '60 g de farinha de trigo', '2 ovos', '120 g de farinha de rosca', '150 ml de óleo ou manteiga clarificada', '1 limão cortado em gomos'],
    preparo: 'Rendimento: 4 porções | Preparo: cerca de 35 min\\n\\n1. Coloque os bifes entre duas folhas de papel manteiga e bata delicadamente até ficarem com cerca de 5 mm de espessura. Seque com papel-toalha e tempere os dois lados com sal e pimenta.\\n\\n2. Prepare três pratos rasos: um com farinha de trigo, outro com os ovos batidos e uma colher de água, e o terceiro com farinha de rosca.\\n\\n3. Passe cada bife na farinha e retire o excesso. Mergulhe no ovo e, por último, cubra com farinha de rosca sem pressionar, para manter a cobertura leve.\\n\\n4. Aqueça o óleo ou a manteiga clarificada em uma frigideira larga. Frite um bife por vez, em gordura suficiente para chegar aproximadamente à metade da altura, por 2 a 3 minutos de cada lado, até ficar dourado e completamente cozido. Ajuste o fogo para não queimar a crosta.\\n\\n5. Escorra em uma grade ou papel absorvente e sirva imediatamente com gomos de limão. Evite empilhar os bifes para que continuem crocantes.',
    tempoPreparo: 45,
    dificuldade: 'Média',
    nota: 4.7,
    favorito: false,
    comentario: 'Crosta dourada e sabor marcante para o almoço em família.',
    vendas: 1240
  },
  {
    id: 'r3',
    nome: 'Kartoffelsalat',
    categoria: 'Acompanhamento',
    pais: 'Alemanha',
    ingredientes: ['1 kg de batatas de tamanho parecido', '1 cebola pequena picada', '200 ml de caldo de legumes quente', '3 colheres (sopa) de vinagre de maçã', '2 colheres (sopa) de óleo', '1 colher (chá) de mostarda', 'sal e pimenta-do-reino', '2 colheres (sopa) de cebolinha picada'],
    preparo: 'Rendimento: 6 porções | Preparo: cerca de 45 min, mais o tempo de descanso\\n\\n1. Lave as batatas e cozinhe-as inteiras, com casca, em água salgada por 20 a 25 minutos. Estão prontas quando a ponta de uma faca entrar com facilidade, sem que se desmanchem.\\n\\n2. Escorra e deixe amornar o suficiente para manusear. Descasque ainda mornas e corte em rodelas de aproximadamente 5 mm. Coloque em uma tigela grande.\\n\\n3. Misture o caldo quente com o vinagre, a mostarda, sal e pimenta. Acrescente a cebola e despeje sobre as batatas aos poucos, mexendo com cuidado para não quebrá-las.\\n\\n4. Deixe descansar por pelo menos 20 minutos para as batatas absorverem o tempero. Incorpore o óleo e ajuste sal, pimenta e vinagre.\\n\\n5. Finalize com cebolinha. Sirva morna ou em temperatura ambiente. Se preparar com antecedência, mantenha refrigerada e retire da geladeira alguns minutos antes de servir.',
    tempoPreparo: 30,
    dificuldade: 'Fácil',
    nota: 4.6,
    favorito: true,
    comentario: 'Fresquinho, saboroso e perfeito para qualquer mesa.',
    vendas: 960
  },
  {
    id: 'r4',
    nome: 'Oma Brot',
    categoria: 'Pão',
    pais: 'Alemanha',
    ingredientes: ['500 g de farinha de trigo', '320 ml de água morna', '7 g de fermento biológico seco', '10 g de sal', '1 colher (chá) de açúcar', '1 colher (sopa) de manteiga amolecida', 'farinha extra para polvilhar'],
    preparo: 'Rendimento: 1 pão grande | Preparo: cerca de 3 h\\n\\n1. Misture o fermento, o açúcar e a água morna (não quente). Aguarde de 5 a 10 minutos, até formar uma leve espuma.\\n\\n2. Em uma tigela, misture a farinha e o sal. Faça uma cavidade no centro, junte a mistura de fermento e a manteiga. Misture até formar uma massa.\\n\\n3. Sove sobre uma superfície levemente enfarinhada por 10 minutos, até a massa ficar macia e elástica. Se estiver muito pegajosa, acrescente farinha aos poucos, sem exagerar para o pão não ficar seco.\\n\\n4. Coloque em uma tigela untada, cubra e deixe crescer em local sem corrente de ar por 1 a 1 hora e meia, ou até dobrar de volume.\\n\\n5. Retire o ar da massa com as mãos, modele um pão oval e coloque em uma assadeira. Cubra e deixe crescer por mais 30 a 45 minutos. Enquanto isso, aqueça o forno a 220 °C.\\n\\n6. Faça cortes rasos na superfície e asse por 15 minutos a 220 °C. Reduza para 200 °C e asse por mais 20 a 25 minutos. O pão está pronto quando estiver bem dourado e produzir um som oco ao bater na base. Espere esfriar sobre uma grade antes de fatiar.',
    tempoPreparo: 80,
    dificuldade: 'Média',
    nota: 4.8,
    favorito: false,
    comentario: 'Pão de casa com aroma de forno aceso e tradição.',
    vendas: 1330
  },
  {
    id: 'r5',
    nome: 'Rollmops',
    categoria: 'Entradas',
    pais: 'Alemanha',
    ingredientes: ['8 filés finos de arenque em conserva, prontos para consumo', '4 pepinos em conserva cortados ao meio no comprimento', '1 cebola roxa fatiada', '8 palitos de dente', '1 colher (chá) de grãos de mostarda', '2 folhas de louro', '200 ml do líquido da conserva'],
    preparo: 'Rendimento: 8 unidades | Preparo: 20 min, mais 2 h de refrigeração\\n\\n1. Use arenque já curado ou em conserva, próprio para consumo. Mantenha o peixe refrigerado e siga as instruções de conservação da embalagem; esta receita não substitui a cura segura do pescado.\\n\\n2. Escorra os filés e seque-os delicadamente. Disponha cada um aberto sobre uma tábua limpa.\\n\\n3. Coloque um pedaço de pepino e algumas tiras de cebola na extremidade mais larga de cada filé. Enrole em direção à ponta e prenda com um palito.\\n\\n4. Acomode os rolinhos em um recipiente limpo com tampa. Junte os grãos de mostarda e as folhas de louro e cubra com o líquido da conserva.\\n\\n5. Tampe e leve à geladeira por pelo menos 2 horas para apurar. Sirva frio, mantendo o restante refrigerado e consumindo dentro do prazo indicado para o peixe utilizado.',
    tempoPreparo: 50,
    dificuldade: 'Difícil',
    nota: 4.5,
    favorito: false,
    comentario: 'Clássico com sabor intenso e personalidade nítida.',
    vendas: 840
  }
];

const RECIPE_IMAGES = {
  apfelstrudel: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Apfelstrudel_with_whipped_cream.jpg/960px-Apfelstrudel_with_whipped_cream.jpg',
  schnitzel: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/2022-12-29_Wiener_Schnitzel_im_Hotel_Kaiserin_Elisabeth.jpg/960px-2022-12-29_Wiener_Schnitzel_im_Hotel_Kaiserin_Elisabeth.jpg',
  kartoffelsalat: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Warm_potato_salad_with_ham.jpg/960px-Warm_potato_salad_with_ham.jpg',
  'oma brot': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/German_rye_bread%2C_Massachusetts.jpg/960px-German_rye_bread%2C_Massachusetts.jpg',
  rollmops: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Rollmops_01_retouched.jpg',
  aluske: 'https://s2-receitas.glbimg.com/wE50-nAM1zENRKJE_Wl-eee8BzU=/0x0:1544x906/1360x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2018/U/s/oSmvL6RXqmYp79NaK4lg/aluske.png',
  'black forest cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85',
  bratwurst: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=1200&q=85',
  'beef stroganoff': 'https://images.unsplash.com/photo-1547592180-85f1735608ec?auto=format&fit=crop&w=1200&q=85'
};

const buscaInput = document.getElementById('busca');
const filtroIngrediente = document.getElementById('filtro-ingrediente');
const filtroCategoria = document.getElementById('filtro-categoria');
const filtroPais = document.getElementById('filtro-pais');
const listaReceitas = document.getElementById('lista-receitas');
const statusMessage = document.getElementById('status-message');
const metricaContainer = document.getElementById('metricas');
const form = document.getElementById('form-receita');
const formTitulo = document.getElementById('form-titulo');
const btnCancelar = document.getElementById('btn-cancelar');
const btnImportar = document.getElementById('btn-importar');

let receitas = [];
let editingId = null;
let chartCategoria = null;
let chartPais = null;
let chartVendas = null;
const chartPalette = [
  '#164b8c',
  '#b3262d',
  '#d4a72c',
  '#3f7d68',
  '#7b4f9d',
  '#d87536',
  '#397f91',
  '#8b6b3f'
];

function setStatus(text, type = '') {
  statusMessage.textContent = text;
  statusMessage.className = 'status-message';
  if (type) {
    statusMessage.classList.add(type);
  }
}

function normalizeRecipe(doc) {
  const ingredientes = Array.isArray(doc.ingredientes)
    ? doc.ingredientes
    : typeof doc.ingredientes === 'string'
      ? doc.ingredientes.split(',').map((value) => value.trim()).filter(Boolean)
      : [];

  return {
    id: doc._id?.$oid || doc._id || doc.id || `r-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    nome: doc.nome || 'Sem nome',
    categoria: doc.categoria || 'Sem categoria',
    pais: doc.pais || 'Sem país',
    ingredientes,
    tempoPreparo: Number(doc.tempoPreparo || 0),
    dificuldade: doc.dificuldade || 'Média',
    nota: Number(doc.nota || 0),
    favorito: Boolean(doc.favorito),
    comentario: doc.comentario || 'Receita especial da família.',
    vendas: Number(doc.vendas || Math.max(100, Math.round(Number(doc.nota || 4) * 180))),
    imagem: doc.imagem || doc.strMealThumb || '',
    preparo: String(doc.preparo || doc.strInstructions || getDefaultPreparation(doc.nome)).replace(/\\n/g, '\n')
  };
}

function getDefaultPreparation(name) {
  const normalizedName = normalizeSearchText(name);
  const knownRecipe = FALLBACK_RECEITAS.find((recipe) => normalizeSearchText(recipe.nome) === normalizedName);
  return knownRecipe?.preparo || '';
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function getRecipeImage(receita) {
  if (receita.imagem) return receita.imagem;
  const normalizedName = receita.nome.trim().toLowerCase();
  const match = Object.keys(RECIPE_IMAGES).find((name) => normalizedName.includes(name));
  return RECIPE_IMAGES[match] || RECIPE_IMAGES.apfelstrudel;
}

listaReceitas.addEventListener('error', (event) => {
  const image = event.target;
  if (image instanceof HTMLImageElement && image.dataset.fallback !== 'true') {
    image.dataset.fallback = 'true';
    image.src = RECIPE_IMAGES.apfelstrudel;
  }
}, true);

function loadLocalState() {
  const storageValue = localStorage.getItem(STORAGE_KEY);

  if (storageValue) {
    try {
      const updatedSamples = new Map(FALLBACK_RECEITAS.map((recipe) => [recipe.id, recipe]));
      receitas = JSON.parse(storageValue).map((savedRecipe) => {
        const updatedSample = updatedSamples.get(savedRecipe.id);
        return normalizeRecipe(updatedSample ? {
          ...savedRecipe,
          ingredientes: updatedSample.ingredientes,
          preparo: updatedSample.preparo
        } : savedRecipe);
      });
      persistLocalState();
      return;
    } catch (error) {
      console.warn('Erro ao ler estado local, resetando dados.', error);
    }
  }

  receitas = FALLBACK_RECEITAS.map(normalizeRecipe);
  persistLocalState();
}

function persistLocalState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(receitas));
}

async function criarColecao() {
  try {
    const response = await fetch(API_BASE, { method: 'PUT', headers: HEADERS });
    if (!response.ok && response.status !== 201) {
      throw new Error(`Erro ao criar coleção: ${response.status}`);
    }
  } catch (error) {
    console.warn('Backend indisponível. Usando modo local.', error);
  }
}

async function listarReceitas() {
  loadLocalState();
  renderFilters();
  renderReceitas();
  renderMetricas();
  renderGraficos();
}

function renderFilters() {
  const categorias = [...new Set(receitas.map((r) => r.categoria))].sort();
  const paises = [...new Set(receitas.map((r) => r.pais))].sort();

  mountSelectOptions(filtroCategoria, categorias, 'Todas');
  mountSelectOptions(filtroPais, paises, 'Todos');
}

function mountSelectOptions(selectElement, values, defaultText) {
  const currentValue = selectElement.value || '';
  selectElement.innerHTML = `<option value="">${defaultText}</option>`;

  values.forEach((value) => {
    if (!value) return;
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    if (value === currentValue) {
      option.selected = true;
    }
    selectElement.appendChild(option);
  });
}

function normalizeSearchText(value) {
  return String(value)
    .toLocaleLowerCase('pt-BR')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function editDistance(left, right) {
  const previousRow = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    let previousDiagonal = previousRow[0];
    previousRow[0] = leftIndex;

    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const previousAbove = previousRow[rightIndex];
      const substitutionCost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1;
      previousRow[rightIndex] = Math.min(
        previousRow[rightIndex] + 1,
        previousRow[rightIndex - 1] + 1,
        previousDiagonal + substitutionCost
      );
      previousDiagonal = previousAbove;
    }
  }

  return previousRow[right.length];
}

function typoTolerance(term) {
  if (term.length < 4) return 0;
  if (term.length < 7) return 1;
  if (term.length < 11) return 2;
  return 3;
}

function isFuzzyMatch(query, candidate) {
  if (candidate.includes(query) || query.includes(candidate)) return true;
  const allowedDistance = typoTolerance(query);
  return allowedDistance > 0
    && Math.abs(candidate.length - query.length) <= allowedDistance
    && editDistance(query, candidate) <= allowedDistance;
}

function matchesFuzzyName(query, name) {
  const normalizedQuery = normalizeSearchText(query);
  const normalizedName = normalizeSearchText(name);
  if (!normalizedQuery) return true;
  if (normalizedName.includes(normalizedQuery)) return true;

  const queryWords = normalizedQuery.split(' ');
  const nameWords = normalizedName.split(' ');
  const compactQuery = queryWords.join('');
  const compactName = nameWords.join('');
  if (isFuzzyMatch(compactQuery, compactName)) return true;

  const nameCandidates = [...nameWords];
  for (let start = 0; start < nameWords.length; start += 1) {
    let combinedWords = '';
    for (let end = start; end < Math.min(nameWords.length, start + 4); end += 1) {
      combinedWords += nameWords[end];
      nameCandidates.push(combinedWords);
    }
  }

  return queryWords.every((queryWord) => {
    if (queryWord.length < 3) {
      return nameCandidates.some((candidate) => candidate === queryWord);
    }
    return nameCandidates.some((candidate) => isFuzzyMatch(queryWord, candidate));
  });
}

function matchesIngredient(query, ingredients) {
  const queryWords = normalizeSearchText(query).split(' ').filter(Boolean);
  if (!queryWords.length) return true;

  const normalizedIngredients = ingredients.map(normalizeSearchText);
  return queryWords.every((queryWord) => normalizedIngredients.some((ingredient) => {
    if (ingredient.includes(queryWord) || queryWord.includes(ingredient)) return true;
    const allowedDistance = queryWord.length >= 8 ? 2 : 1;
    if (Math.abs(ingredient.length - queryWord.length) > allowedDistance) return false;
    return editDistance(queryWord, ingredient) <= allowedDistance;
  }));
}

function getReceitasFiltradas() {
  const termo = buscaInput.value.trim();
  const ingrediente = filtroIngrediente.value.trim();
  const categoria = filtroCategoria.value;
  const pais = filtroPais.value;

  return receitas.filter((receita) => {
    const matchName = !termo || matchesFuzzyName(termo, receita.nome);
    const normalizedTerm = normalizeSearchText(termo);
    const matchText = matchName || !termo || [receita.categoria, receita.pais].some((valor) =>
      normalizeSearchText(valor).includes(normalizedTerm)
    );
    const matchIngredient = !ingrediente || matchesIngredient(ingrediente, receita.ingredientes);
    const matchCategoria = !categoria || receita.categoria === categoria;
    const matchPais = !pais || receita.pais === pais;

    return matchText && matchIngredient && matchCategoria && matchPais;
  });
}

function renderReceitas() {
  const itens = getReceitasFiltradas();

  if (!itens.length) {
    listaReceitas.innerHTML = '<div class="empty-state">Nenhuma receita encontrada.</div>';
    return;
  }

  listaReceitas.innerHTML = itens.map((receita) => `
    <article class="recipe-card" data-id="${escapeHtml(receita.id)}">
      <button class="recipe-card-header card-expand-trigger" type="button" aria-expanded="false" aria-label="Expandir ingredientes de ${escapeHtml(receita.nome)}">
        <img src="${escapeHtml(getRecipeImage(receita))}" alt="${escapeHtml(receita.nome)}" loading="lazy" />
        <span class="recipe-badge">${receita.nota.toFixed(1)}</span>
        <span class="expand-hint">Toque para ver os ingredientes</span>
      </button>
      <div class="recipe-body">
        <span class="recipe-origin">${escapeHtml(receita.pais)}</span>
        <h4 class="recipe-title">${escapeHtml(receita.nome)}</h4>
        <p>${escapeHtml(receita.comentario)}</p>
        <div class="recipe-meta">
          <span>${escapeHtml(receita.categoria)}</span>
          <span>${receita.tempoPreparo} min</span>
          <span>${escapeHtml(receita.dificuldade)}</span>
        </div>
        <div class="recipe-meta">
          <span>Vendas: ${receita.vendas}</span>
        </div>
        <div class="recipe-expanded" hidden>
          <h5>Ingredientes</h5>
          <ul>${receita.ingredientes.map((ingrediente) => `<li>${escapeHtml(ingrediente)}</li>`).join('')}</ul>
        </div>
        <div class="recipe-actions">
          <a class="icon-button view-recipe-button" href="receita.html?id=${encodeURIComponent(receita.id)}">Ver receita completa</a>
          <button class="icon-button" data-action="toggle-favorito" data-id="${receita.id}">${receita.favorito ? '★ Favorita' : '☆ Favorita'}</button>
          <button class="icon-button" data-action="editar" data-id="${receita.id}">Editar</button>
          <button class="icon-button" data-action="excluir" data-id="${receita.id}">Excluir</button>
        </div>
      </div>
    </article>
  `).join('');
}

function renderMetricas() {
  const total = receitas.length;
  const totalVendas = receitas.reduce((soma, item) => soma + item.vendas, 0);
  const media = total ? (receitas.reduce((soma, item) => soma + item.nota, 0) / total).toFixed(1) : '0.0';
  const favoritas = receitas.filter((item) => item.favorito).length;
  const receitaMaisVendida = [...receitas].sort((a, b) => b.vendas - a.vendas)[0];

  const metricas = [
    { label: 'Receitas', value: total },
    { label: 'Média de nota', value: media },
    { label: 'Favoritas', value: favoritas },
    { label: 'Vendas totais', value: totalVendas }
  ];

  if (receitaMaisVendida) {
    metricas.push({ label: 'Mais vendida', value: receitaMaisVendida.nome });
  }

  metricaContainer.innerHTML = metricas.map((item) => `
    <div class="metric-card">
      <div class="label">${item.label}</div>
      <div class="value">${item.value}</div>
    </div>
  `).join('');
}

function renderGraficos() {
  const porCategoria = agrupar(receitas, 'categoria');
  const porPais = agrupar(receitas, 'pais');
  const top5 = [...receitas].sort((a, b) => b.vendas - a.vendas).slice(0, 5);
  const porVendas = Object.fromEntries(top5.map((receita) => [receita.nome, receita.vendas]));

  const chartCategoriaCtx = document.getElementById('chartCategoria');
  const chartPaisCtx = document.getElementById('chartPais');
  const chartVendasCtx = document.getElementById('chartVendas');
  const rankingList = document.getElementById('ranking-nota');

  if (chartCategoria) chartCategoria.destroy();
  if (chartPais) chartPais.destroy();
  if (chartVendas) chartVendas.destroy();

  chartCategoria = new Chart(chartCategoriaCtx, {
    type: 'bar',
    data: {
      labels: Object.keys(porCategoria),
      datasets: [{
        label: 'Receitas cadastradas',
        data: Object.values(porCategoria),
        backgroundColor: Object.keys(porCategoria).map((_, index) => chartPalette[index % chartPalette.length]),
        borderColor: '#fffdf8',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'nearest', intersect: true },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#20201f',
          padding: 12,
          displayColors: true,
          callbacks: {
            label: (context) => ` ${context.parsed.y} receita(s)`
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#69675f' } },
        y: { beginAtZero: true, ticks: { precision: 0, color: '#69675f' }, grid: { color: 'rgba(22, 75, 140, 0.08)' } }
      },
      onClick: (_event, elements, chart) => {
        if (!elements.length) return;
        filtroCategoria.value = chart.data.labels[elements[0].index];
        renderReceitas();
        document.getElementById('receitas').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  chartPais = new Chart(chartPaisCtx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(porPais),
      datasets: [{
        data: Object.values(porPais),
        backgroundColor: Object.keys(porPais).map((_, index) => chartPalette[index % chartPalette.length]),
        borderColor: '#fffdf8',
        borderWidth: 3,
        hoverOffset: 12,
        spacing: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '62%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { usePointStyle: true, pointStyle: 'circle', padding: 16, color: '#41413c' }
        },
        tooltip: {
          backgroundColor: '#20201f',
          padding: 12,
          callbacks: {
            label: (context) => ` ${context.label}: ${context.parsed} receita(s)`
          }
        }
      },
      onClick: (_event, elements, chart) => {
        if (!elements.length) return;
        filtroPais.value = chart.data.labels[elements[0].index];
        renderReceitas();
        document.getElementById('receitas').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  chartVendas = new Chart(chartVendasCtx, {
    type: 'bar',
    data: {
      labels: Object.keys(porVendas),
      datasets: [{
        label: 'Vendas demonstrativas',
        data: Object.values(porVendas),
        backgroundColor: top5.map((_, index) => chartPalette[(index + 2) % chartPalette.length]),
        borderColor: '#fffdf8',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#20201f',
          padding: 12,
          callbacks: {
            label: (context) => ` ${context.parsed.y.toLocaleString('pt-BR')} vendas demonstrativas`
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#69675f' } },
        y: {
          beginAtZero: true,
          ticks: { color: '#69675f', callback: (value) => Number(value).toLocaleString('pt-BR') },
          grid: { color: 'rgba(22, 75, 140, 0.08)' }
        }
      },
      onClick: (_event, elements, chart) => {
        if (!elements.length) return;
        buscaInput.value = chart.data.labels[elements[0].index];
        renderReceitas();
        document.getElementById('receitas').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  rankingList.innerHTML = top5.map((item, index) => `
    <li>${index + 1}. ${item.nome} — ${item.vendas} vendas</li>
  `).join('');
}

function agrupar(lista, chave) {
  return lista.reduce((acc, item) => {
    const valor = item[chave] || 'Outro';
    acc[valor] = (acc[valor] || 0) + 1;
    return acc;
  }, {});
}

async function importarReceitas() {
  const receitasExternas = [
    {
      nome: 'Beef Stroganoff',
      categoria: 'Principal',
      pais: 'Rússia',
      ingredientes: ['carne', 'creme', 'champignon', 'cebola', 'arroz'],
      preparo: '1. Corte a carne em tiras e tempere com sal e pimenta. Pique a cebola e fatie os cogumelos.\\n\\n2. Aqueça o óleo em uma frigideira larga e doure a carne em pequenas porções, sem lotar a panela. Retire e reserve.\\n\\n3. Na mesma panela, refogue a cebola até ficar macia. Junte os cogumelos e cozinhe até perderem parte da água.\\n\\n4. Volte a carne para a panela. Acrescente o creme de leite e cozinhe em fogo baixo por alguns minutos, sem deixar ferver intensamente. Ajuste os temperos e sirva com arroz.',
      preparo: 'Doure a carne em uma panela quente. Acrescente a cebola e os cogumelos; refogue. Junte o creme e cozinhe em fogo baixo até o molho encorpar. Sirva com arroz.',
      tempoPreparo: 50,
      dificuldade: 'Média',
      nota: 4.8,
      favorito: false,
      comentario: 'Receita inspirada em cozinha de família, muito pedida no fim de semana.',
      vendas: 1180
    },
    {
      nome: 'Bratwurst',
      categoria: 'Principal',
      pais: 'Alemanha',
      ingredientes: ['salsicha', 'pão', 'mostarda', 'chucrute', 'cebola'],
      preparo: '1. Seque as salsichas e faça pequenos furos na pele apenas se a embalagem recomendar. Aqueça uma frigideira ou grelha em fogo médio.\\n\\n2. Doure as salsichas lentamente, virando com frequência, por cerca de 12 a 15 minutos ou até estarem completamente cozidas e quentes no centro. Evite fogo alto, que queima a parte externa antes de aquecer o interior.\\n\\n3. Aqueça o chucrute à parte e toste os pães, se for servir no pão.\\n\\n4. Sirva com mostarda e cebola. Siga as orientações de cozimento da embalagem das salsichas.',
      preparo: 'Aqueça uma frigideira ou grelha e doure as salsichas por todos os lados até estarem cozidas. Sirva no pão ou no prato, acompanhadas de mostarda e chucrute.',
      tempoPreparo: 25,
      dificuldade: 'Fácil',
      nota: 4.7,
      favorito: true,
      comentario: 'Sabor tradicional e muito popular em eventos e festas.',
      vendas: 1420
    },
    {
      nome: 'Black Forest Cake',
      categoria: 'Doce',
      pais: 'Alemanha',
      ingredientes: ['chocolate', 'cereja', 'chantilly', 'massa', 'creme'],
      preparo: '1. Aqueça o forno a 180 °C. Unte e forre com papel manteiga duas formas redondas de 20 cm. Prepare uma massa de bolo de chocolate, divida entre as formas e asse até que um palito saia limpo. Deixe esfriar completamente.\\n\\n2. Escorra as cerejas, reservando um pouco da calda. Se desejar, umedeça levemente os bolos frios com a calda.\\n\\n3. Bata o creme de leite fresco bem gelado até formar picos firmes, sem bater demais.\\n\\n4. Coloque uma camada de bolo no prato, espalhe parte do chantilly e distribua cerejas. Cubra com a outra camada e repita.\\n\\n5. Cubra o topo e as laterais com chantilly. Finalize com raspas de chocolate e cerejas. Mantenha refrigerado até servir.',
      preparo: 'Asse as camadas de massa de chocolate e deixe esfriar. Recheie com chantilly e cerejas entre as camadas. Cubra o bolo com chantilly, raspas de chocolate e cerejas.',
      tempoPreparo: 90,
      dificuldade: 'Difícil',
      nota: 4.9,
      favorito: true,
      comentario: 'Uma das sobremesas mais vendidas da casa.',
      vendas: 1560
    }
  ];

  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken');
    if (response.ok) {
      const data = await response.json();
      const meals = data.meals || [];
      if (meals.length) {
        const registros = meals.slice(0, 4).map((meal) => ({
          nome: meal.strMeal,
          categoria: meal.strCategory || 'Sem categoria',
          pais: meal.strArea || 'Sem país',
          ingredientes: Array.from({ length: 20 }, (_, index) => {
            const number = index + 1;
            const ingredient = meal[`strIngredient${number}`]?.trim();
            const measure = meal[`strMeasure${number}`]?.trim();
            return ingredient ? [measure, ingredient].filter(Boolean).join(' ') : '';
          }).filter(Boolean),
          preparo: meal.strInstructions || '',
          tempoPreparo: Number(meal.strInstructions?.length ? Math.max(20, Math.min(90, Math.round(meal.strInstructions.length / 10))) : 30),
          dificuldade: 'Média',
          nota: 4.2,
          favorito: false,
          comentario: 'Receita importada de exemplo para teste do front-end.',
          vendas: 760 + Math.floor(Math.random() * 500),
          imagem: meal.strMealThumb || ''
        }));

        receitas = [...registros, ...receitas].map(normalizeRecipe);
        persistLocalState();
        renderFilters();
        renderReceitas();
        renderMetricas();
        renderGraficos();
        setStatus('Receitas de exemplo importadas com sucesso!', 'success');
        return;
      }
    }

    receitas = [...receitas, ...receitasExternas].map(normalizeRecipe);
    persistLocalState();
    renderFilters();
    renderReceitas();
    renderMetricas();
    renderGraficos();
    setStatus('API externa indisponível. Carreguei receitas demonstrativas locais.', 'warning');
  } catch (error) {
    receitas = [...receitas, ...receitasExternas].map(normalizeRecipe);
    persistLocalState();
    renderFilters();
    renderReceitas();
    renderMetricas();
    renderGraficos();
    setStatus('Modo local ativo: receitas de demonstração carregadas.', 'warning');
  }
}

function criarReceitaNoLocal(payload) {
  const novaReceita = normalizeRecipe({
    ...payload,
    id: `r-${Date.now()}`,
    vendas: Number(payload.vendas || 280)
  });

  receitas = [novaReceita, ...receitas];
  persistLocalState();
}

function atualizarReceitaNoLocal(id, payload) {
  receitas = receitas.map((item) => item.id === id ? normalizeRecipe({ ...item, ...payload, id }) : item);
  persistLocalState();
}

function removerReceitaNoLocal(id) {
  receitas = receitas.filter((item) => item.id !== id);
  persistLocalState();
}

function alternarFavoritoNoLocal(id) {
  receitas = receitas.map((receita) => {
    if (receita.id !== id) return receita;
    return { ...receita, favorito: !receita.favorito };
  });
  persistLocalState();
}

async function salvarReceita(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const payload = {
    nome: formData.get('nome').toString().trim(),
    categoria: formData.get('categoria').toString().trim(),
    pais: formData.get('pais').toString().trim(),
    ingredientes: formData.get('ingredientes').toString().split(',').map((value) => value.trim()).filter(Boolean),
    tempoPreparo: Number(formData.get('tempoPreparo')),
    dificuldade: formData.get('dificuldade').toString(),
    nota: Number(formData.get('nota')),
    favorito: formData.get('favorito') === 'on',
    comentario: 'Receita adicionada ao catálogo da Oma.',
    vendas: Math.max(120, Math.round(Number(formData.get('nota')) * 220)),
    imagem: formData.get('imagem').toString().trim(),
    preparo: formData.get('preparo').toString().trim()
  };

  if (!payload.nome || !payload.categoria || !payload.pais || !payload.ingredientes.length || !payload.preparo || !payload.tempoPreparo) {
    setStatus('Preencha todos os campos obrigatórios.', 'warning');
    return;
  }

  try {
    if (editingId) {
      atualizarReceitaNoLocal(editingId, payload);
      setStatus('Receita atualizada com sucesso!', 'success');
    } else {
      criarReceitaNoLocal(payload);
      setStatus('Receita criada com sucesso!', 'success');
    }

    form.reset();
    editingId = null;
    formTitulo.textContent = 'Adicionar receita';
    await listarReceitas();
  } catch (error) {
    setStatus(error.message || 'Erro ao salvar receita.', 'error');
  }
}

async function excluirReceita(id) {
  if (!window.confirm('Deseja realmente excluir esta receita?')) return;

  try {
    removerReceitaNoLocal(id);
    setStatus('Receita excluída com sucesso!', 'success');
    await listarReceitas();
  } catch (error) {
    setStatus(error.message || 'Erro ao excluir receita.', 'error');
  }
}

async function alternarFavorito(id) {
  const item = receitas.find((receita) => receita.id === id);
  if (!item) return;

  try {
    alternarFavoritoNoLocal(id);
    setStatus('Favorito atualizado!', 'success');
    await listarReceitas();
  } catch (error) {
    setStatus(error.message || 'Erro ao atualizar favorito.', 'error');
  }
}

function preencherFormularioEditando(id) {
  const item = receitas.find((receita) => receita.id === id);
  if (!item) return;

  editingId = id;
  formTitulo.textContent = 'Editar receita';

  document.getElementById('nome').value = item.nome;
  document.getElementById('categoria').value = item.categoria;
  document.getElementById('pais').value = item.pais;
  document.getElementById('ingredientes').value = item.ingredientes.join(', ');
  document.getElementById('preparo').value = item.preparo || '';
  document.getElementById('tempoPreparo').value = item.tempoPreparo;
  document.getElementById('dificuldade').value = item.dificuldade;
  document.getElementById('nota').value = item.nota;
  document.getElementById('favorito').checked = item.favorito;
  document.getElementById('imagem').value = item.imagem || '';
  document.getElementById('nome').focus();
}

function resetFormulario() {
  editingId = null;
  form.reset();
  formTitulo.textContent = 'Adicionar receita';
}

listaReceitas.addEventListener('click', async (event) => {
  const expandButton = event.target.closest('.card-expand-trigger');
  if (expandButton) {
    toggleRecipeIngredients(expandButton.closest('.recipe-card'));
    return;
  }

  const card = event.target.closest('.recipe-card');
  if (card && !event.target.closest('button, a')) {
    toggleRecipeIngredients(card);
    return;
  }

  const button = event.target.closest('button');
  if (!button) return;

  const { action, id } = button.dataset;

  if (action === 'editar') {
    preencherFormularioEditando(id);
  }

  if (action === 'excluir') {
    await excluirReceita(id);
  }

  if (action === 'toggle-favorito') {
    await alternarFavorito(id);
  }
});

function toggleRecipeIngredients(card) {
  if (!card) return;
  const trigger = card.querySelector('.card-expand-trigger');
  const expanded = trigger.getAttribute('aria-expanded') === 'true';
  trigger.setAttribute('aria-expanded', String(!expanded));
  card.querySelector('.recipe-expanded').hidden = expanded;
}

buscaInput.addEventListener('input', renderReceitas);
filtroIngrediente.addEventListener('input', renderReceitas);
filtroCategoria.addEventListener('change', renderReceitas);
filtroPais.addEventListener('change', renderReceitas);
form.addEventListener('submit', salvarReceita);
btnCancelar.addEventListener('click', resetFormulario);
btnImportar.addEventListener('click', importarReceitas);

(async function init() {
  try {
    loadLocalState();
    setStatus('Modo local ativo. Você pode criar, editar e remover receitas direto no site.', 'success');
    await listarReceitas();
  } catch (error) {
    setStatus('Erro ao carregar receitas locais.', 'error');
  }
})();
