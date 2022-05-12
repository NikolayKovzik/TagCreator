import {Tag} from './Tag.js';

export class TagManager{
    constructor() {
        this.tagContainer = [];
        this.inputForm = document.querySelector(".form");
        this.display = document.querySelector(".display-panel");
        this.tagInput = this.inputForm["tag-input"];
    }

    init() {
        this.inputForm.addEventListener('submit',(event)=>{
            event.preventDefault();
            this.addNewTag();
        })
    }

    addNewTag() {
        let newTag = document.createElement('div');
        newTag.classList.add('tag');
        newTag.innerHTML = `
        <div class="tag__text">
            ${this.tagInput.value}
        </div>
        <div class="tag__delete-icon">
            <svg class="tag__svg-cross">
                <use xlink:href="../assets/svg/sprite.svg#cross"></use>
            </svg>
        </div>`;
        this.display.append(newTag);
        this.display.lastElementChild.querySelector(".tag__delete-icon").addEventListener('click',(event)=>{
            this.deleteTag(event.currentTarget)
        })
    }


    deleteTag(deleteIcon) {
        deleteIcon.parentNode.remove();
    }
}






