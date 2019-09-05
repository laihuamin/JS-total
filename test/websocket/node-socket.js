const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({port: 8080});
wss.on('connection', () => {
    console.log('client contented');
    ws.on('message', function(message) {
        console.log(message);
    })
})

const Koa = require('koa');

const app = new Koa();

const Router = require('koa-router');

let home = new Router();

app.route('/', function(req, res) {
    res.sendfile(__dirname, '/index.html');
})

app.listen(3000);