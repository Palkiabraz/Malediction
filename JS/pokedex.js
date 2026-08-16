const cards = [
  { name: 'Archeduc', image: './Images/Cartes/Archeduc.png', sound: './Sons/Archeduc.ogg' },
  { name: 'Banshitrouye', image: './Images/Cartes/Banshitrouye.png', sound: './Sons/Banshitrouye.ogg' },
  { name: 'Branette', image: './Images/Cartes/Branette.png', sound: './Sons/Branette.ogg' },
  { name: 'Corayome', image: './Images/Cartes/Corayome.png', sound: './Sons/Corayome.ogg' },
  { name: 'Courrousinge', image: './Images/Cartes/Courrousinge.png', sound: './Sons/Courrousinge.ogg' },
  { name: 'Desseliande', image: './Images/Cartes/Desseliande.png', sound: './Sons/Desseliande.ogg' },
  { name: 'Ectoplasma', image: './Images/Cartes/Ectoplasma.png', sound: './Sons/Ectoplasma.ogg' },
  { name: 'Exagide', image: './Images/Cartes/Exagide.png', sound: './Sons/Exagide.ogg' },
  { name: 'Flamigator', image: './Images/Cartes/Flamigator.png', sound: './Sons/Flamigator.ogg' },
  { name: 'Golemastoc', image: './Images/Cartes/Golemastoc.png', sound: './Sons/Golemastoc.ogg' },
  { name: 'Grodrive', image: './Images/Cartes/Grodrive.png', sound: './Sons/Grodrive.ogg' },
  { name: 'Gromago', image: './Images/Cartes/Gromago.png', sound: './Sons/Gromago.ogg' },
  { name: 'Lanssorien', image: './Images/Cartes/Lanssorien.png', sound: './Sons/Lanssorien.ogg' },
  { name: 'Lugulabre', image: './Images/Cartes/Lugulabre.png', sound: './Sons/Lugulabre.ogg' },
  { name: 'Magireve', image: './Images/Cartes/Magireve.png', sound: './Sons/Magireve.ogg' },
  { name: 'Malvalame', image: './Images/Cartes/Malvalame.png', sound: './Sons/Malvalame.ogg' },
  { name: 'Mimiqui', image: './Images/Cartes/Mimiqui.png', sound: './Sons/Mimiqui.ogg' },
  { name: 'Momartik', image: './Images/Cartes/Momartik.png', sound: './Sons/Momartik.ogg' },
  { name: 'Motisma', image: './Images/Cartes/Motisma.png', sound: './Sons/Motisma.ogg' },
  { name: 'Moyade', image: './Images/Cartes/Moyade.png', sound: './Sons/Moyade.ogg' },
  { name: 'Munja', image: './Images/Cartes/Munja.png', sound: './Sons/Munja.ogg' },
  { name: 'Noctunoir', image: './Images/Cartes/Noctunoir.png', sound: './Sons/Noctunoir.ogg' },
  { name: 'Ossatueur', image: './Images/Cartes/Ossatueur.png', sound: './Sons/Ossatueur.ogg' },
  { name: 'Paragruel', image: './Images/Cartes/Paragruel.png', sound: './Sons/Paragruel.ogg' },
  { name: 'Polthegeist', image: './Images/Cartes/Polthegeist.png', sound: './Sons/Polthegeist.ogg' },
  { name: 'Sinistrail', image: './Images/Cartes/Sinistrail.png', sound: './Sons/Sinistrail.ogg' },
  { name: 'Spiritomb', image: './Images/Cartes/Spiritomb.png', sound: './Sons/Spiritomb.ogg' },
  { name: 'Tenefix', image: './Images/Cartes/Tenefix.png', sound: './Sons/Tenefix.ogg' },
  { name: 'Theffroyable', image: './Images/Cartes/Theffroyable.png', sound: './Sons/Theffroyable.ogg' },
  { name: 'Tomberro', image: './Images/Cartes/Tomberro.png', sound: './Sons/Tomberro.ogg' },
  { name: 'Trepassable', image: './Images/Cartes/Trepassable.png', sound: './Sons/Trepassable.ogg' },
  { name: 'Tutankafer', image: './Images/Cartes/Tutankafer.png', sound: './Sons/Tutankafer.ogg' },
  { name: 'Tutetekri', image: './Images/Cartes/Tutetekri.png', sound: './Sons/Tutetekri.ogg' },
  { name: 'Typhlosion', image: './Images/Cartes/Typhlosion.png', sound: './Sons/Typhlosion.ogg' },
  { name: 'Virevorreur', image: './Images/Cartes/Virevorreur.png', sound: './Sons/Virevorreur.ogg' },
  { name: 'Zoroark', image: './Images/Cartes/Zoroark.png', sound: './Sons/Zoroark.ogg' }
];

const catalog = document.getElementById('card-catalog');
const searchInput = document.getElementById('card-search');
const resultsCounter = document.getElementById('search-results');
const modalOverlay = document.getElementById('card-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.getElementById('modal-close');
const cardMap = new Map(cards.map((card) => [card.name.toLowerCase(), card]));
const audioPlayer = new Audio();

function normalizeText(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function updateResultsCounter(count) {
  resultsCounter.textContent = `${count} Pokémon trouvés en utilisant les filtres de recherche`;
}

function createCardElement(card) {
  const article = document.createElement('button');
  article.type = 'button';
  article.className = 'catalog-card';
  article.dataset.name = card.name.toLowerCase();
  article.setAttribute('aria-label', `Afficher ${card.name}`);
  article.innerHTML = `
    <img src="${card.image}" alt="${card.name}" loading="lazy">
    <span>${card.name}</span>
  `;

  return article;
}

function renderCards(filter = '') {
  const normalizedFilter = normalizeText(filter.trim());
  const filteredCards = cards.filter(({ name }) =>
    normalizeText(name).includes(normalizedFilter)
  );

  catalog.replaceChildren(...filteredCards.map(createCardElement));
  updateResultsCounter(filteredCards.length);
}

function openCardModal(card) {
  modalImage.src = card.image;
  modalImage.alt = card.name;
  modalOverlay.classList.add('visible');
  modalOverlay.setAttribute('aria-hidden', 'false');
}

function closeCardModal() {
  modalOverlay.classList.remove('visible');
  modalOverlay.setAttribute('aria-hidden', 'true');
}

function playCardSound(card) {
  if (!card.sound) {
    return;
  }

  audioPlayer.src = card.sound;
  audioPlayer.currentTime = 0;
  audioPlayer.volume = 0.25;
  audioPlayer.play().catch(() => {});
}

searchInput.addEventListener('input', (event) => {
  renderCards(event.target.value);
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
