const mongoose = require('mongoose');

const orderReelGroup = new mongoose.Schema({
  gsm: { type: Number, required: true },
  size: { type: Number, required: true },
  shade: { type: String, required: true },
  bf: { type: Number, required: true },
  qty: { type: Number, required: true },
  rate: { type: Number, required: true },
  reels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reel' }],
});

// order id is created by mongoose when we save a document
const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    orderReelGroups: [{ type: orderReelGroup, required: true }],
    date: { type: Date, default: Date.now, required: true },
    active: { type: Boolean, index: true, sparse: true }
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