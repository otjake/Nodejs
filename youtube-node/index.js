const http = require("node:http");
const fs = require("node:fs");


const server = http.createServer(( req, res) => {
    res.writeHead(200, {"Content-Type" : "text/html"});
    //reading from html using buffer
    fs.createReadStream(__dirname+"/index.html").pipe(res)
    // res.end("Hello world")
})

server.listen(3000, () => {
    console.log("server running on 3000")
})// the call back function is optional and is used to perform actions when serve starts running
