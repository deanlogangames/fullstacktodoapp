const today = document.getElementById("today")
const optionsdate = {weekday: "long", year: "numeric", month: "long", day: "numeric"}
const todayDate = new Date().toLocaleDateString(`en-AU`, optionsdate)
today.innerHTML = `Today is ${todayDate}`;

const url = `https://fullstacktodoappbackend.vercel.app/todos`
async function getTodos() {
    try{

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(url, options);
        const todos = await response.json();

        todos.forEach((todo) => {
            const todoContainer = document.querySelector(".todo-items")
            const newTask = document.createElement("li")
            newTask.innerHTML = todo.text

            const buttonDiv = document.createElement("div")
            buttonDiv.classList.add("btns")
            const deleteButton = document.createElement("button")
            deleteButton.innerHTML = "Delete"
            deleteButton.addEventListener("click", function(){
                deleteItem(todo._id)
            })
            const updateButton = document.createElement("button")
            updateButton.innerHTML = "Update"
            updateButton.addEventListener("click", function(){
                updateItem(todo)
            })

            buttonDiv.appendChild(deleteButton)
            buttonDiv.appendChild(updateButton)
            newTask.appendChild(buttonDiv)
            todoContainer.appendChild(newTask)
        })
    }
    catch(err){
        console.log(err)
    }
}

getTodos();
let isUpdating = false

let todo;
const input = document.querySelector(".new-task")
input.addEventListener("change", function(event){
    event.preventDefault();
    todo = event.target.value
})
const addButton = document.querySelector(`.submit-btn`)
addButton.addEventListener("click", function(){
    if (!isUpdating) {
        postHandler();
    } else {
        updateItem(newitem)
    }
})
async function postHandler() {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({text: todo})
        }

        const response = await fetch(url, options)
        if (response.ok) {
            console.log("Sucessful")
            window.location.href = "/"
        } else {
            console.log("Unsucessful")
        }
    } catch (err) {
        console.log(err)
    }
}

async function deleteItem(id) {
    const url = `https://fullstacktodoappbackend.vercel.app/todos/${id}`

    try {
        const option = {
            method: "DELETE"
        }    
        const ItemToBeDeleted = await fetch(url, option);
        if (ItemToBeDeleted.ok) {
            console.log("Sucessful")
            window.location.href = "/"
        } else {
            console.log("Unsucessful")
        }
    } catch (err) {
        console.log(err)
    }
}

async function updateItem(itemToUp) {
    const {_id, text} = itemToUp
    isUpdating = true;
    const updateURL = `https://fullstacktodoappbackend.vercel.app/todos/${_id}`
    input.value = text;
    newitem = itemToUp;

    try {
        const option = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({text: todo})
        }
        const response = await fetch(updateURL, option);
        if (response.ok) {
            console.log("Sucessful")
        } else {
            console.log("Unsucessful")
        }
    } catch (err) {
        console.log(err)
    }
}