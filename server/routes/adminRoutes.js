// adminRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin.modal');
const jwt = require('jsonwebtoken'); // Import jwt module
const fs = require('fs');


// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = uuidv4();
        cb(null, uniqueSuffix + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Route to handle admin addition

router.post('/add', upload.single('photo'), async (req, res) => {
    const { name, surname, email, password, birthdate, role } = req.body;

    try {
        let photo = '';
        if (req.file) {
            // If a photo is uploaded, set the photo path
            photo = req.file.filename;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new Admin instance with the data
        const newAdmin = new Admin({ name, surname, email, password: hashedPassword, birthdate, photo, role });

        // Save the newAdmin instance to the database
        const admin = await newAdmin.save();

        res.status(201).json(admin); // Return the saved admin object as JSON
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

const verifyTokenAndFetchAdmin = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        // Verify the token and decode it to get the admin's ID
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Find the admin by ID
        const admin = await Admin.findById(decoded.id);

        // If admin is not found, return a 404 status
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Set the admin information in the request object
        req.admin = admin;
        next();
    } catch (error) {
        console.error('Error fetching admin info:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
};

// Route to get admin information
router.get('/', verifyTokenAndFetchAdmin, async (req, res) => {
    try {
      // Retrieve the admin data from the request object
      const admin = req.admin;
  
      // Check if the admin photo exists
      const photoPath = path.join(__dirname, `../uploads/${admin.photo}`);
      if (!fs.existsSync(photoPath)) {
        return res.status(404).json({ message: 'Admin photo not found' });
      }
  
      // Return the admin data along with the photo path
      res.json({ 
          admin: {
              name: admin.name,
              surname: admin.surname,
              email: admin.email,
              birthdate: admin.birthdate,
              photo: admin.photo // Return the photo path
          } 
      });
    } catch (error) {
      console.error('Error fetching admin info:', error);
      res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
  });

module.exports = router;
