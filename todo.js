
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to add a task to the todo list
function addTask() {
    if (inputBox.value === '') {
        alert("Please enter a task");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = " \u00d7";
        li.appendChild(span);
        
        // Add an edit button
        let editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.classList.add("edit-btn"); // Add this line to set the class
        li.appendChild(editButton);

        // Add event listener for editing
        editButton.addEventListener("click", function () {
            editTask(li);
        });
    }
    inputBox.value = "";
    saveData();
}

// Event listener for checking/unchecking and removing tasks
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Function to save data to local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to display tasks from local storage
function showTasks() {
    listContainer.innerHTML = localStorage.getItem("data");
    // Add event listeners for existing edit buttons
    let editButtons = document.querySelectorAll("li button");
    editButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            editTask(button.parentElement);
        });
    });
}
showTasks();

// Function to edit a task
function editTask(taskElement) {
    let newText = prompt("Edit task:", taskElement.firstChild.textContent);
    if (newText !== null) {
        taskElement.firstChild.textContent = newText;
        saveData();
    }
}

