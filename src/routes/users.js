import process from "node:process";
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
    response.end(JSON.stringify(user));
  });
}
