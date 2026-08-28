const launchButton = document.getElementById('launch-button');
const launchSound = document.getElementById('launch-sound');

function enterSite() {
  window.location.href = './accueil.html';
}

launchButton.addEventListener('click', () => {
  launchButton.setAttribute('aria-disabled', 'true');
  launchSound.currentTime = 0;

  launchSound.addEventListener('ended', enterSite, { once: true });
  launchSound.play().catch(enterSite);
});