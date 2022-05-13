import { TagList } from './TagList.js';

window.addEventListener('beforeunload', setLocalStorage);
// window.addEventListener('load', getLocalStorage);



let tagList = new TagList(getLocalStorage());


function setLocalStorage() {  
    localStorage.setItem('tagCreator', JSON.stringify(tagList.getTagContainer())) 
}   

function getLocalStorage() {
    if (localStorage.getItem('tagCreator')) {
        console.log(JSON.parse(localStorage.getItem('tagCreator')));
        return JSON.parse(localStorage.getItem('tagCreator'));
    } else return [];
}

