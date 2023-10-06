"use strict";

// Class user để đại diện cho thông tin người dùng
class User {
  constructor(
    firstname,
    lastname,
    username,
    password,
    // mặc định nếu không khai báo thì giá trị của 2 thuộc tính này sẽ cho sẵn như sau
    pageSize = 10,
    category = "business"
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    // 2 thuộc tính thêm vào để làm yêu cầu số 9
    this.pageSize = pageSize;
    this.category = category;
  }
}

// Class Task để chứa các thông tin về Task trong Todo List
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
