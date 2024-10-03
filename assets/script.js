const total = document.getElementById(`total`);
const titleInput = document.getElementById(`my-name`);
const descriptionInput = document.getElementById(`my-desc`);
const typeInput = document.getElementById(`my-type`);
const calledInput = document.getElementById(`beingcalled`);
const scopeInput = document.getElementById(`my-scope`);
const save = document.getElementById(`button-save`);
const cancel = document.getElementById(`button-cancel`);
const addButton = document.getElementById(`add`);
const modal = document.getElementById(`modal`);
const mainList = document.querySelector(`#the-list`);
const error = document.getElementById(`error`);

const totalNumber = document.createElement(`h2`);

total.appendChild(totalNumber);

function updateTracker() {

    let funcList = localStorage.getItem(`funcList`)

    if (funcList === null) {
        
        funcList = [];
    } else {
        
        funcList = JSON.parse(funcList);
        
    }

    totalNumber.innerText = funcList.length === 0 ? `0` : funcList.length;
}

function renderList() {

    stored = localStorage.getItem(`funcList`);

    if (stored === null) {
        mainList.innerHTML = `Press "Add" to add your first function!`;
    } else {
        
        mainList.innerHTML = ``;
        
        funcList = JSON.parse(stored);
        
        for (let i = 0; i < funcList.length ; i++) {
            const info = funcList[i];
            
            const card = document.createElement(`li`);
            const funcItem = document.createElement(`article`);
            const funcName = document.createElement(`h3`);
            const description = document.createElement(`h4`);
            const funcDescription = document.createElement(`blockquote`);
            const attributes = document.createElement(`h3`);
            const attList = document.createElement(`ul`);
            const funcType = document.createElement(`p`);
            const funcScope = document.createElement(`p`);
            const attItem = document.createElement(`li`);
            const tips = document.createElement(`p`);
            const allTips = document.createElement(`ul`);
            const tipItem = document.createElement(`li`);
            const edit = document.createElement(`button`);
            const erase = document.createElement(`button`);
            const seeMore = document.createElement(`button`);
            
            funcName.textContent = info.title;
            description.textContent = `Description`;
            funcDescription.textContent = info.description;
            attributes.textContent = `Attributes`;
            funcType.textContent = `Function type: ` + info.type;
            funcScope.textContent = `Function scope: ` + info.scope;
            edit.textContent = `Edit`;
            edit.id = `editButton`;
            erase.textContent = `Erase`;
            erase.id = `eraseButton`;
            seeMore.textContent = `See More`;
            seeMore.id = `moreButton`;
            
            mainList.appendChild(card);
            card.append(funcItem, erase, edit, seeMore);
            funcItem.append(funcName, description, attributes,);
            description.appendChild(funcDescription);
            attributes.appendChild(attList);
            attList.append(funcType, funcScope);

            attributes.style.display = `none`;

            seeMore.addEventListener(`click`, () => {
                showDetails(attributes);
            })
            
            erase.addEventListener(`click`, () => {
                remove(i);
            });
            
            edit.addEventListener(`click`, () => {
                change(i);
            });

        }
    }
}

function addFunction (event) {
    event.preventDefault();

    if (modal.style.display === `none`) {
        showModal();
        return;
    }

    
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const type = typeInput.value.trim();
    const scope = scopeInput.value.trim();
    const called = calledInput.checked;
    
    if (!title || !description || !type || !scope) {
        error.style.display = `block`;
        return;
    }
    
    let funcList = localStorage.getItem(`funcList`)
    
    if (funcList === null) {
        
        funcList = [];
    } else {
        
        funcList = JSON.parse(funcList);
        
    }

    if (editIndex !== null) {

        funcList[editIndex] = {
            title,
            description,
            type,
            scope,
            called,
        };
        editIndex = null;
    } else {
        
        const newFunction = {
            title: title,
            description: description,
            type: type,
            scope: scope,
            called: called,
        }
        
        funcList.push(newFunction);
    }
        
    localStorage.setItem(`funcList`, JSON.stringify(funcList));
    renderList();
    updateTracker();
    hideModal();
}

function remove (index) {
    let funcList = JSON.parse(localStorage.getItem(`funcList`));

    funcList.splice(index, 1);
    localStorage.setItem(`funcList`, JSON.stringify(funcList));
    renderList();
    updateTracker();
}

let editIndex = null;

function change(index) {
    let funcList = JSON.parse(localStorage.getItem(`funcList`));
    const editItem = funcList[index];

    titleInput.value = editItem.title;
    descriptionInput.value = editItem.description;
    typeInput.value = editItem.type;
    scopeInput.value = editItem.scope;
    calledInput.checked = editItem.called;

    editIndex = index

    showModal();
}

function showDetails(attributes) {

    if (attributes.style.display === `none`) {
        attributes.style.display = `block`;
} else {
        attributes.style.display = `none`;
    }
}


function showModal() {
    error.style.display = `none`;
    modal.style.display = `block`;
}

function hideModal() {
    modal.style.display = `none`;
    titleInput.value = ``;
    descriptionInput.value = ``;
    typeInput.value = ``;
    scopeInput.value = ``;
    calledInput.checked = false;
}

document.addEventListener(`DOMContentLoaded`, function() {
    modal.style.display = `none`;
    updateTracker();
    renderList();
  });


addButton.addEventListener(`click`, () => {
    if (modal.style.display === `block`) {
        hideModal();
    } else {
        showModal();
    }
});

cancel.addEventListener(`click`, hideModal);
save.addEventListener(`click`, addFunction);