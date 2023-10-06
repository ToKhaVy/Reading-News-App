"use strict";

////////////////////////////////////////////////////////////////////////
// Hàm lưu dữ liệu vào local storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

////////////////////////////////////////////////////////////////////////
// Hàm lấy dữ liệu từ local storage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Lấy dữ liệu userArr từ localStorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];

// Chuyển đổi về dạng Class Instance
const userArr = users.map((user) => parseUser(user));

// Lấy dữ liệu từ user đang đăng nhập
let currentUser = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;

////////////////////////////////////////////////////////////////////////
// Lấy dữ liệu todoArr từ LocalStorage
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];

// Chuyển về dạng class intance
const todoArr = todos.map((todo) => parseTask(todo));

////////////////////////////////////////////////////////////////////////
// Hàm parseUser chuyển từ JS Obj sang Class Intance
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password
  );
  return user;
}

// Hàm parseTask chuyển từ JS Obj sang Class Intance
function parseTask(userData) {
  const task = new Task(userData.task, userData.owner, userData.isDone);
  return task;
}
