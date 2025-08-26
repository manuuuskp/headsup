//create a http server

const http = require('http');

const server = http.createServer((req, res) => {
    res.end("I'm the server which you are looking for")
});

server.listen(7777)