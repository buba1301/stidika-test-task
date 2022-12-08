const menuItems = [
  'Вузы',
  'Колледжи',
  'Техникумы',
  'Училища',
  'Специальности',
  'Професии',
  'Отзывы',
  'Учебным заведениям',
  'Тест на профориентацию',
];

export function setupMenuItem(element) {
  return menuItems.forEach((item) => {
    const liElement = document.createElement('li');
    const aElement = document.createElement('a');
    liElement.appendChild(aElement);
    aElement.innerHTML = item;

    element.appendChild(liElement);
  });
}
