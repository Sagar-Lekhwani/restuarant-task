const express = require('express');
const router = express.Router();
const { getRestaurantsByLocation, createRestaurant, UpdateRestaurants, DeleteRestaurant, getAllRestaurants } = require('../controllers/restaurantController');
const auth = require('../middleware/auth');

// create restaurant route
router.post('/create', auth, createRestaurant);

// update restaurant details route
router.post('/update/:id', auth, UpdateRestaurants);

// delete restaurant route
router.post('/delete/:id', auth, DeleteRestaurant);

// fetch all restaurants route
router.get('/restaurants', getAllRestaurants);

// fetch near by restaurant route
router.get('/restaurants_by_location', getRestaurantsByLocation);


module.exports = router;
