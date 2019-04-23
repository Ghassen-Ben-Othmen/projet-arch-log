const express = require('express');
const mongoose = require('mongoose');

const electionModel = require('../models/Election');
const categorieModel = require('../models/Categorie');
const verifToken = require('../middleware/check-auth');

// setting router
const router = express.Router();


// create election
router.post('/add', verifToken, (req, res) => {

    let election = new electionModel(req.body.election);

    categorieModel.findOne({_id: election['id_categorie']}).exec()
    .then(doc => {
        if(!doc){
            res.status(400).json({
                message: 'Categorie Introuvable pour cette election'
            });
        }
        else{
            for(i=0; i< election['candidat'].length; i++){
                election['candidat'][i]['_id'] = new mongoose.Types.ObjectId();
            }
        
            election.save().then(doc => {
                res.status(201).json({
                    election: doc
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


// delete election 
router.delete('/delete/:id', verifToken, (req, res) => {

    let id = req.params.id;

    electionModel.findOne({_id: id}).exec()
    .then(doc => {
        if(!doc){
            res.status(400).json({
                message: 'Election introuvable'
            });
        }
        else{
            electionModel.deleteOne({_id: id}).exec()
            .then(result => {
                res.status(200).json({
                    message: 'Election supprimée',
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


// get all elections
router.get('/list', verifToken, (req ,res) => {

    electionModel.find().exec()
    .then(docs => {
        res.status(200).json({
            elections: docs
        });
    })
    .catch(err => {
        console.log(err);
    })
});


// get election by id
router.get('/:id', verifToken, (req, res) => {

    let id = req.params.id;

    electionModel.findOne({_id: id}).exec()
    .then(doc => {
        if(!doc){
            res.status(400).json({
                message: 'Election Introuvable'
            });
        }
        else{
            res.status(200).json({
                election: doc
            });
        }
    })
    .catch(err => {
        console.log(err);
    })
})

// update election
router.put('/update/:id', verifToken, (req, res) => {

    let id = req.params.id;
    let election = req.body.election;

    electionModel.findOne({_id: id}).exec()
    .then(doc => {
        if(!doc){
            res.status(400).json({
                message: 'Election introuvable'
            });
        }
        else{
            for(i=0; i< election['candidat'].length; i++){
                if(!election['candidat'][i]['_id'])
                    election['candidat'][i]['_id'] = new mongoose.Types.ObjectId();
            }
            electionModel.updateOne({_id: id}, election).exec()
            .then(result => {
                election['_id'] = id;
                res.status(200).json({
                    election
                });
            })
        }
    })
    .catch(err => {
        console.log(err);
    })
});

// TODOS

// add candidat plus get election 

// update nom candidat

// update image candidat

module.exports = router;