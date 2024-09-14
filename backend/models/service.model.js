const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
    serviceName: {
        type: String,
        required: [true, 'Service name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    serviceImage: {
        type: String,
        required: [true, 'Service image is required']
    }
},{
    timestamps: true
})

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service;