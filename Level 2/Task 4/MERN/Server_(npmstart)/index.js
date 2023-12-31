const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UserModel = require('./models/User')
const bcrypt = require('bcryptjs');

const saltRounds = 10; 
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/user")

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
  
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: 'Error hashing password' });
      }
  
      const newUser = {
        name: name,
        email: email,
        password: hashedPassword, // Store the hashed password
      };
  
      UserModel.create(newUser)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json({ error: 'Error creating user', details: err }));
    });
  });

  app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password)
                    .then(match => {
                        if (match) {
                            res.json("Success");
                        } else {
                            res.json("Password Incorrect");
                        }
                    })
                    .catch(error => {
                        console.error("Error comparing passwords:", error);
                        res.status(500).json("Internal Server Error");
                    });
            } else {
                res.json("No record existed");
            }
        })
        .catch(error => {
            console.error("Error finding user:", error);
            res.status(500).json("Internal Server Error");
        });
});

app.listen(3001, () => {
    console.log("Server is running!")
})