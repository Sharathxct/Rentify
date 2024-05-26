const User = require('../models/User');
const Property = require('../models/Property');

const likeProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        const user = await User.findById(req.user.id);
        if (user.likedProperties.includes(req.params.id)) {
            return res.status(400).json({ error: 'Property already liked' });
        }
        user.likedProperties.push(property);
        property.likes += 1;
        await user.save();
        await property.save();
        res.json(user.likedProperties);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const markInterested = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        const user = await User.findById(req.user.id);
        if (user.interestedProperties.includes(req.params.id)) {
            return res.status(400).json({ error: 'Property already marked as interested' });
        }
        user.interestedProperties.push(property);
        await user.save();
        res.json(user.interestedProperties);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { likeProperty, markInterested };
