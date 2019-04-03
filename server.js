const express = require('express');
const path = require('path');

// setting app 
const app = express();


// setting up port
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send('Hello World!')
});


if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/dist'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

// setting app server
app.listen(PORT, () => {
    console.log('Server listening on port '+PORT);
})