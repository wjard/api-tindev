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

const server = express();
const port = process.env.PORT || 3000;
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

const mongo_uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
console.log(mongo_uri);
mongoose.connect(mongo_uri, { useNewUrlParser: true });

server.use(cors());
server.use(express.json());

server.use(routes);

server.listen(port, err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Server listening on port: ${port}`);
    }
});