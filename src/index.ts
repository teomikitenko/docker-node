import { createServer } from "node:http";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const server = createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World!");
  }

  if (req.method === "GET" && req.url === "/me") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello Yevhenii!");
  }
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Дозволяє доступ з будь-якого домену
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Дозволені методи
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.end();
  }
  if (req.method === "POST" && req.url === "/add-user") {
    let chunks:any = [];
    req
      .on("data", (chunk) => {
        chunks.push(chunk);
      })
      .on("end", async() => {
        chunks = Buffer.concat(chunks).toString();
        const user = JSON.parse(chunks)   
         await prisma.user.create({
          data:{
          name:user.name as string,
          email:user.email as string
          }
        }) 
        res.writeHead(200, {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
        });
        res.end('Succefully added');
      });
  }
});
// starts a simple http server locally on port 3000
server.listen(3000, "0.0.0.0", () => {
  console.log("Listening on 127.0.0.1:3000");
});
