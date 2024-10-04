const total = document.getElementById(`total`);
const titleInput = document.getElementById(`my-name`);
const descriptionInput = document.getElementById(`my-desc`);
const typeInput = document.getElementById(`my-type`);
const calledInput = document.getElementById(`beingcalled`);
const scopeInput = document.getElementById(`my-scope`);
const save = document.getElementById(`button-save`);
const cancel = document.getElementById(`button-cancel`);
const addButton = document.getElementById(`add`);
const modal = document.getElementById(`myModal`);
const modalHeader = document.getElementById(`modal-header`);
const mainList = document.querySelector(`#the-list`);
const error = document.getElementById(`error`);
const redirectInput = document.getElementById('redirect');
const dependenciesInput = document.getElementById('dependencies');
const checkboxes = document.querySelectorAll(`.checkbox-container input[type = "checkbox"]`);

const totalNumber = document.createElement(`h2`);
totalNumber.className = 'total-number';
total.appendChild(totalNumber);

let currentEditIndex = -1;

function updateTracker() {
    let funcList = localStorage.getItem(`funcList`);

    if (funcList === null) {
        funcList = [];
    } else {
        funcList = JSON.parse(funcList);
    }

    totalNumber.innerText = funcList.length === 0 ? `0` : funcList.length;
}

function renderList() {
    const stored = localStorage.getItem(`funcList`);

    if (stored === null) {
        mainList.innerHTML = `Press "Add" to add your first function!`;
    } else {
        mainList.innerHTML = ``;
        const funcList = JSON.parse(stored);

        for (let i = 0; i < funcList.length; i++) {
            const info = funcList[i];
            const card = document.createElement(`li`);
            const funcItem = document.createElement(`article`);
            const funcName = document.createElement(`h3`);
            const description = document.createElement(`h4`);
            const funcDescription = document.createElement(`blockquote`);
            const attributes = document.createElement(`h3`);
            const attList = document.createElement(`ul`);
            const funcType = document.createElement(`h4`);
            const funcScope = document.createElement(`h4`);

            for (let index = 0; index < checkboxes.length; index++) {
                const checkbox = checkboxes[index];
                checkbox.checked = info.checkboxValues && info.checkboxValues[index];
            }
            

            funcName.textContent = info.title;
            description.textContent = `Description`;
            funcDescription.textContent = info.description;
            attributes.textContent = `Tips and details`;
            funcType.textContent = `Function type: ` + info.type;
            funcScope.textContent = `Function scope: ` + info.scope;

            
            // Create buttons
            const edit = document.createElement(`button`);
            const erase = document.createElement(`button`);
            const seeMore = document.createElement(`button`);
            
            edit.textContent = `Edit`;
            edit.id = `editButton`;
            edit.className = `btn btn-primary`;
            edit.setAttribute(`data-bs-toggle`,`modal`);
            edit.setAttribute(`data-bs-target`,`#myModal`);
            erase.textContent = `Erase`;
            erase.id = `eraseButton`;
            seeMore.textContent = `See More`;
            seeMore.id = `moreButton`;
            
            // Create a container ONLY for the Edit and Erase buttons
            const editEraseContainer = document.createElement('div');
            editEraseContainer.className = 'edit-erase-container'; // Optional: add a class for styling
            
            // Style this container to show edit/erase side by side
            editEraseContainer.style.display = 'flex'; // Makes the buttons side by side
            editEraseContainer.style.marginTop = '10px'; // Adds some space from the See More button
            
            // Append Edit and Erase buttons to the container
            editEraseContainer.append(edit, erase);
            
            // Append the See More button and the editEraseContainer separately to the list
            mainList.appendChild(card);
            card.append(funcItem, seeMore, editEraseContainer); // Append See More separately from the edit/erase buttons
            funcItem.append(funcName, description, attributes);
            description.appendChild(funcDescription);
            attributes.appendChild(attList);
            attList.append(funcType, funcScope);
            
            checkboxes.forEach(checkbox => {
                if(checkbox.checked) {

                const listItem = document.createElement(`li`);
                listItem.textContent = checkbox.value;
                attList.appendChild(listItem);
                }
            });

            attributes.style.display = `none`;

            seeMore.addEventListener(`click`, () => {
                showDetails(attributes, seeMore);
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

function addFunction(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const type = typeInput.value.trim();
    const scope = scopeInput.value.trim();
    const called = calledInput.checked;

    let checkboxValues = [];
        for (let checkbox of checkboxes) {
        checkboxValues.push(checkbox.checked);
    }

    
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

    if (currentEditIndex !== -1) { // Updated from editIndex to currentEditIndex
        funcList[currentEditIndex] = {
            title,
            description,
            type,
            scope,
            called,
            checkboxValues
        };
        editIndex = null;
        currentEditIndex = -1; // Reset edit index
    } else {
        
        const newFunction = {
            title: title,
            description: description,
            type: type,
            scope: scope,
            called: called,
            checkboxValues
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

    currentEditIndex = index

    modalHeader.textContent = 'Edit Function'; // Set modal header for editing function
    showModal();
}

function showDetails(attributes, seeMore) {

    if (attributes.style.display === `none`) {
        attributes.style.display = `block`;
        seeMore.textContent = `See Less`;
} else {
        attributes.style.display = `none`;
        seeMore.textContent= `See More`;
    }
}


function showModal() {
    error.style.display = `none`;
}

function hideModal() {
    console.log(modal)
    titleInput.value = ``;
    descriptionInput.value = ``;
    typeInput.value = ``;
    scopeInput.value = ``;
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

document.addEventListener(`DOMContentLoaded`, function () {
    updateTracker();
    renderList();
});

addButton.addEventListener(`click`, () => {
    if (currentEditIndex === -1) {
        // Reset the form fields for adding a new function
        titleInput.value = '';
        descriptionInput.value = '';
        typeInput.value = '';
        scopeInput.value = '';
        calledInput.checked = false;

        modalHeader.textContent = 'Add a new function'; // Set modal header for adding a new function
    } else {
        // If editing, populate the fields with the selected function's details
        let funcList = JSON.parse(localStorage.getItem(`funcList`));
        const editItem = funcList[currentEditIndex];

        titleInput.value = editItem.title;
        descriptionInput.value = editItem.description;
        typeInput.value = editItem.type;
        scopeInput.value = editItem.scope;
        calledInput.checked = editItem.called;

        modalHeader.textContent = 'Edit Function'; // Set modal header for editing a function
    }

    showModal(); // Show the modal regardless of add/edit mode
});

cancel.addEventListener(`click`, hideModal);
save.addEventListener(`click`, addFunction);