const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    departDate: { type: Date, required: true },
    returnDate: { type: Date, required: true }
    // roundTrip: { type: Boolean, required: true },
}, {
    timestamps: true,
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;