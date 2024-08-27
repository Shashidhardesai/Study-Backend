const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const signup = require("./signup"); 
const image=require("./image")
const courseimg=require("./courseimg")

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


  app.post("/studysignups", async (req, res) => {
    const { username, email, password } = req.body;
  
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password should have a minimum of 6 characters.' });
    }
    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({ message: 'Password should have at least one uppercase letter.' });
    }
    if (!/[a-z]/.test(password)) {
      return res.status(400).json({ message: 'Password should have at least one lowercase letter.' });
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return res.status(400).json({ message: 'Password should have at least one special character.' });
    }
    try {
      const sp = await signup.create({ username, email, password });
      res.status(201).json(sp);
    } catch (err) {
      console.error('Error creating signup:', err); 
      res.status(400).json({ message: 'Error creating signup', error: err.message });
    }
  });
  

  app.post("/studylogin", async (req, res) => {
    console.log('Login endpoint hit');
    const { email, password } = req.body;
  
    try {
      const user = await signup.findOne({ email, password });
      console.log(user)
  
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post("/profileimage", upload.single('image'), async (req, res) => {
  try {
    const { userId } = req.body;
    const imagePath = req.file ? req.file.path : null;

    if (!userId || !imagePath) {
      return res.status(400).json({ message: 'UserId and imagePath are required' });
    }

    const newImage = await image.create({ userId, imagePath });
    res.status(201).json(newImage);
  } catch (err) {
    console.error('Error creating image:', err.message);
    res.status(500).json({ message: 'Error creating image', error: err.message });
  }
});

app.post("/courseimg", async (req, res) => {
  try {
    const sp = await courseimg.create(req.body);
    res.status(201).json(sp);
  } catch (err) {
    console.error('Error in course image:', err); 
    res.status(400).json({ message: 'Error in fetching course image', error: err.message });
  }
});
app.get("/courseimgs", async (req, res) => {
  try {
    const sp = await courseimg.find();
    res.status(201).json(sp);
  } catch (err) {
    console.error('Error in course image:', err); 
    res.status(400).json({ message: 'Error in fetching course image', error: err.message });
  }
});


app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
