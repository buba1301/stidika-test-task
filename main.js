import './style.scss';
import javascriptLogo from './javascript.svg';
import { setupMenuItem } from './navMenu.js';

/* document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector('#counter')); */
setupMenuItem(document.querySelector('#navigation'));
