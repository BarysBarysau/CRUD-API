import { UserPoster, UsersGetter } from "./routes/users.js";
import { UserPutter, UserDelete } from "./routes/userId.js";
import http from "node:http";
import process from "node:process";
import "dotenv/config";
import Users from "./service/UserService.js";

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
  try {
    switch (request.url) {
      case "/api/users":
      case "api/users":
        if (request.method === "POST") {
          UserPoster(request, response);
        } else if (request.method === "GET") {
          UsersGetter(request, response);
        }
        break;
      default:
        if (
          request.url.split("/").slice(1, 3).toString() === "api,users" &&
          request.url.split("/").pop() !== "users"
        ) {
          const userId = request.url.split("/").pop();
          if (request.method === "PUT") {
            UserPutter();
          } else if (request.method === "GET") {
            if (Users.getById(userId)) {
              response.writeHead(200, { "Content-Type": "application/json" });
              response.end(JSON.stringify(Users.getById(userId)));
            } else {
              response.writeHead(404, {
                "Content-Type": "text/plain; charset=UTF-8",
              });
              response.end(`Sorry, user with userId=${userId} doesn't exist`);
            }
          } else if (request.method === "DELETE") {
            UserDelete();
          }
        } else {
          response.writeHead(404, {
            "Content-Type": "text/plain; charset=UTF-8",
          });
          response.end("Sorry, resource not found");
        }
    }
  } catch (err) {
    response.writeHead(500);
    response.end("Sorry, some mistake occured");
  }
});

server.listen(PORT);
