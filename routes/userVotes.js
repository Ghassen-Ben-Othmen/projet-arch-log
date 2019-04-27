const express = require('express');
const jwt = require('jsonwebtoken');

const userVotesModel = require('../models/UserVotes');
const mapper = require('../util/mapping');

// router const 
const router = express.Router();

// add user Vote
router.post('/add-election/:id_election', (req,res)=>{
    let id_election = req.params.id_election;
    let id_user = req.body.id_user;
    //let id_user = user._id;
    console.log(id_user);
    console.log(id_election);
    let userVotes = new userVotesModel();
    userVotes.id_election=id_election;
    userVotes.id_user=id_user;
    userVotesModel.findOne({$and: [{id_election: userVotes.id_election},{id_user:userVotes.id_user}]}).exec()
    .then(doc=>{
        if(doc){
            res.status(400).json({
                message: 'Deja voter'
            });
        }
        else {
            userVotes.save().then(resultat=>{
                res.status(201).json({
                    userVotes: resultat
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

//get user Votes of a user
router.get('/votes/:id', (req,res)=>{
    let id = req.params.id;

    userVotesModel.find({id_user : id}).exec()
    .then(votes=>{
        res.status(200).json({
            votes
        });
    })
    .catch(err=>{
        console.log(err);
    })
});

module.exports = router;