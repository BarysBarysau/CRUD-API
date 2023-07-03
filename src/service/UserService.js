import { v4 as uuidv4 } from "uuid";
let array = [];
class Users {
  constructor(username, age, hobbies) {
    this.userId = uuidv4();
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }

  addUser() {
    array.push(this);
  }

  static getUsers() {
    return array;
  }

  static getById(id) {
    const array = Users.getUsers();
    return array.find((item) => item.userId === id);
  }
}

export default Users;
