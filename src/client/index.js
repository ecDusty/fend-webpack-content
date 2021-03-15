// Styles
import './styles/main.scss'

// Scripts
import { handleSubmit } from './js/formHandler'

import myImage from './images/test.jpg'

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
	handleSubmit(e);
});

// console.log(checkForName);

// console.log(myImage);
