import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongooseFunction from './config/mongoose.config.mjs';
import spotify from './routes/spotify.routes.mjs';

const db_names = ["Spotify"]
// const db_names = "User and Spotify"

// Environment vars.
const port = process.env.EXPRESS_PORT;
// export const db_name = ["User", "Spotify"];

// Immediately execute the import mongoose.config.js function.
// require() statement basically reads a JavaScript file, executes it, and then
// proceeds to return the export object.
mongooseFunction(db_names);
// mongooseFunction(["User", "Spotify"]);
// mongooseFunction(db_name);

const app = express();

// req.body undefined without this!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// user(app);
spotify(app);

app.listen(port, () =>
  console.log(`Listening on port ${port} for REQuests to RESpond to.`)
);