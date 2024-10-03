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

const totalNumber = document.createElement(`h2`);
totalNumber.className = 'total-number';
total.appendChild(totalNumber);

let currentEditIndex = -1

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

        for (let i = 0; i < funcList.length; i++) {
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
            card.append(funcItem, seeMore, edit, erase);
            funcItem.append(funcName, description, attributes,);
            description.appendChild(funcDescription);
            attributes.appendChild(attList);
            attList.append(funcType, funcScope);

            edit.addEventListener('click', () => editFunction(i));
            erase.addEventListener('click', () => removeFunction(i));
        }
    }
}

function addFunction(event) {

    if (modal.style.display === `none`) {
        showModal();
        return;
    }

    event.preventDefault();

    const title = titleInput.value;
    const description = descriptionInput.value;
    const type = typeInput.value;
    const scope = scopeInput.value;
    const called = calledInput.checked;

    const newFunction = {
        title: title,
        description: description,
        type: type,
        scope: scope,
        called: called,
    }

    let funcList = localStorage.getItem(`funcList`)

    if (funcList === null) {

        funcList = [];
    } else {

        funcList = JSON.parse(funcList);
    }

    if (currentEditIndex > -1) {
        // Update the existing function if editing
        funcList[currentEditIndex] = newFunction;
        currentEditIndex = -1; // Reset edit index
    } else {
        funcList.push(newFunction);
    }

    // Ensure to save the updated list to local storage
    localStorage.setItem(`funcList`, JSON.stringify(funcList));
    renderList();
    updateTracker();
    hideModal();
}

function editFunction(index) {
    currentEditIndex = index; // Set the index of the function to edit
    const funcList = JSON.parse(localStorage.getItem('funcList'));
    const functionToEdit = funcList[index];

    titleInput.value = functionToEdit.title;
    descriptionInput.value = functionToEdit.description;
    typeInput.value = functionToEdit.type;
    scopeInput.value = functionToEdit.scope;
    calledInput.checked = functionToEdit.called;

    showModal();
}

function removeFunction(index) {
    let funcList = JSON.parse(localStorage.getItem(`funcList`));
    funcList.splice(index, 1); // Remove the function at the specified index
    localStorage.setItem(`funcList`, JSON.stringify(funcList));
    renderList();
    updateTracker();
}

function showModal() {
    modal.style.display = `block`;
}

function hideModal() {
    modal.style.display = `none`;
}

document.addEventListener(`DOMContentLoaded`, function () {
    modal.style.display = `none`;
    updateTracker();
    renderList();
});

addButton.addEventListener(`click`, showModal);
cancel.addEventListener(`click`, hideModal);
save.addEventListener(`click`, addFunction);