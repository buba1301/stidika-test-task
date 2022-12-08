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

let state = {
  bageList: [],
};

export function setUpCitiesItems(element) {
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
      dropDownElement.style.cssText = 'height: 420px';
      bagesContainer.classList.remove('hidden');
      setupCitiesBages(document.querySelector('.cities-bages'));
    });

    element.appendChild(itemElement);
  });
}

export function setupCitiesBages(element) {
  console.log('state', state.bageList);
  state.bageList.forEach((bage) => {
    const bageElement = document.createElement('span');
    bageElement.classList.add('bage');
    bageElement.innerText = bage;

    element.appendChild(bageElement);
  });
}
