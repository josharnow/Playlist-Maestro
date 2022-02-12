import * as SpotifyController from '../controllers/spotify.controller.mjs';

export default (app) => {
  app.get('/api/test', SpotifyController.test);
  app.get('/api/login', SpotifyController.login);
  app.get('/api/callback', SpotifyController.callback);
  app.get('/api/refresh_token', SpotifyController.refreshToken);
}