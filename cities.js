const cities = [
  'VJcrdf',
  'sfsfsfdf',
  'rtnmrmtnr',
  'rtnsss',
  'eremnrer',
  'fkhjfgmfg',
  'dfrogpdpfod',
  'rnfhdglsf',
];

export function setUpCitiesItems(element) {
  return cities.forEach((city) => {
    const itemElement = document.createElement('div');
    const spanElement = document.createElement('span');

    spanElement.innerText = city;
    itemElement.appendChild(spanElement);
    itemElement.classList.add('city');

    element.appendChild(itemElement);
  });
}
