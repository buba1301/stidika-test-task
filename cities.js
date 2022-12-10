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

const dropDownMenu = document.querySelector('.drop_down_menu');
const dropDownElement = document.querySelector('.drop_down_menu');
const bagesContainer = document.querySelector('.cities-bages');

const addClassList = (element, className) =>
  element.classList.add(className);

const removeClassList = (element, className) =>
  element.classList.remove(className);

const isEmptyBageList = state.bageList.length === 0;

function deleteBage() {
  const closeElements = document.querySelectorAll('.fa-sharp');

  closeElements.forEach((element) =>
    element.addEventListener('click', (event) => {
      const { id } = event.target;

      state = {
        ...state,
        bageList: state.bageList.filter((bage) => bage !== id),
      };

      setupCitiesBages();

      if (isEmptyBageList) {
        addClassList(bagesContainer, 'hidden');
        dropDownElement.style.cssText = 'min-height: 335px';
      }
    })
  );
}

function setupCitiesBages() {
  const bages = state.bageList.map((bage) => {
    return `<div class="bage"><span>${bage}</span><i class="fa-sharp fa-solid fa-xmark" id=${bage}></i></div>`;
  });

  bagesContainer.innerHTML = bages.join('');

  deleteBage();
}

export function openDropdown(element) {
  let openDropdown = false;

  element.addEventListener('click', () => {
    openDropdown = !openDropdown;

    const addClassName = openDropdown
      ? 'drop_down_open'
      : 'drop_down_close';

    const removeClassName = openDropdown
      ? 'drop_down_close'
      : 'drop_down_open';

    removeClassList(dropDownMenu, removeClassName);
    addClassList(dropDownMenu, addClassName);
  });
}

export function setUpCitiesItems(element) {
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
      const bageName = event.target.innerText;
      state = {
        ...state,
        bageList: [...state.bageList, event.target.innerText],
      };
      dropDownElement.style.cssText = 'min-height: 420px';
      bagesContainer.classList.remove('hidden');
      setupCitiesBages();
    });

    element.appendChild(itemElement);
  });
}
