import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    url_name: {
        type: String,
        required: true
    },
    services: [{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }]
});

export default model('Category', categorySchema);