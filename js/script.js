(function () {
    'use strict';

    // Add a "checked" symbol when clicking on a list item
    const listCheckedItem = document.querySelector('.todoContentList');
    listCheckedItem.addEventListener('click', createCheckedClass, false);
    function createCheckedClass(e) {
        if (e.target.tagName === 'LI') e.target.classList.toggle('checked');
        else if (e.target.tagName === 'I') e.target.parentNode.classList.toggle('checked');
    }

    //grab input value
    const input = document.querySelector('#todoInt');
    const todoButton = document.querySelector('#todoBtn');
    const todoList = document.querySelector('.todoContentList');
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    //call push todo item function for show localStorage getitem 
    pushTodoItem(todos);

    //create todo list
    function createTodo() {
        //grab value of input field
        const todoTitle = input.value;

        const todo = {
            title: todoTitle
        };

        //checking todo title is empty or not if empty wll skip by showing alert message
        if (todoTitle === '') {
            alert("You must be write something!");
            return false;
        } else {
            todos.push(todo);
        }

        //call push todo item function
        pushTodoItem(todos);

        //call store todo item function
        storeTodoItem(todos);

        //clear input field when clicked add button
        input.value = '';
    }

    //create new todo item
    function pushTodoItem(todos = []) {
        const todosHtml = todos.map((todo, i) => {
            return `
                <li data-id=${i}>

                    <i></i>
                    ${todo.title}
                    <span class="close">&times;</span>
                </li>
            `;
        }).join('');

        todoList.innerHTML = todosHtml;
    }

    //delete todo item
    function deleteTodoItem(e) {
        if (!e.target.matches('.close')) return;
        const findIndex = e.target.parentNode.dataset.id;

        todos.splice(findIndex, 1);
        //call push todo item function
        pushTodoItem(todos);
        //call store todo item function
        storeTodoItem(todos);
    }

    //store todo item data
    function storeTodoItem(todos = []) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }


    todoButton.addEventListener('click', createTodo, false);
    todoList.addEventListener('click', deleteTodoItem, false);

}());
