const http = require('http');
const fs = require('fs');

//creating the server
const server = http.createServer((req,res)=>{
    // console.log(req.url,req.method,req.headers)
    const url = req.url;
    const method = req.method;

    //if url is at the root show form
    if(url === '/'){
        res.write('<html lang="">');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body>' +
            '<form action="/message" method="POST">' +
            '<input type="text" name="message">'+
            '<button type="submit" value="submit">Submit</button>'+
            '</form>' +
            '</body>');
        res.write('</html>');
        return res.end() // res.end without the return ends the process, using return shows the codeblock is done
    }
    if(url === '/message' && method === 'POST'){
        const body = []; //to collect response stream
        //event listeners
        req.on('data',(chunk) =>{
            //collect response data into the body array
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end',()=>{
            console.log(body);
          const parseBody = Buffer.concat(body).toString();
            console.log(parseBody)
          const message = parseBody.split('=')[1];
            fs.writeFileSync('response.txt',message)
        })
        res.statusCode = 302;
        res.setHeader('Location','/');//redirect to home
        return res.end()
    }

    res.setHeader('content-Type','text/html');
    res.write('<html lang="">');
    res.write('<head><title>First Node page</title></head>');
    res.write('<body>' +
        '<h1>Hello world</h1>' +
        '</body>');
    res.write('</html>');
    res.end();
    //closes program and exits thread
    // process.exit()
})

//running or keep the server running
server.listen(3000);