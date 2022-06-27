var express = require('express');
const { findById } = require('../models/user.js');
var router = express.Router();
const User = require('../models/user.js')

/* GET ALL. */
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users) 
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

/* GET ONE. */
router.get('/:handle', getUser, (req, res) => {
  res.send(res.user);
});

/* CREATE ONE. */
router.post('/', async (req, res) => {
  try {
    const user = new User({
      id: req.body.id,
      handle: req.body.handle,
      stars: req.body.stars,
      avatarURL: req.body.avatarURL
    })
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch(err) {
    res.status(400).json({message: err.message})
  }  
});

/* UPDATE ONE. */
router.patch('/:handle', getUser, async (req, res) => {
  if (req.body.avatarURL != null) {
    res.user.avatarURL = req.body.avatarURL
  }
  if (req.body.stars != null) {
    res.user.stars = req.body.stars
  }
  try {
    const updatedUser = await res.user.save()
    res.status(201).json(updatedUser)
  } catch (err) {
    res.status(400).json({message: err.message})
  }
});

/* DELETE ONE. */
router.delete('/:handle', getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.status(200).json({message: 'Deleted user'})    
  } catch (err) {
    res.status(500).json({message: err.message});
  }  
});

/* Middleware helper method */
async function getUser(req, res, next) {
  let user
  try {
    user = await User.findOne({handle: req.params.handle})
    if (user == null) {
      return res.status(404).json({message: 'Cannot find user'})
    }
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
  res.user = user
  next()
}

module.exports = router;
