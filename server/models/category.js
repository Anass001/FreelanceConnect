const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }]
});

module.exports = mongoose.model('Category', categorySchema);