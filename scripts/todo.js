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
      html += `<li class=${todo.isDone ? "checked" : ""}>${
        todo.task
      }<span class="close">×</span></li>`;
    });

  todoList.innerHTML = html;

  // gọi các sự kiện thao tác với các task
  eventToggleTask(); // sự kiện đánh dấu task đã hoàn thành
  eventDeleteTask(); // sự kiện xoá task
}

////////////////////////////////////////////////////
// Sự kiện ấn nút add task mới
btnAdd.addEventListener("click", function () {
  //
  if (inputTask.value.trim().length === 0) {
    alert("Please input your task!");
  } else {
    const newTask = new Task(inputTask.value, currentUser.username, false);

    // Thêm task mới vào todoArr
    todoArr.push(newTask);
    // Lưu dữ liệu todoArr mới vào localstorage
    saveToStorage("todoArr", todoArr);
    // Hiển thị lại todo list
    displayTodoList();
    // Trả giá trị ô nhập task thành ô trống
    inputTask.value = "";
  }
});

////////////////////////////////////////////////////
// Sự kiện toggleTask
function eventToggleTask() {
  // chọn tất cả các li của ul có id là todo-list
  document.querySelectorAll("#todo-list li").forEach(function (liEl) {
    liEl.addEventListener("click", function (e) {
      // loại trừ sự kiện click vào dấu "x", tránh trùng sự kiện deleteTask
      if (e.target !== liEl.children[0]) {
        // Ản/hiện class checked khi ấn vào task
        liEl.classList.toggle("checked");
        // Tìm task vừa checked
        // console.log(liEl.textContent.slice(0, -1));
        const checkedTask = todoArr.find(
          (taskItem) =>
            taskItem.owner === currentUser.username &&
            taskItem.task === liEl.textContent.slice(0, -1) // lấy nội dung text của task nhưng không bao gồm dấu "x"
        );
        // sau đó thay đổi thuộc tính isDone của task
        checkedTask.isDone = liEl.classList.contains("checked") ? true : false;
        // Lưu vào storage
        saveToStorage("todoArr", todoArr);
      }
    });
  });
}

////////////////////////////////////////////////////
// Sự kiện deleteTask
function eventDeleteTask() {
  //
  document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
    closeEl.addEventListener("click", function () {
      if (confirm("Are you sure?")) {
        // Tìm vị trí của task bị xoá trong todoArr
        const index = todoArr.findIndex(
          (item) =>
            item.owner === currentUser.username &&
            item.task === closeEl.parentElement.textContent.slice(0, -1)
        );

        // Xoá task đó ra khỏi mảng todoArr
        todoArr.splice(index, 1);
        // Lưu vào storage
        saveToStorage("todoArr", todoArr);
        // Hiển thị lại todoList
        displayTodoList();
      }
    });
  });
}
