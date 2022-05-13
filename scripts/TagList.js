import { Tag } from './Tag.js';

export class TagList {
    constructor() {
        this.tagContainer = [];
        this.inputForm = document.querySelector(".form");
        this.display = document.querySelector(".display-panel");
        this.tagInput = this.inputForm["tag-input"];
    }

    init() {
        this.inputForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (this.isInputValueValid()) {
                this.appendNewTag(this.createNewTag());
            }
        })
    }

    isInputValueValid() {
        if(!this.tagInput.value || this.tagInput.value.length > 40){
            this.tagInput.classList.add('invalid')
        } else return true;
    }

    createNewTag() {
        let newTag = new Tag(this.tagInput.value);
        this.tagContainer.push(newTag);
        return newTag;
    }

    appendNewTag(newTag) {
        console.log(newTag.content.length)
        let newTagElement = document.createElement('div');
        newTagElement.classList.add('tag');
        newTagElement.innerHTML = `
        <div class="tag__text">
            ${newTag.content}
        </div>
        <div class="tag__delete-icon">
            <svg class="tag__svg-cross">
                <use xlink:href="../assets/svg/sprite.svg#cross"></use>
            </svg>
        </div>`;
        this.display.append(newTagElement);
        this.display.lastElementChild.querySelector(".tag__delete-icon").addEventListener('click', (event) => {
            this.deleteTag(event.currentTarget)
        })
    }


    deleteTag(deleteIcon) {
        deleteIcon.parentNode.remove();
    }
}






