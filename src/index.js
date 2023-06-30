import cluster from "node:cluster";
import http from "node:http";
import os from "node:os";
import process from "node:process";

const numCPUs = os.cpus().length;

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
}
