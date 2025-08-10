const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const adminRoutes = require('./routes/adminroutes');
const contactRoutes = require('./routes/contactroutes');  
const bookingRoutes = require('./routes/bookingroutes');
const userRoutes = require('./routes/userroutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/users', userRoutes); 
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/admin', adminRoutes); 

mongoose.connect('mongodb://127.0.0.1:27017/Airways', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});