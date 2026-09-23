(function () {
  const button = document.getElementById('launch-button');
  const audio = document.getElementById('launch-sound');

  if (!button || !audio) return;

  let isRedirecting = false;

  const enterSite = () => {
    if (isRedirecting) return;

    isRedirecting = true;
    window.location.href = './accueil.html';
  };

  const finish = () => {
    button.classList.remove('playing');
    enterSite();
  };

  button.addEventListener('click', () => {
    if (isRedirecting) return;

    button.classList.add('playing');
    audio.currentTime = 0;
    audio.addEventListener('ended', finish, { once: true });

    const playPromise = audio.play();

    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(finish);
    }
  });
})();