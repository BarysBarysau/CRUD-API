import { v4 as uuidv4 } from "uuid";
class Users {
  users = {};
  constructor(username, age, hobbies) {
    const id = uuidv4();
    this.users[id] = {};
    this.users[id].username = username;
    this.users[id].age = age;
    this.users[id].hobbies = hobbies;
  }

  getUsers() {
    return this.users;
  }
}

const user = new Users("Yan", 4, ["football", "ice-cream", "puri"]);
const user2 = new Users("Vi", 8, ["football", "ice-cream", "puri"]);
console.log(user2.getUsers());
