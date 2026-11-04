const catalog = document.getElementById('card-catalog');
const searchInput = document.getElementById('card-search');
const resultsCounter = document.getElementById('search-results');
const generationAll = document.getElementById('generation-all');
const generationInputs = [...document.querySelectorAll('.generation-options input:not(#generation-all)')];
const modalOverlay = document.getElementById('card-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.getElementById('modal-close');
const shinyStars = document.getElementById('shiny-stars');
const cardMap = new Map([...catalog.querySelectorAll('.catalog-card')].map((card) => [card.dataset.name, card]));
const audioPlayer = new Audio();
const SHINY_CHANCE = 1 / 4096;
const SHINY_SOUND = './Sons/Shiny.mp3';
let activeSelection = 0;
let shinyCleanupTimer;

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
    const cardGenerations = (card.dataset.generations || card.dataset.generation || '').split(',');
    const matchesGeneration = generationAll.checked || cardGenerations.some((generation) => selectedGenerations.has(generation));
    const isVisible = matchesSearch && matchesGeneration;
    card.hidden = !isVisible;
    visibleCount += isVisible ? 1 : 0;
  });

  updateResultsCounter(visibleCount);
}

function openCardModal(card, selectionId) {
  const image = card.querySelector('img');
  modalImage.src = image.src;
  modalImage.alt = image.alt;
  modalOverlay.classList.add('visible');
  modalOverlay.setAttribute('aria-hidden', 'false');

  if (Math.random() >= SHINY_CHANCE) {
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    const shinyImage = new Image();
    shinyImage.addEventListener('load', () => {
      if (selectionId === activeSelection) {
        modalImage.src = shinyImage.src;
      }
      resolve(true);
    }, { once: true });
    shinyImage.addEventListener('error', () => resolve(false), { once: true });
    shinyImage.src = `./Images/Cartes/Chromatiques/${image.getAttribute('src').split('/').pop()}`;
  });
}

function closeCardModal() {
  activeSelection += 1;
  stopShinyEffect();
  modalOverlay.classList.remove('visible');
  modalOverlay.setAttribute('aria-hidden', 'true');
}

function startShinyEffect() {
  clearTimeout(shinyCleanupTimer);
  shinyStars.classList.remove('visible');
  shinyStars.replaceChildren();

  for (let index = 0; index < 18; index += 1) {
    const star = document.createElement('span');
    star.textContent = '✦';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--star-size', `${12 + Math.random() * 20}px`);
    star.style.setProperty('--star-delay', `${Math.random() * -1.2}s`);
    shinyStars.append(star);
  }

  void shinyStars.offsetWidth;
  shinyStars.classList.add('visible');
}

function stopShinyEffect() {
  shinyStars.classList.remove('visible');
  clearTimeout(shinyCleanupTimer);
  shinyCleanupTimer = setTimeout(() => {
    shinyStars.replaceChildren();
  }, 800);
}

function playAudio(source) {
  audioPlayer.src = source;
  audioPlayer.currentTime = 0;
  audioPlayer.volume = 0.25;
  return audioPlayer.play().catch((error) => {
    console.error(`Impossible de lire le son "${source}".`, error);
    return false;
  });
}

function playShinySound(selectionId) {
  audioPlayer.onended = () => {
    audioPlayer.onended = null;
    if (selectionId === activeSelection) {
      stopShinyEffect();
    }
  };
  audioPlayer.onplay = () => {
    if (selectionId === activeSelection) {
      startShinyEffect();
    }
  };
  audioPlayer.onerror = () => {
    if (selectionId === activeSelection) {
      stopShinyEffect();
    }
  };
  playAudio(SHINY_SOUND);
}

function playCardSound(card, shinyImagePromise, selectionId) {
  if (!card.dataset.sound) {
    return;
  }

  stopShinyEffect();
  audioPlayer.onplay = null;
  audioPlayer.onerror = null;
  audioPlayer.onended = async () => {
    audioPlayer.onended = null;
    if (selectionId === activeSelection && await shinyImagePromise && selectionId === activeSelection) {
      playShinySound(selectionId);
    }
  };
  playAudio(card.dataset.sound);
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

  const selectionId = ++activeSelection;
  const shinyImagePromise = openCardModal(card, selectionId);
  playCardSound(card, shinyImagePromise, selectionId);
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
