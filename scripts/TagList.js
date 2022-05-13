import { Tag } from './Tag.js';

export class TagList {
    constructor() {
        this.tagContainer = [];
        this.inputForm = document.querySelector(".form");
        this.display = document.querySelector(".display-panel");
        this.tagInput = this.inputForm["tag-input"];
        this.formButton = document.querySelector(".form__button");
        this.clearButton = document.querySelector(".clear-button");
    }

    init() {
        this.inputForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (this.isInputValueValid() && this.isInputUnique()) {
                this.appendNewTag(this.createNewTag());
            }
        });
        this.tagInput.addEventListener('input', () => {
            if (this.isInputValueValid()) {
                this.tagInput.classList.remove('invalid');
                this.formButton.removeAttribute('disabled');
            } else {
                this.tagInput.classList.add('invalid');
                this.formButton.setAttribute('disabled', 'true');
            }
        });
        this.clearButton.addEventListener('click', () => {
            this.clearDisplay();
        });
    }

    isInputValueValid() {
        return (!this.tagInput.value || this.tagInput.value.length > 40) ? false : true;
    }

    isInputUnique() {
        return this.tagContainer.reduce((isUnique, tag) => {
            return (tag.content === this.tagInput.value  || !isUnique) ? false : true;
        },true)
    }

    checkMaxId() {
        return !this.tagContainer.length ? 1 : this.tagContainer.reduce((maxId, tag) => {
            return tag.id >= maxId ? tag.id + 1 : maxId;
        },1)
    }

    createNewTag() {
        let newTag = new Tag(this.tagInput.value);
        newTag.id = this.checkMaxId();
        this.tagInput.value = '';
        this.tagContainer.push(newTag);
        return newTag;
    }

    appendNewTag(newTag) {
        let newTagElement = document.createElement('div');
        newTagElement.classList.add('tag');
        newTagElement.id = `tag${newTag.id}`;
        newTagElement.innerHTML = `
        <div class="tag__text">${newTag.content}</div>
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

    clearDisplay() {
        this.display.querySelectorAll('.tag').forEach((tag) => {
            tag.remove();
        });
        this.tagContainer.splice(0);
    }

    deleteTag(deleteIcon) {
        // console.log(deleteIcon.parentNode)
        let parentId = +(deleteIcon.parentNode.id.match(/\d+/)||[])[0];
        this.tagContainer = this.tagContainer.filter((tag)=>{
            return tag.id !== parentId ? true : false;
        })
        // console.log(this.tagContainer)
        deleteIcon.parentNode.remove();
    }
}






