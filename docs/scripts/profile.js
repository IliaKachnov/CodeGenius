document.addEventListener('click', documentActions);

function documentActions(e) {
  const targetElement = e.target;

  if(targetElement.closest('.icon-menu')) {
    document.documentElement.classList.toggle('menu-open')
  }

  if(targetElement.closest('[data-goto]')) {
    document.documentElement.classList.contains('menu-open') ?
      document.documentElement.classList.remove('menu-open') : null;


    const goTo = targetElement.closest('[data-goto]').dataset.goto;
    const goToElement = document.querySelector(goTo);
    const headerHeight = document.querySelector('.header').offsetHeight;

    if (goToElement) {
      window.scrollTo({
        top: goToElement.offsetTop - (headerHeight + 15),
        behavior: 'smooth'
      })
    }
    e.preventDefault();
  }
}

const progressBar = document.querySelector('.progress-bar');
const progressPercent = document.querySelector('.progress-percent');

const updateProgress = () => {
  const value = progressBar.value;
  progressPercent.textContent = `${value}% материалов пройдено`;
};

updateProgress(); // Обновляем значение процента при загрузке страницы

progressBar.addEventListener('input', updateProgress); // Обновляем значение процента при изменении значения прогресс-бара