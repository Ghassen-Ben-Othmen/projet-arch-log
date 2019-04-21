const mongose = require('mongoose');



// settinguser schema
const userSchema = mongose.Schema({
    code: {type: Number, required: true},
    cin: {type: Number, required: true },
    mdp: {type: String, required: true},
    ville: {type: String, required: true},
    role: {type: String, required: true},
    votes: [
        {
            id_election: {type: mongose.Schema.Types.ObjectId, required: true}
        }
    ]
});


// user model 
const userModel = mongose.model('user', userSchema);

module.exports = userModel;