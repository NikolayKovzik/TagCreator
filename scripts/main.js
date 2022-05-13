import { TagList } from './TagList.js';

window.addEventListener('beforeunload', setLocalStorage);
// window.addEventListener('load', getLocalStorage);



let tagList = new TagList(getLocalStorage());


function setLocalStorage() {  
    localStorage.setItem('tagCreatorLocalStorage', JSON.stringify(tagList.getTagContainer())) 
}   

function getLocalStorage() {
    if (localStorage.getItem('tagCreatorLocalStorage')) {
        console.log(JSON.parse(localStorage.getItem('tagCreatorLocalStorage')));
        return JSON.parse(localStorage.getItem('tagCreatorLocalStorage'));
    } else return [];
}

