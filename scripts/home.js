"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");

const welcomeMess = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

displayHome();

////////////////////////////////////////////////////
// Hàm hiển thị trang Home
function displayHome() {
  // Nếu có đăng nhập thì ẩn loginModal và hiển thị mainContent
  if (currentUser) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    // Thêm thông báo welcome
    welcomeMess.textContent = `Welcome ${currentUser.firstname}`;

    // Nếu không ai đăng nhập thì ẩn mainContent và hiển thị loginModal
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}

////////////////////////////////////////////////////
// Sự kiện nhấn logout
btnLogout.addEventListener("click", function () {
  if (confirm("Are you sure?")) {
    // Gán giá trị currentUser về null và lưu vào localstorage
    currentUser = null;
    saveToStorage("currentUser", currentUser);
    // Hiển thị lại trang home khi không đăng nhập
    displayHome();
  }
});
