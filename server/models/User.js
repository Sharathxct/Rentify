const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    image : { type: String, default: 'https://tse4.mm.bing.net/th?id=OIP.z4no5tqp2ryBdMMD5NU9OgHaEv&pid=Api&P=0&h=180',},
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    likedProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
    interestedProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
