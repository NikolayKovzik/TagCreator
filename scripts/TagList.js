import { Tag } from './Tag.js';

export class TagList {
    constructor(tagArray) {
        this._tagContainer = tagArray;
        this._isReadOnly = false;
        this.inputForm = document.querySelector(".form");
        this.display = document.querySelector(".display-panel");
        this.tagInput = this.inputForm["tag-input"];
        this.formButton = document.querySelector(".form__button");
        this.clearButton = document.querySelector(".clear-button");
        this.inputErrorMessage = document.querySelector(".form__error-message");
        this.readOnlySwitcher = document.querySelector(".switcher__slider");
        // this.inputErrorWindow = document.querySelector(".input-error");
        this.init();
        if (this._tagContainer.length) {
            this.restoreDisplay();
        }
    }

    get tagContainer() {
        return this._tagContainer
    }

    get isReadOnly() {
        return this._isReadOnly;
    }

    restoreDisplay() {
        this._tagContainer.forEach((tag) => {
            this.appendNewTag(tag);
        })
    }

    init() {
        this.formButton.setAttribute('disabled', 'true');
        if (!this._tagContainer.length) {
            this.clearButton.setAttribute('disabled', 'true');
        }
        this.inputForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let isUnique = this.isInputUnique();
            let isValid = this.isInputValueValid();
            if (isValid !== 'isEmpty' && isValid !== 'inputOverflow' && isUnique) {
                this.clearButton.removeAttribute('disabled');
                this.appendNewTag(this.createNewTag());
            }
        });
        this.tagInput.addEventListener('input', () => {
            this.inputEventHandler();
        });
        this.clearButton.addEventListener('click', () => {
            this.clearDisplay();
        });
        this.readOnlySwitcher.addEventListener("click", () => {
            this.toggleReadOnlyMode();
        })
    }

    inputEventHandler() {
        let isValid = this.isInputValueValid();
        if (isValid === 'isEmpty') {
            this.disableFormArea("Нельзя добавить пустой тег.");
        }
        if (isValid === 'inputOverflow') {
            this.disableFormArea("Cлишком длинный тег!");
        }
        if (isValid === true) {
            this.enableFormArea();
        }
        if (!this.isInputUnique()) {
            this.disableFormArea("Такой тег уже есть!");
        }
    }

    disableFormArea(message) {
        this.tagInput.classList.add('invalid');
        this.formButton.setAttribute('disabled', 'true');
        this.inputErrorMessage.innerHTML = `${message}`;
    }

    enableFormArea() {
        this.tagInput.classList.remove('invalid');
        this.formButton.removeAttribute('disabled');
        this.inputErrorMessage.innerHTML = "";
    }

    isInputValueValid() {
        return (!this.tagInput.value) ? 'isEmpty' : (this.tagInput.value.length > 40) ? 'inputOverflow' : true;
    }

    isInputUnique() {
        return this._tagContainer.reduce((isUnique, tag) => {
            return (tag.content === this.tagInput.value || !isUnique) ? false : true;
        }, true)
    }

    checkMaxId() {
        return !this._tagContainer.length ? 1 : this._tagContainer.reduce((maxId, tag) => {
            return tag.id >= maxId ? tag.id + 1 : maxId;
        }, 1)
    }

    createNewTag() {
        let newTag = new Tag(this.tagInput.value);
        newTag.id = this.checkMaxId();
        this.tagInput.value = '';
        this._tagContainer.push(newTag);
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
        this.clearButton.setAttribute('disabled', 'true');
        this._tagContainer.splice(0);
    }

    deleteTag(deleteIcon) {
        // console.log(deleteIcon.parentNode)
        let parentId = +(deleteIcon.parentNode.id.match(/\d+/) || [])[0];
        this._tagContainer = this._tagContainer.filter((tag) => {
            return tag.id !== parentId ? true : false;
        })
        if (!this._tagContainer.length) {
            this.clearButton.setAttribute('disabled', 'true');
        }
        // console.log(this._tagContainer)
        deleteIcon.parentNode.remove();
    }

    toggleReadOnlyMode() {
        this._isReadOnly = this._isReadOnly ? false : true;
        if (this._isReadOnly) {
            this.formButton.setAttribute('disabled', 'true');
            this.clearButton.setAttribute('disabled', 'true');
            this.tagInput.setAttribute('disabled', 'true');

            this.display.querySelectorAll(".tag__delete-icon").forEach((cross) => {
                cross.querySelector(".tag__svg-cross").classList.add('read-only-mode');
                let crossClone = cross.cloneNode(true);
                cross.parentNode.replaceChild(crossClone, cross);
            });

            this.tagInput.classList.remove('invalid');
            this.inputErrorMessage.innerHTML = "";
        } else {
            this.inputEventHandler();
            if (this._tagContainer.length) {
                this.clearButton.removeAttribute('disabled');
            }
            this.tagInput.removeAttribute('disabled');
            this.display.querySelectorAll(".tag__delete-icon").forEach((cross) => {
                cross.querySelector(".tag__svg-cross").classList.remove('read-only-mode');
                cross.addEventListener('click', (event) => {
                    this.deleteTag(event.currentTarget)
                });
            })
        }
    }
}






