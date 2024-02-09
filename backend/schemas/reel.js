const mongoose = require('mongoose');

// Reel id is created by mongoose when we save a document
const reelSchema = new mongoose.Schema({
    // ----------------------------
    // Required fields
    gsm: { type: Number, required: true },
    size: { type: Number, required: true },
    shade: { type: String, required: true },
    bf: { type: Number, required: true },
    weight: { type: Number, required: true },
    reelNo: { type: String, required: true },
    rate: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    // ----------------------------
    // Sold fields
    sold: { 
        type: Boolean,
        index: true,
        sparse: true
     },
    soldTo: { type: String },
    soldDate: { type: Date },
    soldRate: { type: Number }
    // ----------------------------
});

reelSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// The first argument to the function below dictates the collection to put new documents in.
// This is fragile
const reelModel = mongoose.model('Reel', reelSchema);

module.exports = reelModel;