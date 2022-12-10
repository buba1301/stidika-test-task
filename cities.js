/*const cities = [
  'VJcrdf',
  'Sfsfsfdf',
  'Rtnmrmtnr',
  'Rtnsss',
  'Eremnrer',
  'Fkhjfgmfg',
  'Dfrogpdpfod',
  'Rnfhdglsf',
];*/

import { getData } from './api';

let state = {
  bageList: [],
};

const dropDownMenu = document.querySelector('.drop_down_menu');
const dropDownElement = document.querySelector('.drop_down_menu');
const bagesContainer = document.querySelector('.cities-bages');
const searchCityElement = document.querySelector('.city_search');
const regionsElement = document.querySelector('.regions');

const addClassList = (element, className) =>
  element.classList.add(className);

const removeClassList = (element, className) =>
  element.classList.remove(className);

const addCss = (element, css) => (element.style.cssText = css);

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

      const isEmptyBageList = state.bageList.length === 0;

      if (isEmptyBageList) {
        addClassList(bagesContainer, 'hidden');
        addCss(dropDownElement, 'height: 335px');
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

function addCityElement(name) {
  const itemElement = document.createElement('div');
  const spanElement = document.createElement('span');

  spanElement.innerText = name;
  itemElement.appendChild(spanElement);
  addClassList(itemElement, 'region');
  itemElement.id = name;

  itemElement.addEventListener('click', (event) => {
    const bageName = event.target.innerText;

    state = {
      ...state,
      bageList: [...state.bageList, event.target.innerText],
    };

    addCss(dropDownElement, 'min-height: 420px');
    removeClassList(bagesContainer, 'hidden');

    setupCitiesBages();
  });

  regionsElement.appendChild(itemElement);
}

function addRegionElement(name, id) {
  const spanElement = document.createElement('span');
  const regionElement = document.getElementById(id);

  spanElement.innerText = name;
  addClassList(spanElement, 'region_info');
  regionElement.appendChild(spanElement);
}

function setUpCitiesItems(regions) {
  const isEmptyBageList = state.bageList.length === 0;

  if (isEmptyBageList) {
    addCss(dropDownElement, 'height: 335px');
    addClassList(bagesContainer, 'hidden');
  }

  regions.forEach(({ name, type, cities }) => {
    addCityElement(name);

    if (type === 'area') {
      cities.forEach((city) => {
        addCityElement(city.name);
        addRegionElement(name, city.name);
      });
    }
  });
}

export async function openDropdown(element) {
  let openDropdown = false;

  element.addEventListener('click', () => {
    openDropdown = !openDropdown;

    openDropdown && searchCityElement.focus();

    const addClassName = openDropdown
      ? 'drop_down_open'
      : 'drop_down_close';

    const removeClassName = openDropdown
      ? 'drop_down_close'
      : 'drop_down_open';

    removeClassList(dropDownMenu, removeClassName);
    addClassList(dropDownMenu, addClassName);
  });
  const data = await getData();
  setUpCitiesItems(data);
}
