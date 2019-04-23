const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const url = require('./config/keys');
const userRoute = require('./routes/user');
const categorieRoute = require('./routes/categorie');
const electionRoute = require('./routes/election');

// setting app 
const app = express();


//  setting body parser for encoding body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// connect to database
mongoose.connect(url ,{ useNewUrlParser: true }, err => {
    if (err) {
        console.error('error: ' + err);
    }
    else {
        console.log('connected to database...');
    }
});

// setting cors
app.use(cors());

// user route
app.use('/user', userRoute);

// categorie route
app.use('/categorie', categorieRoute);

// election route
app.use('/election', electionRoute);


// conf production mode
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/dist/client'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'client','index.html'))
    })
}


// setting up port
const PORT = 3000;

// setting app server
app.listen(PORT, () => {
    console.log('Server listening on port '+PORT);
})