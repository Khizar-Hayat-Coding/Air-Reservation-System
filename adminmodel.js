const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  title: String,
  flights: String,
  price: String,
  image: String
});

module.exports = mongoose.model('Route', routeSchema);

