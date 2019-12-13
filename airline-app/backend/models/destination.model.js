const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    username: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    departDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    price: { type: Number },
    amount: { type: Number },
}, {
    timestamps: true,
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;