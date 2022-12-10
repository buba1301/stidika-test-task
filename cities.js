const cities = [
  'VJcrdf',
  'Sfsfsfdf',
  'Rtnmrmtnr',
  'Rtnsss',
  'Eremnrer',
  'Fkhjfgmfg',
  'Dfrogpdpfod',
  'Rnfhdglsf',
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
      dropDownElement.style.cssText = 'min-height: 420px';
      bagesContainer.classList.remove('hidden');
      setupCitiesBages(document.querySelector('.cities-bages'));
    });

    element.appendChild(itemElement);
  });
}

export function setupCitiesBages(element) {
  console.log('state', state.bageList);
  const bages = state.bageList.map((bage) => {
    return `<div class="bage"><span>${bage}</span><i class="fa-sharp fa-solid fa-xmark"></i></div>`;
  });

  element.innerHTML = bages.join('');
}
