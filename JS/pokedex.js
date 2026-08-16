const cards = [
  { name: 'Archeduc', image: './Images/Cartes/Archeduc.png', sound: './Sons/Archeduc.mp3' },
  { name: 'Banshitrouye', image: './Images/Cartes/Banshitrouye.png', sound: './Sons/Banshitrouye.mp3' },
  { name: 'Branette', image: './Images/Cartes/Branette.png', sound: './Sons/Branette.mp3' },
  { name: 'Corayome', image: './Images/Cartes/Corayome.png', sound: './Sons/Corayome.mp3' },
  { name: 'Courrousinge', image: './Images/Cartes/Courrousinge.png', sound: './Sons/Courrousinge.mp3' },
  { name: 'Desseliande', image: './Images/Cartes/Desseliande.png', sound: './Sons/Desseliande.mp3' },
  { name: 'Ectoplasma', image: './Images/Cartes/Ectoplasma.png', sound: './Sons/Ectoplasma.mp3' },
  { name: 'Exagide', image: './Images/Cartes/Exagide.png', sound: './Sons/Exagide.mp3' },
  { name: 'Flamigator', image: './Images/Cartes/Flamigator.png', sound: './Sons/Flamigator.mp3' },
  { name: 'Golemastoc', image: './Images/Cartes/Golemastoc.png', sound: './Sons/Golemastoc.mp3' },
  { name: 'Grodrive', image: './Images/Cartes/Grodrive.png', sound: './Sons/Grodrive.mp3' },
  { name: 'Gromago', image: './Images/Cartes/Gromago.png', sound: './Sons/Gromago.mp3' },
  { name: 'Lanssorien', image: './Images/Cartes/Lanssorien.png', sound: './Sons/Lanssorien.mp3' },
  { name: 'Lugulabre', image: './Images/Cartes/Lugulabre.png', sound: './Sons/Lugulabre.mp3' },
  { name: 'Magireve', image: './Images/Cartes/Magireve.png', sound: './Sons/Magireve.mp3' },
  { name: 'Malvalame', image: './Images/Cartes/Malvalame.png', sound: './Sons/Malvalame.mp3' },
  { name: 'Mimiqui', image: './Images/Cartes/Mimiqui.png', sound: './Sons/Mimiqui.mp3' },
  { name: 'Momartik', image: './Images/Cartes/Momartik.png', sound: './Sons/Momartik.mp3' },
  { name: 'Motisma', image: './Images/Cartes/Motisma.png', sound: './Sons/Motisma.mp3' },
  { name: 'Moyade', image: './Images/Cartes/Moyade.png', sound: './Sons/Moyade.mp3' },
  { name: 'Munja', image: './Images/Cartes/Munja.png', sound: './Sons/Munja.mp3' },
  { name: 'Noctunoir', image: './Images/Cartes/Noctunoir.png', sound: './Sons/Noctunoir.mp3' },
  { name: 'Ossatueur', image: './Images/Cartes/Ossatueur.png', sound: './Sons/Ossatueur.mp3' },
  { name: 'Paragruel', image: './Images/Cartes/Paragruel.png', sound: './Sons/Paragruel.mp3' },
  { name: 'Polthegeist', image: './Images/Cartes/Polthegeist.png', sound: './Sons/Polthegeist.mp3' },
  { name: 'Sinistrail', image: './Images/Cartes/Sinistrail.png', sound: './Sons/Sinistrail.mp3' },
  { name: 'Spiritomb', image: './Images/Cartes/Spiritomb.png', sound: './Sons/Spiritomb.mp3' },
  { name: 'Tenefix', image: './Images/Cartes/Tenefix.png', sound: './Sons/Tenefix.mp3' },
  { name: 'Theffroyable', image: './Images/Cartes/Theffroyable.png', sound: './Sons/Theffroyable.mp3' },
  { name: 'Tomberro', image: './Images/Cartes/Tomberro.png', sound: './Sons/Tomberro.mp3' },
  { name: 'Trepassable', image: './Images/Cartes/Trepassable.png', sound: './Sons/Trepassable.mp3' },
  { name: 'Tutankafer', image: './Images/Cartes/Tutankafer.png', sound: './Sons/Tutankafer.mp3' },
  { name: 'Tutetekri', image: './Images/Cartes/Tutetekri.png', sound: './Sons/Tutetekri.mp3' },
  { name: 'Typhlosion', image: './Images/Cartes/Typhlosion.png', sound: './Sons/Typhlosion.mp3' },
  { name: 'Virevorreur', image: './Images/Cartes/Virevorreur.png', sound: './Sons/Virevorreur.mp3' },
  { name: 'Zoroark', image: './Images/Cartes/Zoroark.png', sound: './Sons/Zoroark.mp3' }
];

const catalog = document.getElementById('card-catalog');
const searchInput = document.getElementById('card-search');
const resultsCounter = document.getElementById('search-results');
const modalOverlay = document.getElementById('card-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.getElementById('modal-close');

function normalizeText(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function createCardElement(card) {
  const article = document.createElement('button');
  article.type = 'button';
  article.className = 'catalog-card';
  article.setAttribute('data-name', card.name.toLowerCase());
  article.setAttribute('aria-label', `Afficher ${card.name}`);
  article.innerHTML = `
    <img src="${card.image}" alt="${card.name}">
    <span>${card.name}</span>
  `;

  article.addEventListener('click', () => {
    openCardModal(card);
    playCardSound(card);
  });

  return article;
}

function renderCards(filter = '') {
  const normalizedFilter = normalizeText(filter.trim());

  catalog.innerHTML = '';

  const filteredCards = cards.filter(({ name }) =>
    normalizeText(name).includes(normalizedFilter)
  );

  filteredCards.forEach((card) => {
    catalog.appendChild(createCardElement(card));
  });

  if (filteredCards.length === 0) {
    resultsCounter.textContent = '0 Pokémon trouvés en utilisant les filtres de recherche';
  } else {
    resultsCounter.textContent = `${filteredCards.length} Pokémon trouvés en utilisant les filtres de recherche`;
  }
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
  const audioUrl = card.sound || './Sons/default.mp3';
  const audio = new Audio(audioUrl);
  audio.volume = 1;
  audio.play().catch(() => {
    // Les fichiers sonores seront ajoutés dans le dossier Sons plus tard.
  });
}

searchInput.addEventListener('input', (event) => {
  renderCards(event.target.value);
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
