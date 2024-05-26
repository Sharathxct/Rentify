const Property = require('../models/Property');

const addProperty = async (req, res) => {
    const { area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges } = req.body;
    try {
        const property = new Property({
            area,
            bedrooms,
            bathrooms,
            nearbyHospitals,
            nearbyColleges,
            postedBy: req.user.id
        });
        await property.save();
        res.status(201).json(property);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const editProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        if (property.postedBy.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized' });
        }
        Object.assign(property, req.body);
        await property.save();
        res.json(property);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }
        if (property.postedBy.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized' });
        }
        await property.remove();
        res.json({ message: 'Property removed' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { addProperty, editProperty, deleteProperty, getProperties };
