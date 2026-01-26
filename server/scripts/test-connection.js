const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

console.log('🔌 Testing MongoDB Connection...\n');

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected Successfully!');
        console.log(`📊 Database: ${mongoose.connection.name}`);
        console.log(`🌐 Host: ${mongoose.connection.host}`);
        console.log(`🔌 Port: ${mongoose.connection.port}`);
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ MongoDB Connection Failed!');
        console.error('Error:', err.message);
        console.log('\n💡 Tip: Make sure MongoDB is running locally or update MONGO_URI in .env');
        process.exit(1);
    });
