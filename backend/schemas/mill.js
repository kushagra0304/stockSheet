const mongoose = require('mongoose');

// Reel id is created by mongoose when we save a document
const millSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gstin: { type: String, required: true },
});

millSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// The first argument to the function below dictates the collection to put new documents in.
// This is fragile
const millModel = mongoose.model('Mill', millSchema);

module.exports = millModel;