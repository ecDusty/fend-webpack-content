import { checkForName } from '../components/form/nameChecker';
import { handleSubmit } from '../components/form/formHandler';

console.log(checkForName);

// alert("I EXIST")


document.querySelector('form').addEventListener('submit', (e) => handleSubmit(e));
