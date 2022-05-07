let form = document.querySelector(".form");
let displayPanel = document.querySelector(".display-panel");
let tagInput = form["tag-input"];


function addNewTag() {
    let newTag = document.createElement('div');
    newTag.classList.add('tag');
    newTag.innerHTML = `
    <div class="tag__text">
        ${tagInput.value}
    </div>
    <div class="tag__delete-icon">
        <svg class="tag__svg-cross">
            <use xlink:href="../assets/svg/sprite.svg#cross"></use>
        </svg>
    </div>`;
    displayPanel.append(newTag);
    displayPanel.lastElementChild.querySelector(".tag__delete-icon").addEventListener('click',(event)=>{
        deleteTag(event.currentTarget)
    })
}

function deleteTag(deleteIcon) {
    deleteIcon.parentNode.remove();
}


form.addEventListener('submit',(event)=>{
    event.preventDefault();
    addNewTag();
})