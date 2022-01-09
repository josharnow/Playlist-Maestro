// import * as PlaylistsController from "../controllers/playlists.controller";
const PlaylistsController = require('../controllers/playlists.controller');

module.exports = (app) => {
  app.get('/api', PlaylistsController.index);
  app.get('/api/playlistss', PlaylistsController.findAllPlaylistss);
  app.get('/api/playlistss/:id', PlaylistsController.findOneSinglePlaylists);
  app.put('/api/playlistss/:id', PlaylistsController.updateExistingPlaylists);
  app.post('/api/playlistss', PlaylistsController.createNewPlaylists);
  app.delete('/api/playlistss/:id', PlaylistsController.deleteAnExistingPlaylists);
}