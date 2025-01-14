const express = require('express');
const path = require('path');
const app = express();
const crypto = require('crypto');

const http = require('http');
const { Server } = require('socket.io');
const { default: mongoose } = require('mongoose');
const { saveMessages, fetchMessages } = require('./utils/messages');
const server = http.createServer(app);
const io = new Server(server);


const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory));
app.use(express.json());

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://000110altjd:altjd0110@express-cluster.koayg.mongodb.net/?retryWrites=true&w=majority&appName=express-cluster')
.then(() => console.log('DB 연결 성공'))
.catch(err => {console.log(err)});

const randomID = () => crypto.randomBytes(8).toString('hex'); // 랜덤값 생성

app.post('/session', (req, res) => {
    const data = {
        username: req.body.username,
        userID: randomID()
    }
    res.send(data);
})

io.use((socket, next) => {
    
    const username = socket.handshake.auth.username;
    const userID = socket.handshake.auth.userID;
    if(!username){
        return next(new Error('Invalid username'));
    }

    socket.username = username;
    socket.id = userID;
    
    next();
})

let users = [];
io.on('connection', async socket => {
    let userData = {
        username: socket.username,
        userID: socket.id
    };
    users.push(userData);
    io.emit('users-data', { users })

    //클라이언트에서 보내온 메세지 /유저1 => 서버 => 유저2
    socket.on('message-to-server', (payload) => {
        io.to(payload.to).emit('message-to-client', payload);
        saveMessages(payload);
    })

    //데이터베이스에서 메세지 가져오기
    socket.on('fetch-messages', ({ receiver }) => { 
        fetchMessages(io, socket.id, receiver);
     })

    //유저가 방에서 나갔을때
    socket.on('disconnect', () => { 
        users = users.filter(user => user.userID !== socket.id);
        //사이드바 리스트에서 삭제
        io.emit('users-data', { users })
        //대화중이라면 대화창 없애기
        io.emit('user-away', socket.id)
     })
})

const port = 4000;
server.listen(port, () =>{
    console.log(`Server is up on http://localhost:${port}`);
})