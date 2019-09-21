const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        //foi usado dados no header pois não tem implementação de
        //autenticação (jwt por exemplo) de usuários...rs
        //const user = req.headers.user;
        const { user } = req.headers;
        console.log(user);

        const _id = req.params._id;
        console.log(_id);

        const loggedDev = await Dev.findById(user);
        const likeDev = await Dev.findById(_id);
        if (!likeDev) {
            return res.status(400).json({ eror: 'Dev not exists' });
        }

        if (likeDev.likes && likeDev.likes.includes(loggedDev._id)) {
            console.log(`Match between ${loggedDev.name} <=> ${likeDev.name}`);
        }

        if (loggedDev.dislikes.includes(likeDev._id)) {
            loggedDev.dislikes.remove(likeDev._id);    
        }

        if (loggedDev.likes.includes(likeDev._id)) {
            console.log('like user already exists');
            return res.status(201).json(loggedDev);
        }

        loggedDev.likes.push(likeDev._id);
        await loggedDev.save();

        return res.json(loggedDev);
    }
};