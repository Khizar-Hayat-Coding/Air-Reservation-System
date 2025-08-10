const express = require('express');
const router = express.Router();
const multer = require('multer');
const Route = require('../models/adminmodel');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/routes', upload.single('image'), async (req, res) => {
  try {
    const { title, flights, price } = req.body;
    const image = req.file ? `uploads/${req.file.filename}` : null;

    if (!title || !flights || !price || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newRoute = new Route({ title, flights, price, image });
    await newRoute.save();
    res.status(201).json({ message: 'Route added successfully', route: newRoute });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving route' });
  }
});

router.get('/routes', async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching routes' });
  }
});

router.delete('/routes/:id', async (req, res) => {
  try {
    const deleted = await Route.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Route not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting route" });
  }
});


module.exports = router;
