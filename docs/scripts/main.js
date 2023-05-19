const home = document.querySelector('.form-wrapper');
const formOpenBtn = document.getElementById('form-open');
const formCloseBtn = document.querySelector('.form-close');

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

window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbar');
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 0) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
});

formOpenBtn.addEventListener("click", () =>  home.classList.remove('show'));
formCloseBtn.addEventListener("click", () =>  home.classList.add('show'));


const wrapper = document.querySelector('.wrapper');
const signupHeader = document.querySelector('.signup header');
const loginHeader = document.querySelector('.login header');

loginHeader.addEventListener('click', () => {
  wrapper.classList.add('active');
});

signupHeader.addEventListener('click', () => {
  wrapper.classList.remove('active');
});

document.querySelector('#elastic').addEventListener('input', function() {
  let val = this.value.trim().toLowerCase();
  let elasticItems = document.querySelectorAll('.course__title');
  if (val !== '') {
    elasticItems.forEach(function(elem) {
      let game = elem.closest('.test');
      if (elem.innerText.toLowerCase().search(val) === -1) {
        game.classList.add('hide');
      } else {
        game.classList.remove('hide');
      }
    });
  } else {
    elasticItems.forEach(function(elem) {
      let game = elem.closest('.test');
      game.classList.remove('hide');
    });
  }
});