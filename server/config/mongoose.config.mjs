import mongoose from 'mongoose';
const mongoosePort = process.env.MONGOOSE_PORT;
const mongoDBURI = process.env.MONGODB_URI;

// Exports a function to be called in server.js
export default (db_names) => {
  mongoose.connect(`${mongoDBURI}:${mongoosePort}/${db_names}`, {
  })
  .then(() => console.log(`Successfully connected to ${db_names}`))
  .catch((err) => console.log(`mongoose connection to ${db_names} failed: ${err}`));
};