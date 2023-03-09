// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


// Event Listener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener("click", filterTodo);


// Functions
function addTodo(event){
    // prevent  form from submitting.
    event.preventDefault();
    // console.log("hello");

    // 1. Create Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    // 2. Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText= todoInput.value;
    newTodo.classList.add('todo-item');

    // add li to Div as child.
    todoDiv.appendChild(newTodo);

    // Add Todo to localStorage
    saveLocaltodos(todoInput.value);
    
    // 3. Add checked 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // 4. Check Trash BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // Append to List:
    todoList.appendChild(todoDiv);

    // Clear Todo INPUT VaLUE
    todoInput.value = "";  

}

 // creating deleteCheck function
 function deleteCheck(e){
    const item = e.target;

    // Delete TODO
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add("fall");

        removeLocalTodos(todo);
        // since the animation 'fell' didn't show
        // because it is getting immediately removed.
        todo.addEventListener("transitionend", function(){
            todo.remove();
        })
        // todo.remove();
    }

    //Check Mark. 
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        // we just change the name here
        todo.classList.toggle("completed");
    }
}



function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {       
        if (todo.nodeType == Node.ELEMENT_NODE) {           
             switch(e.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (todo.classList.contains('completed')){
                        todo.style.display = 'none';
                    }
                    else{
                        todo.style.display = "flex";
                    }
                    break;
            }
        }
    }); 
}



function saveLocaltodos(todo){
    // Check if the local storage is already Having things in there?
    let todos;
    if(localStorage.getItem("todos") == null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // push the argument.
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));  
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") == null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        // 1. Create Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    // 2. Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText= todo;
    newTodo.classList.add('todo-item');

    // add li to Div as child.
    todoDiv.appendChild(newTodo);
   
    
    // 3. Add checked 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // 4. Check Trash BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // Append to List:
    todoList.appendChild(todoDiv);
    });
}


function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos" === null)){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    
}