const mongoose = require('mongoose');

// Reel id is created by mongoose when we save a document
const shipmentSchema = new mongoose.Schema({
    millName: { type: String, required: true },
    billDate: { type: Date, required: true },
    billNumber: { type: String, required: true },
    dispatch: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reel', required: true }],
    date: { type: Date, required: true, default: Date.now },
});

shipmentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// The first argument to the function below dictates the collection to put new documents in.
// This is fragile
const shipmentModel = mongoose.model('Shipment', shipmentSchema);

module.exports = shipmentModel;