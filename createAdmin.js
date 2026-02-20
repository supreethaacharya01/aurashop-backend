// createAdmin.js - Run this ONCE to create your admin
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./Models/UserModels'); // Your existing user model

const createAdmin = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/clothshopdb');
        
        const existingAdmin = await User.findOne({ email: 'admin@aurashop.com' });
        
        if (!existingAdmin) {
            const hashpassword = await bcrypt.hash('admin123', 10);
            
            const adminUser = new User({
                name: 'Admin',
                email: 'admin@aurashop.com',
                password: hashpassword,
                phone: '1234567890',
                address: 'Admin Address',
                role: 'admin' // This is the key - set role to 'admin'
            });
            
            await adminUser.save();
            console.log('✅ Admin created successfully!');
            console.log('Email: admin@aurashop.com');
            console.log('Password: admin123');
        } else {
            console.log('⚠️  Admin already exists');
            console.log('To make this user an admin, run in MongoDB:');
            console.log('db.users.updateOne({email: "admin@aurashop.com"}, {$set: {role: "admin"}})');
        }
        
        mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
        mongoose.disconnect();
    }
};

createAdmin();