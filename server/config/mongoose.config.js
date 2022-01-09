const mongoose = require("mongoose");
const port = 27017;

// Export a function to be called in server.js
module.exports = (db_name) => {
  mongoose.connect(`mongodb://127.0.0.1:${port}/${db_name}`, {
  })
  .then(() => console.log(`Successfully connected to ${db_name}`))
  .catch((err) => console.log(`mongoose connection to ${db_name} failed: ${err}`));
};