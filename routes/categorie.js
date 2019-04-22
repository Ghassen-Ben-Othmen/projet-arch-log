const express = require('express');

const categorieModel = require('../models/Categorie');
const electionModel = require('../models/Election');
const verifToken = require('../middleware/check-auth');

// setting router
const router = express.Router();


// create categorie
router.post('/add', verifToken, (req , res) => {

    let categorie = new categorieModel(req.body.categorie);

    categorie.save().then(result => {
        res.status(201).json({
            categorie: result
        });
    })
    .catch(err => {
        console.log(err);
    });
});

// get all categories
router.get('/list', verifToken, (req, res) => {

    // lean to get a plain js obj
    categorieModel.find().lean().exec()
    .then(async function(docs) {
        for(i = 0; i< docs.length; i++){
            let id = docs[i]['_id'];
            const result = await electionModel.find({id_categorie: id});
            docs[i]["elections"] = result;
        }
        res.status(200).json({
            categories: docs
        });
    })
    .catch(err => {
        console.log(err);
    });
});

// get categorie by id
router.get('/:id', verifToken, (req, res) => {

    let id = req.params.id;

    categorieModel.findOne({_id: id}).exec()
    .then(doc => {
        if(!doc){
            res.status(400).json({
                message: 'Categorie Introuvable'
            });
        }
        else{
            let id = doc['_id'];
            electionModel.find({
                    id_election: id
                }).exec()
                .then(elections => {
                    doc['elections'] = elections;
                })
            res.status(200).json({
                categorie: doc
            });
        }
    })
    .catch(err => {
        console.log(err);
    });
});


// delete categorie
router.delete('/delete/:id', verifToken, (req, res) => {

    let id = req.params.id;

    categorieModel.findOne({_id:id}).exec()
    .then(doc => {
        if(!doc){
            res.status(400).json({
                message: 'Categorie introuvable'
            });
        }
        else{
            categorieModel.deleteOne({_id:id}).exec()
            .then(result => {
                res.status(200).json({
                    message: 'Categorie supprimé',
                    count: result.deletedCount
                });
            })
            .catch(err => {
                console.log(err);
            });
        }
    })
    .catch(err => {
        console.log(err);
    });
});


// update categorie
router.put('/update/:id', verifToken, (req, res) => {

    let id = req.params.id;

    let categorie = req.body.categorie;

    categorieModel.findOne({_id:id}).exec()
    .then(doc => {
        if(!doc){
            res.status(400).json({
                message: 'Categorie Introuvable'
            });
        }
        else{
            categorieModel.updateOne({_id:id}, categorie).exec()
            .then(result => {
                categorie['_id'] = id;
                res.status(200).json({
                    categorie
                });
            })
            .catch(err => {
                console.log(err);
            });
        }
    })
    .catch(err => {
        console.log(err);
    });
});


module.exports = router;