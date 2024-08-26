const Restaurant = require('../models/Restaurant');


// function to create the restaurants
exports.createRestaurant = async (req, res) => {
  try {
    const { name, description, latitude, longitude, ratings } = req.body;
    const restaurant = new Restaurant({
      name,
      description,
      location: { type: 'Point', coordinates: [longitude, latitude] },
      ratings,
    });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// function to fetch all restaurants 
exports.getAllRestaurants = async (req, res) => {
    try {
      const restaurants = await Restaurant.find();
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// function to get restaurant by location   
exports.getRestaurantsByLocation = async (req, res) => {
  try {
    const { latitude, longitude, radius, minimumDistance, maximumDistance } = req.query;
    const query = {
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [longitude, latitude] },
          $minDistance: minimumDistance || 0,
          $maxDistance: radius || maximumDistance,
        },
      },
    };
    const restaurants = await Restaurant.find(query);
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// functtion to update restaurant details 
exports.UpdateRestaurants = async (req, res) => {
    try {
      const restaurant = await Restaurant.findByIdAndUpdate(
        req.params.id,
        req.body, 
        { new: true, runValidators: true }
      );
      
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      res.json(restaurant);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

// function to delete the restaurant
exports.DeleteRestaurant = async (req, res) => {
    try {
      const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
      
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      res.json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }  
