const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    flight: {
        type: String,
        required: true
    },
    from: { 
        type: String,
        required: true 
    },
    to: {
        type: String, 
        required: true
    },
    date: { 
        type: String,
        required: true
    },
    seat: { 
        type: String,
        required: true 
    },  
    createdAt: {
        type: Date,
        default: Date.now,
    }
}); 

module.exports = mongoose.model('Booking', bookingSchema);