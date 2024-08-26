const Restaurant = require('../models/Restaurant');

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
