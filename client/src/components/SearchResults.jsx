import { useEffect, useState } from 'react';
import { accessToken } from '../spotify';

const SearchResults = ({artists, tracks}) => { // Pulls in the "artists" variable passed in from the parent (NavBar) component
  const [token, setToken] = useState(null); // Initial state is set to null

  useEffect(() => {
    setToken(accessToken); // Sets token to the accessToken variable imported from the spotify.js file
  }, [])

  const renderArtists = () => {
    return artists.map(artist => {
      return <div key={ artist.id }>
        {
          artist.images.length
            ? <img width={ "100%" } src={ artist.images[0].url } alt="" />
            : <div>No Image</div>
        }
        { artist.name }
      </div>
    })
  }

  const renderTracks = () => {
    return tracks.map(track => {
      return <div key={ track.id }>
        {/* TODO - Make tracks clickable, such that they can be added to a playlist */ }
        { track.name }
      </div>
    })
  }


  return (
    <>
      {/* Renders artist data */ }
      {
        (token && artists) &&
          renderArtists()
      }

      {/* Renders artist data */ }
      {
        (token && tracks) &&
          renderTracks()
      }
    </>
  )
}
export default SearchResults;