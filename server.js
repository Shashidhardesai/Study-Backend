const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const signup = require("./signup"); 

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/StudyEnhance")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database is not connected", err);
  });

app.post("/studysignup", async (req, res) => {
  try {
    const sp = await signup.create(req.body);
    res.status(201).json(sp);
  } catch (err) {
    console.error('Error creating signup:', err); 
    res.status(400).json({ message: 'Error creating signup', error: err });
  }
});

app.get('/studysignups', async (req, res) => {
  try {
    const dat = await signup.find();
    res.json(dat);
  } catch (error) {
    console.error('Error fetching signups:', error);
    res.status(400).json({ message: 'Error fetching signups', error: error.message });
  }
});

app.post("/studylogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await signup.findOne({ email, password });

    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error during login', error: err.message });
  }
});

app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
