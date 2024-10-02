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

function addFunction (event) {

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
    
    funcList.push(newFunction);
    
    localStorage.setItem(`funcList`, JSON.stringify(funcList));
    updateTracker(funcList);
    hideModal();
}

function showModal() {
    modal.style.display = `block`;
}

function hideModal() {
    modal.style.display = `none`;
}

document.addEventListener(`DOMContentLoaded`, function() {
    //modal.style.display = `none`;
    updateTracker();
  });

addButton.addEventListener(`click`, showModal);
cancel.addEventListener(`click`, hideModal);
save.addEventListener(`click`, addFunction);