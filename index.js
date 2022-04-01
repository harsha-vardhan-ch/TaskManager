let todosItemContainer = document.getElementById("todoItemsContainer");
let buttonElement = document.getElementById("buttonEl");

let userInputElement = document.getElementById("todoUserInput");
let saveButton = document.getElementById("saveButton");

function getTodoItem() {
    let stringified = localStorage.getItem("todoList");
    let parseGetItem = JSON.parse(stringified);
    if (parseGetItem === null) {
        return [];
    } else {
        return parseGetItem;
    }
}

let todoList = getTodoItem();


saveButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function onStatusChange(todoId, labelUniqueId) {
    let labelEl = document.getElementById(labelUniqueId);
    labelEl.classList.toggle("css-style");

    let todoIndex = todoList.findIndex(function(eachItem) {
        let eachItemId = "delete" + eachItem.uniqueId;
        if (eachItemId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoIndex];

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function onDeleteTodo(todoId) {

    let listItem = document.getElementById(todoId);
    todosItemContainer.removeChild(listItem);
    let indexItem = todoList.findIndex(function(eachItem) {
        let eachItemId = "delete" + eachItem.uniqueId;
        if (eachItemId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let deleteItem = todoList[indexItem];
    todoList.splice(deleteItem, 1);
}

function items(todoElement) {

    let uniqueNo = "checkBox" + todoElement.uniqueId;
    let labelUniqueId = "label" + todoElement.uniqueId;
    let todoId = "delete" + todoElement.uniqueId;

    let listItem = document.createElement("li");
    listItem.classList.add("d-flex", "flex-row", "todo-item-container");
    listItem.id = todoId;
    todosItemContainer.appendChild(listItem);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = uniqueNo;
    inputElement.isChecked = todoElement.isChecked;
    inputElement.classList.add("checkbox-input");
    listItem.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex", "flex-row", "label-container");
    listItem.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", uniqueNo);
    labelElement.classList.add("checkbox-label");
    labelElement.id = labelUniqueId;
    labelElement.textContent = todoElement.text;
    labelContainer.appendChild(labelElement);

    if (inputElement.isChecked === true) {
        labelElement.classList.add("css-style");
    }

    inputElement.onclick = function() {
        onStatusChange(todoId, labelUniqueId);
    }

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    }
}

buttonElement.onclick = function() {
    let userInputvalue = userInputElement.value;
    let todoCount = todoList.length + 1;

    if (userInputvalue === "") {
        alert("Enter Valid Text");
        return;
    }

    let newObject = {
        text: userInputvalue,
        uniqueId: todoCount,
        isChecked: false
    };
    items(newObject);
    todoList.push(newObject);
    userInputElement.value = "";
}

for (let eachItem of todoList) {
    items(eachItem);
}