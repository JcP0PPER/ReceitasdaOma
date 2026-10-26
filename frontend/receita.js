const RECIPE_STORAGE_KEY = 'receitas-oma-local-state';
const DEFAULT_IMAGES = {
  apfelstrudel: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Apfelstrudel_with_whipped_cream.jpg/960px-Apfelstrudel_with_whipped_cream.jpg',
  schnitzel: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/2022-12-29_Wiener_Schnitzel_im_Hotel_Kaiserin_Elisabeth.jpg/960px-2022-12-29_Wiener_Schnitzel_im_Hotel_Kaiserin_Elisabeth.jpg',
  kartoffelsalat: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Warm_potato_salad_with_ham.jpg/960px-Warm_potato_salad_with_ham.jpg',
  'oma brot': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/German_rye_bread%2C_Massachusetts.jpg/960px-German_rye_bread%2C_Massachusetts.jpg',
  rollmops: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Rollmops_01_retouched.jpg'
};
const DEFAULT_PREPARATIONS = {
  apfelstrudel: 'Abra a massa em uma superfície enfarinhada até ficar bem fina. Recheie com maçãs fatiadas, açúcar e canela. Enrole com cuidado, pincele manteiga derretida e asse a 180 °C até dourar. Espere amornar antes de servir.',
  schnitzel: 'Tempere e bata os filés até ficarem finos. Passe cada um na farinha, no ovo batido e na farinha de rosca. Frite em manteiga clarificada até dourar dos dois lados e sirva com limão.',
  kartoffelsalat: 'Cozinhe as batatas com casca até ficarem macias, mas firmes. Descasque e corte ainda mornas. Misture cebola, vinagre, óleo e mostarda; envolva as batatas no molho e deixe descansar antes de servir.',
  'oma brot': 'Misture farinha, fermento, água e sal. Sove até obter uma massa lisa e deixe crescer coberta até dobrar de volume. Modele o pão, deixe crescer novamente e asse a 200 °C até formar uma casca dourada.',
  rollmops: 'Tempere os filés de peixe e deixe marinar conforme a receita da família. Recheie com picles e cebola, enrole e prenda com um palito. Mantenha refrigerado na marinada até servir.'
};

const detailContainer = document.getElementById('recipe-detail');
const recipeId = new URLSearchParams(window.location.search).get('id');

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function normalizeName(value) {
  return String(value).toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function findImage(recipe) {
  if (recipe.imagem || recipe.strMealThumb) return recipe.imagem || recipe.strMealThumb;
  const name = normalizeName(recipe.nome || '');
  const match = Object.keys(DEFAULT_IMAGES).find((knownName) => name.includes(knownName));
  return DEFAULT_IMAGES[match] || DEFAULT_IMAGES.apfelstrudel;
}

function findPreparation(recipe) {
  if (recipe.preparo || recipe.strInstructions) return recipe.preparo || recipe.strInstructions;
  const name = normalizeName(recipe.nome || '');
  const match = Object.keys(DEFAULT_PREPARATIONS).find((knownName) => name === knownName);
  return DEFAULT_PREPARATIONS[match] || '';
}

function showNotFound(message) {
  detailContainer.innerHTML = `
    <section class="detail-empty">
      <h2>Receita indisponível</h2>
      <p>${escapeHtml(message)}</p>
      <a class="button primary" href="index.html#receitas">Voltar às receitas</a>
    </section>
  `;
}

function renderRecipe(recipe) {
  const ingredients = Array.isArray(recipe.ingredientes)
    ? recipe.ingredientes
    : typeof recipe.ingredientes === 'string'
      ? recipe.ingredientes.split(',').map((item) => item.trim()).filter(Boolean)
      : [];
  const preparation = findPreparation(recipe);
  const image = findImage(recipe);

  document.title = `${recipe.nome || 'Receita'} | Receitas da Oma`;
  detailContainer.innerHTML = `
    <article class="detail-card">
      <section class="detail-hero">
        <img src="${escapeHtml(image)}" alt="${escapeHtml(recipe.nome || 'Foto da receita')}" />
        <div class="detail-heading">
          <span class="recipe-origin">${escapeHtml(recipe.pais || 'Receita de família')} · ${escapeHtml(recipe.categoria || 'Especialidade')}</span>
          <h2>${escapeHtml(recipe.nome || 'Receita da Oma')}</h2>
          <p class="detail-summary">${escapeHtml(recipe.comentario || 'Um sabor especial para compartilhar à mesa.')}</p>
        </div>
      </section>
      <div class="detail-content">
        <aside>
          <div class="detail-facts">
            <div class="detail-fact"><span>Preparo</span><strong>${Number(recipe.tempoPreparo) || '—'} min</strong></div>
            <div class="detail-fact"><span>Dificuldade</span><strong>${escapeHtml(recipe.dificuldade || 'Média')}</strong></div>
            <div class="detail-fact"><span>Avaliação</span><strong>${Number(recipe.nota || 0).toFixed(1)} / 5</strong></div>
            <div class="detail-fact"><span>Origem</span><strong>${escapeHtml(recipe.pais || '—')}</strong></div>
          </div>
          <h3>Ingredientes</h3>
          ${ingredients.length
            ? `<ul class="detail-ingredients">${ingredients.map((ingredient) => `<li>${escapeHtml(ingredient)}</li>`).join('')}</ul>`
            : '<p class="detail-empty">Os ingredientes ainda não foram cadastrados.</p>'}
        </aside>
        <section>
          <h3>Modo de preparo</h3>
          ${preparation
            ? `<div class="detail-preparation">${escapeHtml(preparation)}</div>`
            : '<p class="detail-empty">O modo de preparo ainda não foi informado. Edite a receita na página inicial para adicioná-lo.</p>'}
        </section>
      </div>
    </article>
  `;

  const imageElement = detailContainer.querySelector('.detail-hero img');
  imageElement.addEventListener('error', () => {
    if (imageElement.dataset.fallback) return;
    imageElement.dataset.fallback = 'true';
    imageElement.src = DEFAULT_IMAGES.apfelstrudel;
  });
}

try {
  if (!recipeId) {
    showNotFound('Não foi informado qual receita deve ser exibida.');
  } else {
    const savedRecipes = JSON.parse(localStorage.getItem(RECIPE_STORAGE_KEY) || '[]');
    const recipe = savedRecipes.find((item) => String(item.id || item._id?.$oid || item._id) === recipeId);
    if (recipe) {
      renderRecipe(recipe);
    } else {
      showNotFound('Não encontramos essa receita. Volte ao catálogo e escolha outra.');
    }
  }
} catch (error) {
  console.error('Não foi possível carregar os dados da receita.', error);
  showNotFound('O navegador não conseguiu ler os dados salvos desta receita.');
}
