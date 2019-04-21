const mongoose = require('mongoose');


// setting election schema
const electionSchema = mongoose.Schema({
    nom: {type: String, required: true},
    id_categorie: {type: mongoose.Schema.Types.ObjectId, required: true},
    date_debut: {type: Date, required: true },
    date_fin: {type: Date, required: true },
    candidat: [{
        _id: {type: mongoose.Schema.Types.ObjectId, required: true},
        nom: {type: String, required: true},
        image: {type: String, required: true},
        nb_votes: {type: Number, required: true}
    }]
});


// election model
const electionModel = mongoose.model('election', electionSchema);

module.exports = electionModel;