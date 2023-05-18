const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
const admin = require('firebase-admin');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const serviceAccount = require('../chat-eb51f-firebase-adminsdk-ow2dc-facdd68377.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://chat-eb51f-default-rtdb.asia-southeast1.firebasedatabase.app'
});

const ref = admin.database().ref('users');

app.post('/register', async (req, res) => {

    console.log(req.body)// req.body['email']
    /*const email = req.body['email'];
    const password = req.body['password'];
    try {
        // Create a new user with email and password
        const userRecord = await admin.auth().createUser({
          email: email,
          password: password
        });
    
        console.log(`Successfully registered user with ID: ${userRecord.uid}`);
        res.send({ success: true });
      } catch (error) {
        console.error('Error creating new user:', error.message);
        res.status(500).send({ success: false, message: 'Registration failed' });
      }*/

      const data = {
        email: req.body['email']
      }

      ref.push(data)
});


// Assign a callback function to handle ALL requests
app.all('/*', function (req, res) {
    // When this callback function is called, send this to client
    res.send("Hello World")
});
    
// Set the web server to listen to port 3000 (can be any port)
const server = app.listen(3001)