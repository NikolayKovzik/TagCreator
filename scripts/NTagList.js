import { Tag } from './Tag.js';

export class NTagList {
    constructor(tagArray) {
        this._tagContainer = tagArray;
        this._isReadOnly = false;
      //  this.init();
    }

    get tagContainer() {
        return this._tagContainer
    }

    get isReadOnly() {
        return this._isReadOnly;
    }

    set isReadOnly(value) {
        this._isReadOnly = value;
    }

    checkMaxId() {
        return !this._tagContainer.length ? 1 : this._tagContainer.reduce((maxId, tag) => {
            return tag.id >= maxId ? tag.id + 1 : maxId;
        }, 1)
    }

    createNewTag(content) {
        let newTag = new Tag(content);
        newTag.id = this.checkMaxId();
        this._tagContainer.push(newTag);
        return newTag;
    }

    deleteTag(deleteIcon) {
        // console.log(deleteIcon.parentNode)
        let parentId = +(deleteIcon.parentNode.id.match(/\d+/) || [])[0];
        this._tagContainer = this._tagContainer.filter((tag) => {
            return tag.id !== parentId ? true : false;
        })
        if (!this._tagContainer.length) {
            super.clearButton.setAttribute('disabled', 'true');
        }
        // console.log(this._tagContainer)
        deleteIcon.parentNode.remove();
    }
}