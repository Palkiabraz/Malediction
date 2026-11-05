(function () {
  const button = document.getElementById('launch-button');
  const audio = document.getElementById('launch-sound');

  if (!button || !audio) return;

  let hasStarted = false;
  let hasRedirected = false;

  const enterSite = () => {
    if (hasRedirected) return;

    hasRedirected = true;
    window.location.href = './accueil.html';
  };

  const finish = () => {
    button.classList.remove('playing');
    enterSite();
  };

  button.addEventListener('click', () => {
    if (hasStarted) return;
    hasStarted = true;

    button.classList.add('playing');
    audio.currentTime = 0;
    audio.addEventListener('ended', finish, { once: true });

    try {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch((error) => {
          console.warn('La lecture de Sons/Index.mp3 a échoué.', error);
          finish();
        });
      }
    } catch (error) {
      console.warn('La lecture de Sons/Index.mp3 a échoué.', error);
      finish();
    }
  });
})();
