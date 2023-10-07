"use strict";

const todoList = document.getElementById("todo-list");
const btnAdd = document.getElementById("btn-add");
const inputTask = document.getElementById("input-task");

displayTodoList();

////////////////////////////////////////////////////
// Hàm hiển thị todo list
function displayTodoList() {
  let html = "";

  // Từ mảng todoArr lọc ra các task là của user đang đăng nhập
  todoArr
    .filter((todo) => todo.owner === currentUser.username)
    .forEach(function (todo) {
      html += `
      <li class=${todo.isDone ? "checked" : ""}>
      ${todo.task}
      <span class="close">×</span>
      </li>
      `;
    });

  todoList.innerHTML = html;

  //
  eventToggleTask();
  eventDeleteTask();
}
