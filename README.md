# Playlist-Maestro
Brings finely tuned Spotify playlist recommendations to users based on their specific preferences. Written in JavaScript/React.js.

## Local Installation & Set Up

1. Register a Spotify App in your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and add `http://localhost:8000/api/callback` as a Redirect URI in the app settings

2. Create a `.env` file at the root of the project and add your unique `CLIENT_ID` and `CLIENT_SECRET` from the Spotify dashboard

3. Ensure [nvm](https://github.com/nvm-sh/nvm) and [npm](https://www.npmjs.com/) are installed globally

4. Install the correct version of Node

    ```shell
    nvm install
    ```

5. Install dependencies

    ```shell
    npm install
    ```

6. Run the React app on <http://localhost:3000> and the Node server on <http://localhost:8000>

    ```shell
    npm start
    ```
