//biblioteca para manusear chamadas http (get, post etc)
const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(req, res) {
        const { _id } = req.params;
        if (_id) {
            return res.json(await Dev.findById(_id))
        }
        
        //const user = req.headers.user;
        const { user } = req.headers;

        if (!user) {
            return res.json(
                await Dev.find({})
            );
        }

        const loggedDev = await Dev.findById(user);

        const devs = await Dev.find({
            $and: [
                // not equals loggedDev!
                { _id: { $ne: loggedDev._id } },
                //not in loggedDev.likes
                { _id: { $nin: loggedDev.likes } },
                //not in loggedDev.dislikes
                { _id: { $nin: loggedDev.dislikes } }
            ]
        }, 
        //colunas para retorno ou null para todas
        null, 
        //order by
        {sort: {name: 1 }})

        return res.json(devs);
    },
    async store(req, res) {
        console.log(req.body);

        const { username } = req.body;
        console.log(username);

        //verificar se o usuário não existe
        const existUser = await Dev.findOne({ user: username.toLowerCase() });
        if (existUser) {
            return res.json(existUser);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);
        //console.log(data);

        // const data = response.data;        
        // if (data){
        //     await Dev.create({
        //         name: data.name,
        //         user: username,
        //         bio: data.bio,
        //         avatar: data.avatar_url
        //     });
        // }

        //para estruturar os dados. você pode também mudar nome de propriedades
        const { name, bio, avatar_url: avatar } = response.data;

        if (!name || !avatar) {
            return res.status(400).send('name and avatar are required!');
        }

        const dev = await Dev.create({
            name,
            user: username.toLowerCase(),
            bio,
            avatar
        });

        return res.json(dev);
    }
};