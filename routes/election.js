const express = require('express');
const mongoose = require('mongoose');
const IncomingForm = require("formidable").IncomingForm;
const path = require('path');
const fs = require('fs');

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




// get elections by category
router.get('/getByCategory/:id', verifToken, (req, res) => {

    let id = req.params.id;

    electionModel.find({id_categorie: id}).exec()
    .then(doc => {
        if(!doc){
            res.status(400).json({
                message: 'Election Introuvable'
            });
        }
        else{
            res.status(200).json({
                elections: doc
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

// add candidat + get election
router.put('/add-candidat', verifToken, (req, res) => {

    let candidat = req.body.candidat;
    let id_election = req.body.id_election;

    electionModel.findOne({_id: id_election}).lean().exec()
    .then(doc => {
        if(!doc){
            res.status(400).json({
                message: 'Election introuvable'
            });
        }
        else{
            candidat._id = new mongoose.Types.ObjectId();
            doc.candidat.unshift(candidat);

            let election = new electionModel(doc);
            
            electionModel.updateOne({_id: election._id}, election).exec()
            .then(result => {
                res.status(200).json({
                    election
                });
            });
        }
    })
    .catch(err => {
        console.log(err);
    })
});

// delete candidat
router.put('/delete/candidat', verifToken, (req, res) => {
    const id_candidat = req.body.id_candidat;
    const id_election = req.body.id_election;

    electionModel.findOne({
            _id: id_election
        }).lean().exec()
        .then(doc => {
            if (!doc) {
                res.status(400).json({
                    message: 'Election introuvable'
                });
            } else {
                doc.candidat = doc.candidat.filter(c => c._id != id_candidat);

                let election = new electionModel(doc);

                electionModel.updateOne({
                        _id: election._id
                    }, election).exec()
                    .then(result => {
                        res.status(200).json({
                            election
                        });
                    });
            }
        })
        .catch(err => {
            console.log(err);
        })

});

// update nom candidat
router.put('/update-nom-candidat', verifToken, (req, res) => {

    let nom = req.body.nom;
    let id_election = req.body.id_election;
    let id_candidat = req.body.id_candidat;

    electionModel.findOne({
            _id: id_election
        }).lean().exec()
        .then(doc => {
            if (!doc) {
                res.status(400).json({
                    message: 'Election introuvable'
                });
            } else {
                doc.candidat = doc.candidat.map(c => {
                    if(c._id == id_candidat){
                        
                        c.nom = nom;
                    }
                    return c;
                });

                let election = new electionModel(doc);

                electionModel.updateOne({
                        _id: election._id
                    }, election).exec()
                    .then(result => {
                        res.status(200).json({
                            election
                        });
                    });
            }
        })
        .catch(err => {
            console.log(err);
        })
});

// update nombre de votes candidat
router.put('/update-nbvotes-candidat/:id_election', verifToken, (req, res) => {

    let id_election = req.params.id_election;
    let id_candidat = req.body.id_candidat;

    electionModel.findOne({
            _id: id_election
        }).lean().exec()
        .then(doc => {
            if (!doc) {
                res.status(400).json({
                    message: 'Election introuvable'
                });
            } else {
                doc.candidat = doc.candidat.map(c => {
                    if(c._id == id_candidat){
                        
                        c.nb_votes = c.nb_votes+1;
                    }
                    return c;
                });

                let election = new electionModel(doc);

                electionModel.updateOne({
                        _id: election._id
                    }, election).exec()
                    .then(result => {
                        res.status(200).json({
                            election
                        });
                    });
            }
        })
        .catch(err => {
            console.log(err);
        })
});



// update image candidat
router.put('/upload/:id_election/:id_candidat', verifToken, (req, res) => {
    let form = new IncomingForm();

    let id_election = req.params.id_election;
    let id_candidat = req.params.id_candidat;

    
    form.parse(req);

    form.on('fileBegin', function (name, file) {
        id = id_election+id_candidat+'.jpg';
        file.path =  path.join(__dirname, '..', 'images', id);
    });

    form.on("file", (field, file) => {
        
    });

    form.on("end", () => {
        console.log("file uploaded");
        electionModel.findOne({_id: id_election}).lean().exec()
        .then(doc => {
            if (!doc) {
                res.status(400).json({
                    message: 'Election introuvable'
                });
            } else {
                doc.candidat = doc.candidat.map(c => {
                    if(c._id == id_candidat){
                        c.image = id;
                    }
                    return c;
                });

                let election = new electionModel(doc);

                electionModel.updateOne({
                        _id: election._id
                    }, election).exec()
                    .then(result => {
                        res.status(200).json({
                            election
                        });
                    });

            }

        })
        .catch(err => {
            console.log(err);
        })
    });
});


router.get('/file/:id', (req, res) => {

    const id = req.params.id;
    res.sendFile(path.resolve(__dirname, '..', 'images', id+'.jpg'));
});

module.exports = router;