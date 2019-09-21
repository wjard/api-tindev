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
        const dislikeDev = await Dev.findById(_id);
        if (!dislikeDev) {
            return res.status(400).json({ eror: 'Dev not exists' });
        }

        if (loggedDev.likes.includes(dislikeDev._id)) {
            loggedDev.likes.remove(dislikeDev._id);    
        }

        if (loggedDev.dislikes.includes(dislikeDev._id)) {
            console.log('dislike user already exists');
            return res.status(201).json(loggedDev);
        }

        loggedDev.dislikes.push(dislikeDev._id);
        await loggedDev.save();

        return res.json(loggedDev);
    }
};