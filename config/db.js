const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("✅ MongoDB connected successfully");
        
        // Log database name to verify correct database (Issue #4)
        mongoose.connection.once('open', () => {
            console.log(`📊 Connected to database: ${mongoose.connection.name}`);
            console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    }
    catch(err){
        console.error("❌ Error connecting to MongoDB: " + err.message);
        console.error("🔍 Check MONGODB_URL in your .env file");
        process.exit(1);
    }
}

module.exports = connectDB;