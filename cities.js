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

export function openDropdown(element) {
  console.log('element', element);
  let openDropdown = false;

  const dropDownMenu = document.querySelector('.drop_down_menu');

  element.addEventListener('click', () => {
    openDropdown = !openDropdown;

    console.log('open', openDropdown);

    if (openDropdown) {
      dropDownMenu.classList.remove('drop_down_close');
      dropDownMenu.classList.add('drop_down_open');
    } else {
      dropDownMenu.classList.remove('drop_down_open');
      dropDownMenu.classList.add('drop_down_close');
    }
  });
}

export function setUpCitiesItems(element) {
  const isEmptyBageList = state.bageList.length === 0;

  const dropDownElement = document.querySelector('.drop_down_menu');
  const bagesContainer = document.querySelector('.cities-bages');

  if (isEmptyBageList) {
    dropDownElement.style.cssText = 'height: 335px';
    bagesContainer.classList.add('hidden');
  }

  cities.forEach((city) => {
    const itemElement = document.createElement('div');
    const spanElement = document.createElement('span');

    spanElement.innerText = city;
    itemElement.appendChild(spanElement);
    itemElement.classList.add('region');

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
    const bageElement = document.createElement('div');
    const textElement = document.createElement('span');
    const closeElement = document.createElement('i');

    bageElement.classList.add('bage');
    textElement.innerText = bage;
    closeElement.classList.add('fa-sharp fa-solid fa-xmark');

    //TODO: как добавить кнопку закрытия

    bageElement.appendChild(textElement);
    bageElement.appendChild(closeElement);

    element.appendChild(bageElement);
  });
}
