const Property = require('../models/Property');
const cloudinary = require('cloudinary').v2;

const addProperty = async (req, res) => {
    try {
        const { area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges } = req.body;
        const imageFiles = req.files;

        // Upload images to Cloudinary and get image URLs
        const imageUrls = await Promise.all(imageFiles.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path); // Upload file to Cloudinary
            return result.secure_url; // Get secure URL of the uploaded image
        }));

        const newProperty = new Property({
            area,
            bedrooms,
            bathrooms,
            nearbyHospitals,
            nearbyColleges,
            postedBy : req.user.id,
            images: imageUrls,
        });

        await newProperty.save();
        res.status(201).json({ message: 'Property created successfully', property: newProperty });
    } catch (err) {
        res.status(500).json({ error: err.message });
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

const getProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        res.json(property);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { addProperty, editProperty, deleteProperty, getProperties, getProperty };
