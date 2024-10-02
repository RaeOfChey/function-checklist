const titleInput = document.getElementById(`my-name`);
const descriptionInput = document.getElementById(`my-desc`);
const typeInput = document.getElementById(`my-type`);
const calledInput = document.getElementById(`beingcalled`);
const scopeInput = document.getElementById(`my-scope`);
const save = document.getElementById(`button-save`);
const cancel = document.getElementById(`button-cancel`);

function addFunction (event) {
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

}

save.addEventListener(`click`, addFunction);