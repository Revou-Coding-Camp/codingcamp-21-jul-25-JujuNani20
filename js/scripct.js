document.addEventListener("DOMContentLoaded", function() {
    const todoInput = document.getElementById("todo-input");
    const dateInput = document.getElementById("date-input");
    const addBtn = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");
    const deleteAllBtn = document.getElementById("delete-all-btn");

    let todos = [];

    function renderTodos() {
        todoList.innerHTML = "";
        if (todos.length === 0) {
            todoList.innerHTML = `<tr><td colspan="4" style="text-align:center;">No task found</td></tr>`;
            return;
        }
        todos.forEach((todo, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${todo.text}</td>
                <td>${todo.date}</td>
                <td>${todo.completed ? "Completed" : "Pending"}</td>
                <td>
                    <button class="complete-btn" onclick="toggleComplete(${index})">✔</button>
                    <button class="delete-btn" onclick="deleteTodo(${index})">✖</button>
                </td>
            `;
            todoList.appendChild(row);
        });
    }

    window.toggleComplete = function(index) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    };

    window.deleteTodo = function(index) {
        todos.splice(index, 1);
        renderTodos();
    };

    addBtn.addEventListener("click", function() {
        const text = todoInput.value.trim();
        const date = dateInput.value;

        if (text === "" || date === "") {
            alert("Please fill out both fields!");
            return;
        }

        todos.push({ text, date, completed: false });
        todoInput.value = "";
        dateInput.value = "";
        renderTodos();
    });

    deleteAllBtn.addEventListener("click", function() {
        if (confirm("Are you sure you want to delete all tasks?")) {
            todos = [];
            renderTodos();
        }
    });

    renderTodos();
});
