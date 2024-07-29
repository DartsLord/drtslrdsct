const express = require('express');
const http = require('http');
const next = require('next');
const cors = require('cors');

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
let oldHash = ''
let dataHash = ''

nextApp.prepare().then(async() => {
    const app= express();
    const server = http.createServer(app);
    const io = require("socket.io")(server, {
        log: false,
        agent: false,
        origins: '*:*',
        transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
    });
    app.use(cors({
        origin: true,
        methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    }));

    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.header('Access-Control-Allow-Origin', 'https://dartslord.ru');

        // Request methods you wish to allow
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', false);

        // Pass to next layer of middleware
        next();
    });

    // origin: ["http://localhost:3000", "http://localhost:3001", "http://dartslord.ru", "https://dartslord.ru", "http://dartslord.ru/socket.io/", "https://dartslord.ru/socket.io/", "wss://dartslord.ru/socket.io/", "ws://dartslord.ru/socket.io/", "wss://185.104.248.121:3001/socket.io/", "ws://185.104.248.121:3001/socket.io/", "http://185.104.248.121", "https://185.104.248.121", "wss://185.104.248.121:3001", "ws://185.104.248.121:3001"],
    io.attach(server);

    io.on('connection', (socket) => {
        console.log('new connection');
        // socket.emit('dataFromServer', 'Hello from Socket.io');

        socket.on('disconnect', () => {
            console.log('client disconnected');
        })
    });

    const getProjectInfo = async () => {
        let requestResult = await fetch(
            `http://localhost:3000/api/projectInfo?curdate=${new Date().getTime()}`, {
                cache: 'no-store',
            });

        let data = await requestResult.json();
        dataHash = data.contest+data.round+data.outcome
        if(dataHash !== oldHash){
            io.sockets.emit('dataFromServer', data);
            oldHash = dataHash
        }

        return true
    }

    setInterval(()=>{
        getProjectInfo()
    }, 3000)

    app.all('*', (req, res) => nextHandler(req, res));

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});