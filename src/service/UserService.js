import { v4 as uuidv4 } from "uuid";
let array = [];
class Users {
  constructor(username, age, hobbies) {
    this.id = uuidv4();
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
}

export default Users;
