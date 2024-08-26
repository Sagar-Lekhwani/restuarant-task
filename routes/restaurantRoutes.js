const express = require('express');
const router = express.Router();
const { getRestaurantsByLocation, createRestaurant } = require('../controllers/restaurantController');
const auth = require('../middleware/auth');

router.post('/create', auth, createRestaurant);
router.get('/restaurants', getRestaurantsByLocation);

module.exports = router;
