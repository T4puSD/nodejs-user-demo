const express = require('express');
const dotenv = require('dotenv').config();
const userController = require('./controller/user-controller');

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World!');
}); 

app.use('/users', userController);


app.listen(port, ()=> {
    console.log("Listening on port: "+ port);
})