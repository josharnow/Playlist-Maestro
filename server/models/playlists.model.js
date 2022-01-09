const mongoose = require("mongoose");
const db_name = require("../server");

const PlaylistsSchema = new mongoose.Schema(
  {
  //  "setup": {
  //    type: String,
  //    required: [true, "Setup is required!"],
  //    minlength: [10, "Setup must be at least 10 characters long!"]
  //  },
  //  "punchline": {
  //    type: String,
  //    required: [true, "Punchline is required!"],
  //    minlength: [6, "Punchline must be at least 6 characters long!"]
  //  }
  },
  { timestamps: true } // Assigns createdAt and updatedAt fields
);

const Playlists = mongoose.model(db_name, PlaylistsSchema);
module.exports = Playlists;