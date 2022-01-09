// In our controller file, we export different functions that perform the basic
// CRUD operations using our User model.
// Playlists is a constructor function which can create new joke objects and also has other methods that will talk to the database!
// the .then() will only execute upon successfully inserting data in the database
// the .catch() will execute only if there is an error.

const Playlists = require('../models/playlists.model');

module.exports.index = (req, res) => {
  res.json({
    message: "Hello World"
  });
}

module.exports.findAllPlaylistss = (req, res) => {
  Playlists.find() // retrieve an array of all documents in the collection
    .then(allDaPlaylistss => res.json({ playlistss: allDaPlaylistss }))
    .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.findOneSinglePlaylists = (req, res) => {
  Playlists.findOne({ _id: req.params.id })
    .then(oneSinglePlaylists => res.json({ playlists: oneSinglePlaylists}))
    .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.createNewPlaylists = (req, res) => {
  Playlists.create(req.body)
    // .then(res.json(Playlists))
    .then(newlyCreatedPlaylists => res.json({ playlists: newlyCreatedPlaylists }))
    .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.updateExistingPlaylists = (req, res) => {
  Playlists.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  )
    .then(updatedPlaylists => res.json({ playlists: updatedPlaylists }))
    .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.deleteAnExistingPlaylists = (req, res) => {
  Playlists.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: 'Something went wrong', error: err }));
}