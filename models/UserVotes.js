const mongose = require('mongoose');



// settinguser schema
const userVotesSchema = mongose.Schema({
    id_user: {type: String, required: true},
    id_election: {type: String, required: true }
});


// user model 
const userVotesModel = mongose.model('userVotes', userVotesSchema);

module.exports = userVotesModel;