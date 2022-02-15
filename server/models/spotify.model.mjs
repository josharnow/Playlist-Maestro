import mongoose from 'mongoose';
// import {db_name} from '../server.mjs';

const SpotifySchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: true
  // },
  // email: {
  //   type: String
  // },
  // spotifyId: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  // accessToken: {
  //   type: String,
  //   required: true
  // },
  // accessTokenExpiry: {
  //   type: Date,
  //   required: true
  // },
  // refreshToken: {
  //   type: String,
  //   required: true
  // }
});

// export default mongoose.model(db_name[2], SpotifySchema);
export default mongoose.model("Spotify", SpotifySchema);