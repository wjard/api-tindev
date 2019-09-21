//server para hospedar o site, api etc (yarn add express)
const express = require('express');

const DevController = require('./controllers/DevController')
const LikeController = require('./controllers/LikeController');
const Dislikes = require('./controllers/DislikeController');

const routes = express.Router();

// routes.get('/', (req, res) => {
//     let name = req.query.name;
//     return res.json({ message: `Olá ${name}` });
// });
// routes.post('/devs-test', (req, res) => {
//     let body = req.body;
//     console.log(body);
//     return res.json({ ok: true });
// });

routes.get('/devs', DevController.index);
routes.get('/devs/:_id', DevController.index);
routes.post('/devs', DevController.store);

routes.post('/devs/:_id/likes', LikeController.store);
routes.post('/devs/:_id/dislikes/', Dislikes.store);

module.exports = routes;