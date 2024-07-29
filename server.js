const express = require('express');
const http = require('http');
const next = require('next');

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
        cors: {
            origin: "*",
            credentials: true
        }
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