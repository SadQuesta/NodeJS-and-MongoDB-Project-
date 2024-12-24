const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        
    },
    password: {
        type: String,
        
    },
    phone: {
        type: String,
        
    },
    role: { type: String, default: 'user' }
    
});
module.exports = mongoose.model('User', UserSchema);
