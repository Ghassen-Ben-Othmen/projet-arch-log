const express = require('express');
const jwt = require('jsonwebtoken');

const userModel = require('../models/User');
const mapper = require('../util/mapping');

// router const 
const router = express.Router();


// register user
router.post('/inscri', (req, res) => {

    let user = new userModel(req.body.user);
    user['role'] = 'user';
    verif_city = mapper(user['code']);
    if(verif_city === 'None'){
        res.status(400).json({
            message: 'Inscription impossible'
        });
    }
    else{
        user['ville'] = verif_city;
        userModel.findOne({ $or: [ {cin: user.cin}, {code: user.code} ] }).exec()
        .then(doc => {
            if(doc){
                res.status(400).json({
                    message: 'Inscription impossible'
                });
            }
            else{

                user.save().then(result => {
                    res.status(201).json({
                        user: result
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
    } 
});

// delete user
router.delete('/delete/:id', (req, res) => {

    let id = req.params.id;

    userModel.findOne({_id:id}).exec()
    .then(doc => {
        if(!doc){
            res.status(400).json({
                message: 'Utilisteur introuvable'
            });
        }
        else{
            userModel.deleteOne({_id:id}).exec()
            .then(result => {
                res.status(200).json({
                    message: 'utilisateur supprimé',
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


// get all users
router.get('/list', (req ,res) => {

    userModel.find().exec()
    .then(users => {
        res.status(200).json({
            users
        });
    })
    .catch(err => {
        console.log(err);
    })
});


// login user
router.post('/auth', (req, res) => {

    let { cin, mdp } = req.body;

    userModel.findOne({cin}).exec()
    .then(doc => {
        if(!doc){
            res.status(400).json({
                message: 'Utilisateur introuvable'
            });
        }
        else{
            if(doc.mdp === mdp){

                const sign_token = jwt.sign({_id: doc._id, role: doc.role},'secret');

                const token = `Bearer ${sign_token}`;

                res.status(200).json({
                    message: 'logged in',
                    token,
                    user: doc
                });
            }
            else{
                res.status(400).json({
                    message: 'Utilisateur introuvable'
                });
            }
        }
    })
    .catch(err => {
        console.log(err);
    });
});


module.exports = router;