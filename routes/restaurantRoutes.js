const express = require('express');
const router = express.Router();
const { getRestaurantsByLocation, createRestaurant, UpdateRestaurants, DeleteRestaurant, getAllRestaurants } = require('../controllers/restaurantController');
const auth = require('../middleware/auth');

// create restaurant route
router.post('/create', auth, createRestaurant);

// update restaurant details route
router.post('/update/:id', auth, UpdateRestaurants);

// delete restaurant route
router.get('/delete/:id', auth, DeleteRestaurant);

// fetch all restaurants route
router.get('/', getAllRestaurants);

// fetch near by restaurant route
router.get('/location', getRestaurantsByLocation);


module.exports = router;
