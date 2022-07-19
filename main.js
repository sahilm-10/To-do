const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

function loadEventListeners(){
    document.addEventListener("DOMContentLoaded",getTasks);
    form.addEventListener("submit",addTask);
    taskList.addEventListener("click",removeTask);
    clearBtn.addEventListener("click",clearAllTasks);
    filter.addEventListener("keyup",filterTasks);

}

function getTasks () {  
    let tasks;
    if(localStorage.getItem("tasks")===null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function (task)  {
        appendTaskToList(task);
    });
}

function appendTaskToList(task) { 
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));

    const link = document.createElement("a");
    link.setAttribute("href","#");
    link.className = "secondary-content delete-item";
    link.innerHTML = "<i class ='fa fa-remove'></i>";
    li.appendChild(link);
    taskList.appendChild(li);

 }
function addTask(e) {
    e.preventDefault();
    if(taskInput.value === ''){
        alert("Please do insert any task Value");

    }else{
        appendTaskToList(taskInput.value);
        storeInLocalStorage(taskInput.value);
        taskInput.value = "";
    }
  }

function removeTask(e){
    e.preventDefault();
    if(e.target.classList.contains("delete-item")||e.target.parentElement.classList.contains("delete-item")){
        
        if(confirm("Are you sure want to delete?")){
            let taskValue;
            if(e.target.parentElement.nodeName ==="LI"){
                taskValue = e.target.parentElement.textContent;
                e.target.parentElement.remove();
            }else{
                taskValue = e.target.parentElement.parentElement.textContent;
                e.parentElement.parentElement.remove();
            }
            removeTaskFromLocalStorage(taskValue);
        }
    }
}
function clearAllTasks(e){
    e.preventDefault();
    if(confirm("Are you sure you want to clear all tasks")){
        let tasks = [];
        // Slower method of deleting !
        // taskList.innerHTML = "";
        // Faster Method
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.setItem("tasks",JSON.stringify(tasks));

    }
}
function storeInLocalStorage(){
    let tasks;
    if(localStorage.getItem("tasks")===null){
        tasks =[];

    }else{
            tasks = JSON.parse(localStorage.getItem)("tasks");
    }
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));

}

function removeTaskFromLocalStorage(){
    let tasks;
    if(localStorage.getItem("tasks")=== null){
        tasks = [];

    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));

    }
    tasks.forEach(function(task,index){
        if(taskValue === task){
            tasks.splice(index ,1);

        }
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function filterTasks(e) { 
    const key = filter.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(function(list){
        const item = list.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(key)===-1){
            list.style.display = 'none';

        }else{
            list.style.display = 'block';
        }
    });
 }