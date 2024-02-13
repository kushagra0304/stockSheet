const mongoose = require('mongoose');

// Reel id is created by mongoose when we save a document
const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    gstin: { type: String, required: true },
});

companySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// The first argument to the function below dictates the collection to put new documents in.
// This is fragile
const companyModel = mongoose.model('Company', companySchema);

module.exports = companyModel;