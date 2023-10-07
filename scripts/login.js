"use strict";

const inputUsernameLogin = document.getElementById("input-username");
const inputPasswordLogin = document.getElementById("input-password");
const btnSubmitLogin = document.getElementById("btn-submit");

////////////////////////////////////////////////////
// Bắt sự kiện nút login
btnSubmitLogin.addEventListener("click", function () {
  //
  if (validateUserLogin()) {
    // Tìm kiếm user trong mảng userArr
    const user = userArr.find(
      (item) =>
        item.username === inputUsernameLogin.value &&
        item.password === inputPasswordLogin.value
    );
    // Nếu user đã đăng ký
    if (user) {
      alert("Login successfully!");
      // lưu thông tin user hiện tại
      saveToStorage("currentUser", user);
      // chuyển hướng về trang chủ
      window.location.href = "../index.html";
    }
    // Nếu user chưa đăng ký
    else {
      alert("Unregistered User or Password was wrong!");
    }
  }
});

////////////////////////////////////////////////////
// Hàm validate
function validateUserLogin() {
  let isValidate = true;

  if (inputUsernameLogin.value === "") {
    alert("Please input for User Name!");
    isValidate = false;
  } else if (inputPasswordLogin.value === "") {
    alert("Please input for Password!");
    isValidate = false;
  }

  return isValidate;
}
