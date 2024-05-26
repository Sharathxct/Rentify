const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    area: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    nearbyHospitals: { type: String, required: true },
    nearbyColleges: { type: String, required: true },
    likes: { type: Number, default: 0 },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Property', PropertySchema);
