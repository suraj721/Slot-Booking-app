const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: '*', // Allow all origins for now to fix CORS issues
    credentials: true
}));
app.use(express.json());

// Database Connection
console.log('Attempting to connect to MongoDB...');
console.log('MONGO_URI defined:', !!process.env.MONGO_URI); // Log true/false, not the actual secret

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        console.error('MONGO_URI value:', process.env.MONGO_URI); // Only for debugging, remove later if sensitive
    });

// Routes
const authRoutes = require('./routes/authRoutes');
const slotRoutes = require('./routes/slotRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
    res.send('Slot Booking API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

