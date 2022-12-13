export function setupBurgerMenu(element) {
  element.addEventListener('click', function () {
    element.classList.toggle('menu_open');
  });
}
