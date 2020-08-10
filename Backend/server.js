const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')
const verifyToken = require('./tokenvalidation');

app.use(cors());
app.use(bodyParser.json());

//Connect to DB
var connectionString = 'mongodb://localhost:27017/DonationsPRJ_MeanStack';
mongoose.connect(connectionString, {useNewUrlParser: true}, );

var db = mongoose.connection;
db.on('connected', ()=>{
        console.log('Connected to DB' );
});
db.on('error', (err)=>{
    if(err){
        console.log('Error Connecting to DB:' + err);
    }
});
 
 const usersRoute = require('./Routes/UsersRoute');
 const donationsRoute = require('./Routes/DonationsRoute');
 const loginRoute = require('./Routes/LoginRoute');

 app.use('/Users', usersRoute);
 app.use('/Donations', verifyToken, donationsRoute);
 app.use('/Login', loginRoute);

//Listen to Server
const port = 3000;
app.listen(port, ()=>{
    console.log("App running on localhost:" + port);
});

