const catalog = document.getElementById('card-catalog');
const searchInput = document.getElementById('card-search');
const resultsCounter = document.getElementById('search-results');
const generationAll = document.getElementById('generation-all');
const generationInputs = [...document.querySelectorAll('.generation-options input:not(#generation-all)')];
const modalOverlay = document.getElementById('card-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.getElementById('modal-close');
const cardMap = new Map([...catalog.querySelectorAll('.catalog-card')].map((card) => [card.dataset.name, card]));
const audioPlayer = new Audio();

function normalizeText(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function updateResultsCounter(count) {
  resultsCounter.textContent = `${count} Pokémon trouvés en utilisant le filtre de recherche`;
}

function renderCards(filter = '') {
  const normalizedFilter = normalizeText(filter.trim());
  const selectedGenerations = new Set(generationInputs.filter((input) => input.checked).map((input) => input.value));
  let visibleCount = 0;

  cardMap.forEach((card) => {
    const matchesSearch = normalizeText(card.dataset.name).includes(normalizedFilter);
    const matchesGeneration = generationAll.checked || selectedGenerations.has(card.dataset.generation);
    const isVisible = matchesSearch && matchesGeneration;
    card.hidden = !isVisible;
    visibleCount += isVisible ? 1 : 0;
  });

  updateResultsCounter(visibleCount);
}

function openCardModal(card) {
  const image = card.querySelector('img');
  modalImage.src = image.src;
  modalImage.alt = image.alt;
  modalOverlay.classList.add('visible');
  modalOverlay.setAttribute('aria-hidden', 'false');
}

function closeCardModal() {
  modalOverlay.classList.remove('visible');
  modalOverlay.setAttribute('aria-hidden', 'true');
}

function playCardSound(card) {
  if (!card.dataset.sound) {
    return;
  }

  audioPlayer.src = card.dataset.sound;
  audioPlayer.currentTime = 0;
  audioPlayer.volume = 0.25;
  audioPlayer.play().catch(() => {});
}

searchInput.addEventListener('input', (event) => {
  renderCards(event.target.value);
});

generationAll.addEventListener('change', () => {
  if (generationAll.checked) {
    generationInputs.forEach((input) => { input.checked = false; });
  }
  renderCards(searchInput.value);
});

generationInputs.forEach((input) => {
  input.addEventListener('change', () => {
    if (input.checked) {
      generationAll.checked = false;
    }
    if (!generationInputs.some((generationInput) => generationInput.checked)) {
      generationAll.checked = true;
    }
    renderCards(searchInput.value);
  });
});

catalog.addEventListener('click', (event) => {
  const cardButton = event.target.closest('.catalog-card');

  if (!cardButton) {
    return;
  }

  const card = cardMap.get(cardButton.dataset.name);

  if (!card) {
    return;
  }

  openCardModal(card);
  playCardSound(card);
});

modalClose.addEventListener('click', closeCardModal);
modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    closeCardModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalOverlay.classList.contains('visible')) {
    closeCardModal();
  }
});

renderCards();
