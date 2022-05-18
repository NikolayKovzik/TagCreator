import { TagListManager } from './TagListManager.js';

window.addEventListener('beforeunload', setLocalStorage);
// window.addEventListener('load', getLocalStorage);



let tagListManager = new TagListManager(getLocalStorage());


function setLocalStorage() {
    localStorage.setItem('tagCreatorLocalSStorage', JSON.stringify(tagListManager.tagListContainer))
}

function getLocalStorage() {
    if (localStorage.getItem('tagCreatorLocalSStorage')) {
        console.log(JSON.parse(localStorage.getItem('tagCreatorLocalSStorage')));
        return JSON.parse(localStorage.getItem('tagCreatorLocalSStorage'));
    } else return [];
}