//server para hospedar o site, api etc (yarn add express)
const express = require('express');

//acesso ao mongodb (yarn add mongoose)
const mongoose = require('mongoose');

//permitir acesso com cross-orgin (yarn add cors)
const cors = require('cors');

//Read the .env File
const dotenv = require('dotenv');

const routes = require('./routes');

dotenv.config();

const port = process.env.PORT || 3000;
const httpServer = express();
const server = require('http').Server(httpServer);

const connectedUsers = [];

//websocket
const socket = require('socket.io')(server);
socket.on('connection', con => {
    console.log(`Nova conexão: ${con.id}`);

    const { user } = con.handshake.query;
    console.log(user, con.id);

    connectedUsers[user] = con.id;
    /*
    con.on('opa', result => {
        console.log(`Client message: ${JSON.stringify(result)}`);
    });
    //teste de envio de  mensagem para o client
    setTimeout(() => {
        con.emit('e ai?', {
            message: 'Aqui tudo beleza. E aí?'
        });
    }, 5000);
    */
});

/*
const figlet = require("figlet");
const handler = (req, res) => {
    console.log('Server received request.');
    figlet('Hello World!!!', (err, data) => {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        res.end(data);
    });
};
//const server = http.createServer(handler);
*/

const mongo_uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
console.log(mongo_uri);
mongoose.connect(mongo_uri, { useNewUrlParser: true });

//midleware para passagem do socket para demais controllers
httpServer.use((req, res, next) => {
    req.socket = socket;
    req.connectedUsers = connectedUsers;

    return next();
});

httpServer.use(cors());
httpServer.use(express.json());
httpServer.use(routes);

server.listen(port, err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Server listening on port: ${port}`);
    }
});