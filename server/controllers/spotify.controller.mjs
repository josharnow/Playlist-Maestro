// In our controller file, we export different functions that perform the basic CRUD operations using our User model.
// Spotify is a constructor function which can create new objects and also has other methods that will talk to the database!
// The .then() will only execute upon successfully inserting data in the database
// The .catch() will execute only if there is an error.

// import Spotify from '../models/spotify.model.mjs';
import axios from 'axios';
import queryString from 'query-string';
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

export const test = (req, res) => {
  res.json({
    message: "Hello World"
  });
}

export const login = (req, res) => {
  const state = generateRandomString(16); //  Protects against attacks such as cross-site request forgery
  res.cookie(stateKey, state);

  const scope = 'user-read-private user-read-email'; // Space-separated list of Spotify's pre-defined authorization scopes

  const queryParams = queryString.stringify({ // Serializes an object with keys and values into a query string
    client_id: client_id,
    response_type: 'code',
    redirect_uri: redirect_uri,
    state: state,
    scope: scope,
  });
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
}

export const callback = (req, res) => {
  const code = req.query.code || null; // Stores the value of our authorization code obtained from the code query param; null is set as a fallback if teh route doesn't have a code query param

  axios({
    method: 'post', // POST request
    url: 'https://accounts.spotify.com/api/token',
    data: queryString.stringify({ // Formats the required body params
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    },
  })
    .then(response => { // If the request is successful, .then() callback is invoked
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;
        
        const queryParams = queryString.stringify({
          access_token,
          refresh_token,
          expires_in,
        });
        
        res.redirect(`http://localhost:3000/?${queryParams}`);
        
      } else {
        res.redirect(`/?${queryString.stringify({ error: 'invalid_token' })}`);
      }
    })
    .catch(error => {
      res.send(error);
    });
}

export const refreshToken = (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: queryString.stringify({
      grant_type: 'refresh_token', // Similar to /api/callback handler, except the grant_type is 'refresh_token' instead of 'authorization_code'
      refresh_token: refresh_token // Similar to /api/callback handler, except the refresh_token is sent instead of code
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    },
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error);
    });
}