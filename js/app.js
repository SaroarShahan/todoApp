'use strict';

// grab all vars
const todoForm = document.querySelector('.todoForm'),
    todoInput = document.querySelector('.todoField'),
    todosList = document.querySelector('.todosList'),
    submitBtn = document.querySelector('.add-btn');

// run todo
function runTodo(e) {
    // check input empty or not
    if (todoInput.value === '') {
        alert('Add todo');
        return;
    }

    // create li element
    let li = document.createElement('li');
    //add class
    li.className = 'todosList__item';
    // create text node and append to li
    li.appendChild(document.createTextNode(todoInput.value));
    // create span element
    let span = document.createElement('span');
    // add class
    span.className = 'close-btn';
    // span append to li
    li.appendChild(span);
    // li append to todoslist
    todosList.appendChild(li);

    // add local storage
    storelocalStorage(todoInput.value);

    // clear and focus input
    todoInput.value = '';
    todoInput.focus();

    e.preventDefault();
}

// store local storage
function storelocalStorage(val) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(val);

    localStorage.setItem('todos', JSON.stringify(todos));
}

// get todos from local storage
document.addEventListener('DOMContentLoaded', function() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(todo => {
        // create li element
        let li = document.createElement('li');
        //add class
        li.className = 'todosList__item';
        // create text node and append to li
        li.appendChild(document.createTextNode(todo));
        // create span element
        let span = document.createElement('span');
        // add class
        span.className = 'close-btn';
        // span append to li
        li.appendChild(span);
        // li append to todoslist
        todosList.appendChild(li);
    });
});

// delete todo
function deleteTodoItem(e) {
    if (e.target.classList.contains('close-btn')) {
        if (confirm("Would you like to delete?")) {
            e.target.parentElement.remove();

            // delete todo from local storage
            deleteTodoFromLocalStorage(e.target.parentElement);
        }
    }
}

// delete todo from local storage
function deleteTodoFromLocalStorage(val) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach((todo, index) => {
        console.log(todo);
        console.log(val.textContent);
        if (val.textContent === todo) {
            todos.splice(index, 1);
        }
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}



todoForm.addEventListener("submit", runTodo);
todosList.addEventListener('click', deleteTodoItem);
