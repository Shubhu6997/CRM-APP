const posts = [
    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      "userId": 1,
      "id": 2,
      "title": "qui est esse",
      "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
];

const http = require("http");
const server = http.createServer((req,res)=>{
   
    if(req.url === "/posts"){
        if(req.method === "GET"){
            res.write(JSON.stringify(posts));
            res.end();

        }else if(req.method === "POST"){

        }else if(req.method === "PUT"){
            
        }else if(req.method === "DELETE"){
            
        }
    }

});
server.listen(3001);
console.log("server is running on 3001 port");

/*

const log = require("./log");
log.printMsg("welcome to NodeJS");
log.show("hiii");
console.log(log.num);

const fs = require("fs");
const { listeners } = require("process");

fs.readdir(".",(err,files)=>{
    if (err) 
        console.log(err);
    else 
        console.log(files);

})

*/