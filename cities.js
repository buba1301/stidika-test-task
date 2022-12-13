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
const searchCityWrapElement = document.querySelector(
  '.city_search_wrap'
);
const searchCityElement = document.querySelector('.city_search');
const regionsElement = document.querySelector('.regions');
const closeBtn = document.querySelector('.reset_btn');
const submitButton = document.querySelector('.save_button');
const filterNamesElement = document.querySelector(
  '.filter_button_name'
);

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

function clearSearchInput(allRegions) {
  closeBtn.addEventListener('click', () => {
    searchCityElement.value = '';
    addClassList(closeBtn, 'close_reset_btn');
    setState('regionsList', allRegions);
    deleteChildrenElements();
    setUpCitiesItems();
  });
}

function searchCity() {
  const copyRegionsList = [...state.regionsList];

  searchCityElement.addEventListener('input', ({ target }) => {
    const { value } = target;

    const isEmtySearch = value === '';

    if (isEmtySearch) {
      setState('regionsList', copyRegionsList);
      addClassList(closeBtn, 'close_reset_btn');
    } else {
      const filteredData = copyRegionsList.filter(({ name }) =>
        name.toLowerCase().includes(value)
      );
      setState('regionsList', filteredData);
      removeClassList(closeBtn, 'close_reset_btn');
    }
    deleteChildrenElements();
    setUpCitiesItems();
  });

  clearSearchInput(copyRegionsList);
}

function deleteBage() {
  const closeElements = document.querySelectorAll('.bage');

  closeElements.forEach((element) =>
    element.addEventListener('click', (event) => {
      const { id } = event.currentTarget;

      const cityElement = document.getElementById(`city-${id}`);
      removeClassList(cityElement, 'active');

      console.log(
        'CityElement',
        document.getElementById(`city-${id}`)
      );

      const data = state.bageList.filter(
        (bage) => bage.id.toString() !== id
      );

      setState('bageList', data);

      setupCitiesBages();
      setUpCitiesItems();

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
    return `<div class="bage" id=${id}><span>${name}</span><i class="fa-sharp fa-solid fa-xmark"></i></div>`;
  });

  bagesContainer.innerHTML = bages.join('');

  deleteBage();
}

function addCityElement(name, id, area) {
  const cityElement = document.createElement('div');
  const nameElement = document.createElement('span');
  const areaElement = document.createElement('span');

  nameElement.innerText = name;
  cityElement.appendChild(nameElement);
  addClassList(cityElement, 'region');
  cityElement.id = `city-${id}`;

  if (area) {
    areaElement.innerText = area;
    addClassList(areaElement, 'region_info');
    cityElement.appendChild(areaElement);
  }

  cityElement.addEventListener('click', (event) => {
    const isActiveElement = state.bageList.find(
      (bage) => bage.id === id
    );

    if (isActiveElement) return;

    const data = [...state.bageList, { name, id }];
    setState('bageList', data);

    addCss(dropDownElement, 'min-height: 420px');
    addClassList(cityElement, 'active');
    removeClassList(bagesContainer, 'hidden');

    setupCitiesBages();
  });

  regionsElement.appendChild(cityElement);
}

function setUpCitiesItems() {
  console.log('setUpCitiesItems', state.regionsList);
  const isEmptyBageList = state.bageList.length === 0;

  if (isEmptyBageList) {
    addCss(dropDownElement, 'height: 335px');
    addClassList(bagesContainer, 'hidden');
  }

  state.regionsList.forEach(({ name, area, id }) => {
    addCityElement(name, id, area);
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

    const transformData = data.reduce((acc, item) => {
      acc.push(item);

      if (item.type === 'area') {
        const cities = item.cities.map((city) => ({
          ...city,
          area: item.name,
        }));
        return [...acc, ...cities];
      }

      return acc;
    }, []);

    setState('isLoading', false);
    setState('regionsList', transformData);

    deleteChildrenElements();
  } catch (e) {
    console.log(e);
  }
}

function setupSubmitButton() {
  submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    const { bageList } = state;

    const text = bageList.map(({ name }) => name).join(',');

    filterNamesElement.innerText = text;

    toggleClassList(dropDownMenu, 'drop_down_close');
    toggleClassList(dropDownMenu, 'drop_down_open');
    setState('openDropdown', !state.openDropdown);
  });
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

    searchCity();
    setupSubmitButton();

    !state.openDropdown && deleteChildrenElements();
  });
}
