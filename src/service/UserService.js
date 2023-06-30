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

const user = new Users("Yan", 4, ["football", "ice-cream", "puri"]);
const user2 = new Users("Vi", 8, ["football", "ice-cream", "puri"]);
user.addUser();
user2.addUser();

console.log(Users.getUsers());
