const mongoose = require('mongoose');

const ratesSchema = new mongoose.Schema({
    reelGroupSignature: { type: String, required: true },
    soldRate: { type: Number, required: true }
});

// order id is created by mongoose when we save a document
const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    rates: [{ type: ratesSchema, required: true }],
    date: { type: Date, default: Date.now, required: true },
    active: { type: Boolean, index: true, sparse: true}
});

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// The first argument to the function below dictates the collection to put new documents in.
// This is fragile
const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;