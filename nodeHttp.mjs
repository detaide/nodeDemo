import http from 'http'
import { hostname } from 'os';

const homename = '127.0.0.1'

const port = 8089

const server = http.createServer((req, res) =>{
    res.statusCode = 200;
    res.setHeader('content-type','text/plain');
    res.end(`<h1>123</h1>`);
});

server.listen(port,hostname,()=>{
    console.log("running...");
})