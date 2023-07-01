import cluster from "node:cluster";
import http from "node:http";
import path from "node:path";
import os from "node:os";
import process from "node:process";
import Users from "./service/UserService.js";
import "dotenv/config";

let PORT;
process.env.NODE_ENV === "production"
  ? (PORT = process.env.PROD_PORT)
  : (PORT = process.env.DEV_PORT);

/* const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs - 1; i += 1) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`Master ${process.pid} is dead`);
    cluster.fork();
  });
} else {
  http
    .createServer(function (req, res) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write("Hello World!");
      res.end();
    })
    .listen(3000);
  console.log(`Worker ${process.pid} started`);
} */

const server = http.createServer((request, response) => {
  const chunks = [];
  let stringData = "";
  request.on("data", (chunk) => {
    chunks.push(chunk);
  });
  request.on("end", () => {
    const data = Buffer.concat(chunks);
    stringData = data.toString();
    const user = new Users(
      JSON.parse(stringData).username,
      JSON.parse(stringData).age,
      JSON.parse(stringData).hobbies
    );
    user.addUser();
    response.end(JSON.stringify(Users.getUsers()));
  });
});

server.listen(PORT);
