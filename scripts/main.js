import { TagListManager } from './TagListManager.js';

window.addEventListener('beforeunload', setLocalStorage);
// window.addEventListener('load', getLocalStorage);



let tagListManager = new TagListManager(getLocalStorage());


function setLocalStorage() {
    localStorage.setItem('tagCreatorLocalStorage', JSON.stringify(tagListManager.tagListContainer))
}

function getLocalStorage() {
    if (localStorage.getItem('tagCreatorLocalStorage')) {
        console.log(JSON.parse(localStorage.getItem('tagCreatorLocalStorage')));
        return JSON.parse(localStorage.getItem('tagCreatorLocalStorage'));
    } else return [];
}