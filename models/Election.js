const mongoose = require('mongoose');


// setting election schema
const electionSchema = mongoose.Schema({
    nom: {type: String, required: true},
    id_categorie: {type: mongoose.Schema.Types.ObjectId, required: true},
    date_debut: {type: Date, required: true },
    date_fin: {type: Date, required: true },
    candidat: [{
        _id: {type: mongoose.Schema.Types.ObjectId, required: true},
        nom: {type: String},
        image: {type: String},
        nb_votes: {type: Number}
    }]
});


// election model
const electionModel = mongoose.model('election', electionSchema);

module.exports = electionModel;