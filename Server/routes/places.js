const express = require('express');
const router = express.Router();
const Place = require('../models/place');

// get all places
router.get('/places', async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

// create one place
router.post('/places', async (req, res) => {
  const place = new Place({
    name: req.body.name,
    imgURL: req.body.imgURL,
    address: req.body.address,
    hours:req.body.hours,
    info: req.body.info,
    capacity: req.body.capacity,
    currentUsers: req.body.currentUsers
  })

  try {
    const newPlace = await place.save()
    res.status(201).json(newPlace)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }

});

module.exports = router;