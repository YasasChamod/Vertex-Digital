const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const uri = process.env.DATABASE_URI || process.env.MONGO_URI;

        if (!uri) {
            throw new Error('Missing MongoDB connection string. Set DATABASE_URI in .env');
        }

        await mongoose.connect(uri, {
            dbName: process.env.MONGO_DB_NAME || 'techNotesDB',
            serverSelectionTimeoutMS: 10000,
        });
        console.log('MongoDB connected');
    } catch (error) {
        if (['ETIMEOUT', 'ECONNREFUSED', 'ENOTFOUND'].includes(error.code)) {
            console.error('MongoDB DNS/network error. Check internet, DNS, VPN/firewall, or Atlas IP Access List.');
        }
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = connectDB;