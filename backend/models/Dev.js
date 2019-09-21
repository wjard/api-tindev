const { Schema, model } = require('mongoose');

const DevSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    bio: String,
    avatar: {
        type: String,
        required: true
    },
    likes: [{
        //Esse array irá simbolizar um relacionamento N pra N
        //Sendo que o Schema.Types.ObjectId representa o campo '_id' 
        //do mongo, que é a PK do registro.
        type: Schema.Types.ObjectId,
        //informar em qual Model está o '_id' pai, 
        //nesse caso é o ../models/Dev.js
        ref: 'Dev'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'
    }]
}, {
        //cria as colunas createdAt e updatedAt
        timestamps: true
    });

module.exports = model('Dev', DevSchema);

