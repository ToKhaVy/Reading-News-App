"use strict";

const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const btnSubmit = document.getElementById("btn-submit");

btnSubmit.addEventListener("click", function () {
  if (validateSetting()) {
    // Cập nhật lại currentUser
    currentUser.pageSize = Number.parseInt(inputPageSize.value);
    currentUser.category = inputCategory.value;
    saveToStorage("currentUser", currentUser);

    // Cập nhật mảng userArr
    const index = userArr.findIndex(
      (userItem) => userItem.username === currentUser.username
    );

    userArr[index] = currentUser;
    saveToStorage("userArr", userArr);

    // reset form nhập
    alert("Setting successfully!");
    inputCategory.value = "General";
    inputPageSize.value = "";
  }
});

////////////////////////////////////////////////////////////////
// Hàm validate giá trị nhập setting
function validateSetting() {
  let isValidate = true;

  //
  if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
    alert("Page size was wrong!");
    isValidate = false;
  } else if (inputCategory.value === "") {
    alert("Category was wrong!");
    isValidate = false;
  }
}
