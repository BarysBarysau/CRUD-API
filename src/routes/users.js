import Users from "../service/UserService.js";

export function UserPoster(request, response) {
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
    if (user.username && user.age && user.hobbies) {
      response.writeHead(201, { "Content-Type": "application/json" });
      response.end(JSON.stringify(user));
    } else {
      response.writeHead(400, {
        "Content-Type": "text/plain; charset=UTF-8",
      });
      response.end("Please, fill required fields");
    }
  });
}

export function UsersGetter(request, response) {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(Users.getUsers()));
}
