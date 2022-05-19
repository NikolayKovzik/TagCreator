import { TagList } from './TagList.js';

export class TagListManager {
    constructor(restoredArray) {
        this._tagListContainer = restoredArray.length ? this.recreatingMethodsOfLists(restoredArray) : [];
        this._currentPage = null;
        this._currentList = null;
        this._isReadOnly = false;
        this.inputForm = document.querySelector(".form");
        this.display = document.querySelector(".display-panel__list");
        this.tagInput = this.inputForm["tag-input"];
        this.formButton = document.querySelector(".form__button");
        this.clearButton = document.querySelector(".clear-button");
        this.inputErrorMessage = document.querySelector(".form__error-message");
        this.readOnlySwitcher = document.querySelector(".switcher__slider");
        // this.inputErrorWindow = document.querySelector(".input-error");
        this.init();
        // if (this.restoredArray.length) {  //TODO раскоментировать
        //     this.restoreDisplay();
        // }    
    }

    get tagListContainer() {
        return this._tagListContainer;
    }

    get currentPage() {
        return this._currentPage;
    }

    init() {
        this.initCurrentPageAndCurrentList();
        this._currentList.isActive = true;
        this._isReadOnly = this._currentList.isReadOnly;
        this.formButton.setAttribute('disabled', 'true');
        // this.formButton.setAttribute('disabled', `this._currentList.tagContainer.length `); ?????
        if (!this._currentList.tagContainer.length) {
            this.clearButton.setAttribute('disabled', 'true');
        } else {
            this.displayRestoredList();
        }
        this.inputForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let isUnique = this.isInputUnique();
            let isValid = this.isInputValueValid();
            if (isValid !== 'isEmpty' && isValid !== 'inputOverflow' && isUnique) {
                this.clearButton.removeAttribute('disabled');
                this.appendNewTag(this._currentList.createNewTag(this.tagInput.value));
                this.tagInput.value = '';
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

    initCurrentPageAndCurrentList() {
        let index = this.findActivePageIndex();
        if (index !== false && index !== -1) {
            this._currentPage = index;
            this._currentList = this._tagListContainer[index];
        }
        else {
            this._currentPage = 0;
            this._currentList = new TagList([]);
            this._tagListContainer.push(this._currentList);
        }
    }

    findActivePageIndex() {
        // this._tagListContainer.forEach((list)=>{
        //     console.log(list.isActive)
        // })
        if (!this._tagListContainer.length)
            return false;
        return this._tagListContainer.findIndex((list) => {
            console.log(list)                                  
            return list._isActive ? true : false;  
        })
    }

    recreatingMethodsOfLists(restoredArray) {
        let newTagListContainer = [];
        restoredArray.forEach((list) => {
            let newList = new TagList();
            for (let prop in list) {
                newList[prop] = list[prop];
            }
            newTagListContainer.push(newList);
        })
        return newTagListContainer;
    }

    displayRestoredList() {
        this._currentList.tagContainer.forEach((tag) => {
            this.appendNewTag(tag);
        })
    }

    isInputUnique() {
        return this._currentList.tagContainer.reduce((isUnique, tag) => {
            return (tag.content === this.tagInput.value || !isUnique) ? false : true;
        }, true)
    }

    isInputValueValid() {
        return (!this.tagInput.value) ? 'isEmpty' : (this.tagInput.value.length > 40) ? 'inputOverflow' : true;
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
            this._currentList.deleteTag(event.currentTarget);
            if (!this._currentList.tagContainer.length) {
                this.clearButton.setAttribute('disabled', 'true');
            }
        })
    }

    inputEventHandler() {
        let isValid = this.isInputValueValid();
        if (isValid === 'isEmpty') {
            this.disableFormArea("Can't add an empty tag.");
        }
        if (isValid === 'inputOverflow') {
            this.disableFormArea("Tag is too long!");
        }
        if (isValid === true) {
            this.enableFormArea();
        }
        if (!this.isInputUnique()) {
            this.disableFormArea("This tag is already in this sheet!");
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

    clearDisplay() {
        this.display.querySelectorAll('.tag').forEach((tag) => {
            tag.remove();
        });
        this.clearButton.setAttribute('disabled', 'true');
        this._currentList.tagContainer.splice(0);
    }

    toggleReadOnlyMode() {
        this._currentList.isReadOnly = this._currentList.isReadOnly ? false : true;
        if (this._currentList.isReadOnly) {
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
            if (this._currentList.tagContainer.length) {
                this.clearButton.removeAttribute('disabled');
            }
            this.tagInput.removeAttribute('disabled');
            this.display.querySelectorAll(".tag__delete-icon").forEach((cross) => {
                cross.querySelector(".tag__svg-cross").classList.remove('read-only-mode');
                cross.addEventListener('click', (event) => {
                    this._currentList.deleteTag(event.currentTarget);
                    if (!this._currentList.tagContainer.length) {
                        this.clearButton.setAttribute('disabled', 'true');
                    }
                });
            })
        }
    }
}