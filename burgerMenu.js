export function setupBurgerMenu(element) {
  // const btnMenu = document.querySelector('.burger_menu');

  element.addEventListener('click', function () {
    element.classList.toggle('menu_open');
  });
}
