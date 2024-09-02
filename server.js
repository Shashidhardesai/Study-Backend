const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const signup = require("./signup"); 
const image=require("./image")
const courseimg=require("./courseimg")
const enrollcourse=require("./enrollcourse")
const courselinks=require("./courselinks");
const { json } = require('body-parser');

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

  

  app.post('/studysignups', async (req, res) => {
    const { username, email, password} = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Username is required.' });
    }

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    if (!password) {
        return res.status(400).json({ message: 'Password is required.' });
    }

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
        const signupData = {
            username,
            email,
            password
        };


        const sp = await signup.create(signupData);
        res.status(201).json(sp);
    } catch (err) {
        console.error('Error creating signup:', err);
        res.status(400).json({ message: 'Error creating signup', error: err.message });
    }
});



app.get("/studysignups/:id",async(req,res)=>{
  const {id}=req.params;
    try {
      const document = await signup.findById(id);
      if (!document) {
          return res.status(404).json({ message: 'Document not found.' });
      }
      res.status(200).json(document);
  } catch (err) {
      console.error('Error retrieving document:', err);
      res.status(500).json({ message: 'Error retrieving document', error: err.message });
  }
  
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post('/profileimage/:id', upload.single('image'), async (req, res) => {
  try {
    const userId = req.params.id;
    const imagePath = req.file ? req.file.path : null;

    if (!imagePath) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const user = await signup.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.imagePath = imagePath;
    await user.save();

    res.status(200).json({ message: 'Image uploaded successfully', imagePath });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Error uploading image', error });
  }
});

app.use('/uploads', express.static('uploads'));


app.get('/profileimage/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await signup.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.imagePath) {
      return res.status(404).json({ message: 'No image found for this user' });
    }

    res.sendFile(path.resolve(user.imagePath)); 
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).json({ message: 'Error retrieving image', error });
  }
});


  app.put('/profileimage/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
  
    if (password && password.length < 6) {
      return res.status(400).json({ message: 'Password should have a minimum of 6 characters.' });
    }
    if (password && !/[A-Z]/.test(password)) {
      return res.status(400).json({ message: 'Password should have at least one uppercase letter.' });
    }
    if (password && !/[a-z]/.test(password)) {
      return res.status(400).json({ message: 'Password should have at least one lowercase letter.' });
    }
    if (password && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return res.status(400).json({ message: 'Password should have at least one special character.' });
    }
  
    try {
      const existingSignup = await signup.findById(id);
      if (!existingSignup) {
        return res.status(404).json({ message: 'Signup data not found' });
      }
  
      if (username) existingSignup.username = username;
      if (email) existingSignup.email = email;
      if (password) existingSignup.password = password;
  
      if (req.file) {
        if (existingSignup.imagePath) {
          fs.unlink(existingSignup.imagePath, (err) => {
            if (err) {
              console.error('Error deleting old image:', err);
            }
          });
        }
        existingSignup.imagePath = req.file.path;
      }
      const updatedSignup = await existingSignup.save();
      res.status(200).json(updatedSignup);
    } catch (err) {
      console.error('Error updating signup data:', err);
      res.status(400).json({ message: 'Error updating signup data', error: err.message });
    }
  });
  

  app.post("/studylogins", async (req, res) => {
    console.log('Login endpoint hit');
    const { email, password } = req.body;
  
    try {
      const user = await signup.findOne({ email, password });
      console.log(user);
  
      if (user) {
        res.status(200).json({ message: 'Login successful', userId: user._id });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Server error during login', error: err.message });
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
app.get("/courseimgs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const courseImage = await courseimg.findById(id);

    if (!courseImage) {
      return res.status(404).json({ message: 'Course image not found' });
    }

    res.status(200).json(courseImage);
  } catch (err) {
    console.error('Error in fetching course image:', err); 
    res.status(400).json({ message: 'Error in fetching course image', error: err.message });
  }
});


app.post("/enrollcourse", async (req, res) => {
  try {
    const user = await enrollcourse.create(req.body);
    console.log(user);
  } catch (err) {
    console.error('Error in enrollcourse:', err);
    res.status(500).json({ message: 'Server error enrollcourse', error: err.message });
  }
});

app.post("/courselinks",async(req,res)=>{
 try {
  const links=await courselinks.create(req.body);
  console.log(links);
 } catch (error) {
  console.error("error in fetching links:",error);
  res.status(500).json({message:"server error in fetching links",error:err.message})
 }
})

app.get('/courselinks/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;  
    const link = await courselinks.findOne({ courseId: cid });

    if (!link) {
      return res.status(404).json({ message: "Course not found with the provided cid." });
    }

    res.status(200).json(link);  
  } catch (error) {
    console.error("Error in fetching link:", error);
    res.status(500).json({ message: "Server error in fetching the link", error: error.message });
  }
});



app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
