import '../styles/style.scss';
import { setupMenuItem } from './navMenu.js';
import { openDropdown } from './cities';
import { setupBurgerMenu } from './burgerMenu';
import { getData } from './api';

setupBurgerMenu(document.querySelector('.burger_menu'));
openDropdown(document.querySelector('.city'));
setupMenuItem(document.querySelector('#navigation'));
