"use strict";

const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnSubmitRegister = document.getElementById("btn-submit");

////////////////////////////////////////////////////////
// Bắt sự kiện ấn vào nút Register
btnSubmitRegister.addEventListener("click", function () {
  //
  const user = new User(
    inputFirstname.value,
    inputLastname.value,
    inputUsername.value,
    inputPassword.value
  );
  // Check validate

  if (validate(user)) {
    // thêm user vào mảng userArr
    userArr.push(user);
    // lưu dữ liệu vào localStorage
    saveToStorage("userArr", userArr);

    alert("Đăng ký thành công!");

    // điều hướng trang sang trang Login
    window.location.href = "../pages/login.html";
  }
});

////////////////////////////////////////////////////////
// Hàm validate
function validate(data) {
  // Khai báo biến cờ hiệu
  let isValidate = true;
  // Không có trường nào bị nhập thiếu dữ liệu.

  if (data.firstname.trim() === "") {
    alert("Please input for First Name!");
    isValidate = false;
  } else if (data.lastname.trim() === "") {
    alert("Please input for Last Name!");
    isValidate = false;
  } else if (data.username.trim() === "") {
    alert("Please input for User Name!");
    isValidate = false;
  } else if (data.password === "") {
    alert("Please input for Password!");
    isValidate = false;
  } else if (inputPasswordConfirm.value === "") {
    alert("Please input for Password Confirm!");
    isValidate = false;
  }

  // username không trùng
  if (
    !userArr.every((item) => (item.username !== data.username ? true : false))
  ) {
    alert("Username already exists!");
    isValidate = false;
  }
  // Password phải có hơn 8 ký tự
  else if (data.password.length <= 8) {
    alert("Password must have more than 8 character!");
    isValidate = false;
  }
  // Confirm password phải giống với password
  else if (data.password !== inputPasswordConfirm.value) {
    alert("Confirm Password was wrong!");
    isValidate = false;
  }

  return isValidate;
}
