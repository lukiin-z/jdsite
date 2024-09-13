const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

// Connect to MongoDB
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MongoDB');

    // Create a database and collection
    const db = client.db();
    const usersCollection = db.collection('users');

    // Handle form submission
    app.post('/development', (req, res) => {
      const { username, password } = req.body;

      // Validate user input
      if (!username || !password) {
        res.status(400).send('Username and password are required');
      } else {
        // Insert user data into MongoDB
        usersCollection.insertOne({ username, password }, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send('User created successfully');
          }
        });
      }
    }); // <--- Add this closing parenthesis

    // Start the server
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  } // <--- Add this closing brace
}); // <--- Add this closing parenthesis
; // <--- Add this closing bracket