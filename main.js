/*
    GLOBAL VARIABLES
*/
let btnUI = document.forms[0].btn;
let btnDelete = document.querySelector("#tbody");
let update = false;
var todo;


// let tarea = document.forms[0].tarea;
/*
    FUNCTIONS
*/

function loadDoc(todoUI, descriptionUI, actionUI=false) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", 'backend.php');
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {  
        showData();
      }
    };
    xhttp.send(`todo=${todoUI}&description=${descriptionUI}&action${actionUI}`);
  }
  function deleteDoc(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", 'eliminated.php');
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       showData();
      }
    };
    xhttp.send(`id=${id}`);
  }
  function showData() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", 'mostrar.php');
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       let data = JSON.parse(this.responseText);
       writeDocument(data)
      }
    };
    xhttp.send();
  }
function writeDocument(data){
    var tbody = document.querySelector('#tbody');
    tbody.innerHTML = "";
    
    for(let i = 0; i<data.length; i++){
        if(data[i][3] == 1){
            tbody.innerHTML += `<tr todoID = ${data[i][0]}>
            <td class = "id">${data[i][0]}</td>
            <td><a href="#" class="editTodo">${data[i][1]}</a></td>
            <td>${data[i][2]}</td>
            <td><i class="material-icons text-success" style="cursor: pointer;">
                    done_outline
                    </i></td> 
            <td><i class="material-icons text-danger deleted" style="cursor: pointer;">
                    delete_outline
                    </i></td> 
        </tr>` 
        }else{
            tbody.innerHTML += `<tr todoID = ${data[i][0]}>
            <td class = "id">${data[i][0]}</td>
            <td><a href="#" class="editTodo">${data[i][1]}</a></td>
            <td>${data[i][2]}</td>
            <td><i class="material-icons text-danger" style="cursor: pointer;">
                    done_outline
                    </i></td> 
            <td><i class="material-icons text-danger deleted" style="cursor: pointer;">
                    delete_outline
                    </i></td> 
        </tr>` 
        }
    }
}
function agregar(){
    let todoUI = document.forms[0].todo.value;
    let descriptionUI = document.forms[0].description.value;
    loadDoc(todoUI, descriptionUI);
    document.forms[0].reset();
}
function taskDone(id){
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", 'taskDone.php');
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {    
            showData();
          }
        };
        xhttp.send(`id=${id}`);
}
function writeUpdate(id){
    var xhttp = new XMLHttpRequest();
        xhttp.open("POST", 'writeUpdate.php');
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {    
            // showData();
            row_data = JSON.parse(this.responseText);
            let todo = document.forms[0].todo;
            let description = document.forms[0].description;
            todo.value = row_data[1];
            description.innerHTML =  row_data[2]; 
            update = true;
          }
        };
        xhttp.send(`id=${id}`);
}
function updateTodo(todo, description, action, id){
    var xhttp = new XMLHttpRequest();
        xhttp.open("POST", 'update.php');
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                showData();
            }
        };
        xhttp.send(`todo=${todo}&description=${description}&action=${action}&id=${id}`);
}
function pintarID(todo){
    var xhttp = new XMLHttpRequest();
        xhttp.open("POST", 'getId.php');
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.forms[0].id.value = this.responseText
                showData();
            }
        };
        xhttp.send(`todo=${todo}`);
}

/*
    EVENT LISTENER
*/
btnUI.addEventListener('click', (e)=>{
    e.preventDefault();
    if(update){
        let todo = document.forms[0].todo.value;
        let description = document.forms[0].description.innerHTML;
        let action = false;
        let id = document.forms[0].id.value
        updateTodo(todo, description, action, id)
        document.forms[0].todo.value = "";
        document.forms[0].description.innerHTML = "";
        document.forms[0].id.value = "";
        update = false;
        
    }else{
        agregar();
    }
    showData();
    
});

btnDelete.addEventListener('click', (e)=>{
    e.preventDefault();
    // console.log(e.path[2].childNodes[1].innerHTML);
    
    if(e.target.innerHTML.trim() == "delete_outline"){
        deleteDoc(e.path[2].childNodes[1].innerHTML);        
    }
    if(e.target.innerHTML.trim() == "done_outline"){
        taskDone(e.path[2].childNodes[1].innerHTML)
    }
    if(e.target.getAttribute('class') =='editTodo'){
        writeUpdate(e.path[2].childNodes[1].innerHTML)
        let todo = e.target.innerHTML;
        pintarID(todo);
    }
    showData()
    update = false;
});
// editTodo.addEventListener('click',(e)=>{
//     e.preventDefault();
//     console.log(e)
// })
document.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();
    showData();
})
window.onload = (e)=>{
    e.preventDefault();
    showData();
}


