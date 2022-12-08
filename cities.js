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
  let state = {
    bageList: [],
  };

  const isEmptyBageList = state.bageList.length === 0;

  const dropDownElement = document.querySelector('.drop_down_menu');
  const bagesContainer = document.querySelector('.cities-bages');

  if (isEmptyBageList) {
    dropDownElement.style.cssText = 'height: 340px';
    bagesContainer.classList.add('hidden');
  } else {
    dropDownElement.style.cssText = 'height: 420px';
    bagesContainer.classList.remove('hidden');
  }

  cities.forEach((city) => {
    const itemElement = document.createElement('div');
    const spanElement = document.createElement('span');

    spanElement.innerText = city;
    itemElement.appendChild(spanElement);
    itemElement.classList.add('city');

    itemElement.addEventListener('click', (event) => {
      console.log('item', event.target.innerText);
      const bageName = event.target.innerText;
      state = {
        ...state,
        bageList: [...state.bageList, event.target.innerText],
      };
    });

    element.appendChild(itemElement);
  });

  console.log('state', state);
}
