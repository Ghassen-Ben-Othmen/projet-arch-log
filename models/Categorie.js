const mongose = require('mongoose');



// setting categorie schema
const categorieSchema = mongose.Schema({
    nom: {type: String, required: true}
});


// categorie model 
const categorieModel = mongose.model('categorie', categorieSchema);

module.exports = categorieModel;