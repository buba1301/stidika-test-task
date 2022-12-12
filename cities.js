import { getData } from './api';

let state = {
  openDropdown: false,
  isLoading: false,
  regionsList: [],
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

const toggleClassList = (element, className) =>
  element.classList.toggle(className);

const addCss = (element, css) => (element.style.cssText = css);

const setState = (key, value) => {
  state = {
    ...state,
    [key]: value,
  };
};

function deleteBage() {
  const closeElements = document.querySelectorAll('.fa-sharp');

  closeElements.forEach((element) =>
    element.addEventListener('click', (event) => {
      const { id } = event.target;

      const data = state.bageList.filter(
        (bage) => bage.id.toString() !== id
      );

      setState('bageList', data);

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
  const bages = state.bageList.map(({ name, id }) => {
    return `<div class="bage" id=${id}><span>${name}</span><i class="fa-sharp fa-solid fa-xmark" id=${id}></i></div>`;
  });

  bagesContainer.innerHTML = bages.join('');

  deleteBage();
}

function addCityElement(name, id) {
  const itemElement = document.createElement('div');
  const spanElement = document.createElement('span');

  spanElement.innerText = name;
  itemElement.appendChild(spanElement);
  addClassList(itemElement, 'region');
  itemElement.id = id;

  itemElement.addEventListener('click', (event) => {
    const data = [...state.bageList, { name, id }];
    setState('bageList', data);

    addCss(dropDownElement, 'min-height: 420px');
    removeClassList(bagesContainer, 'hidden');

    setupCitiesBages();
  });

  regionsElement.appendChild(itemElement);
}

function addRegionInfo(name, id) {
  const spanElement = document.createElement('span');
  const cityElement = document.getElementById(id);

  spanElement.innerText = name;
  addClassList(spanElement, 'region_info');
  cityElement.appendChild(spanElement);
}

function setUpCitiesItems() {
  const isEmptyBageList = state.bageList.length === 0;

  if (isEmptyBageList) {
    addCss(dropDownElement, 'height: 335px');
    addClassList(bagesContainer, 'hidden');
  }

  state.regionsList.forEach(({ name, type, cities, id }) => {
    addCityElement(name, id);

    if (type === 'area') {
      cities.forEach((city) => {
        addCityElement(city.name, city.name);
        addRegionInfo(name, city.name);
      });
    }
  });
}

function setUpLoader() {
  const loaderElement = document.createElement('div');

  addClassList(loaderElement, 'loader');
  loaderElement.innerHTML =
    '<div></div><div></div><div></div><div></div>';

  regionsElement.appendChild(loaderElement);
}

function deleteChildrenElements() {
  regionsElement.innerHTML = '';
}

async function fetchData() {
  setState('isLoading', true);

  if (state.isLoading) setUpLoader();

  try {
    const data = await getData();

    setState('isLoading', false);
    setState('regionsList', data);

    deleteChildrenElements();
  } catch (e) {
    console.log(e);
  }
}

export function openDropdown(element) {
  element.addEventListener('click', async () => {
    const isEmptyRegionsList = state.regionsList.length === 0;

    setState('openDropdown', !state.openDropdown);

    state.openDropdown && searchCityElement.focus();

    toggleClassList(dropDownMenu, 'drop_down_close');
    toggleClassList(dropDownMenu, 'drop_down_open');

    setUpCitiesItems();

    if (state.openDropdown && isEmptyRegionsList) {
      await fetchData();

      setUpCitiesItems();
    }

    !state.openDropdown && deleteChildrenElements();
  });
}
