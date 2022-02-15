import { useEffect, useState } from 'react';
import { accessToken } from '../spotify';
// import { useParams } from 'react-router-dom';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { 
  LoginButton, 
  LogoutButton, 
  ProfileButton, 
  HomeButton,
  TopArtistsButton,
  TopTracksButton,
  PlaylistsButton
} from './buttons';

const NavBar = () => {
  const [token, setToken] = useState(null);
  const [artists, setArtists] = useState(null);
  const [tracks, setTracks] = useState(null);
  // const [results, setResults] = useState(null);
  // const { id } = useParams();

  useEffect(() => {
    setToken(accessToken); // Sets token to the accessToken variable imported from the spotify.js file
  }, [])

  const handleCallback = (childArtists, childTracks) => {
    setArtists(childArtists);
    setTracks(childTracks);
  }

  // const handleCallback = (childData) => {
  //   setResults(childData);
  // }

  return (
    <>
      <div className={""}>
        <div className='d-flex justify-content-between margin'>
          <h1 className=''>🎵 Playlist Maestro 🎵</h1>

          {
            (token && window.location.pathname === `/`)
              && <SearchBar parentCallback={ handleCallback }/>
          }

          {
            (!token && window.location.pathname === `/`)
              && <h2 className=''>Please log in to search</h2>
          }

          {
            (token && window.location.pathname !== `/profile`)
              && <ProfileButton />
          }

          {
            (token && window.location.pathname !== `/top-artists`)
              && <TopArtistsButton />
          }

          {
            (token && window.location.pathname !== `/top-tracks`)
              && <TopTracksButton />
          }

          {
            (token && window.location.pathname !== `/playlists`)
              && <PlaylistsButton />
          }

          {
            (token && window.location.pathname !== `/`)
              && <HomeButton />
          }

          
          
          {/* If token, render the logout button; else render the login button */ }
          {
            token
              ? <LogoutButton />
              : <LoginButton />
          }
        </div>

        {
          token &&
            <SearchResults artists={ artists } tracks={ tracks } /> // Passes the artists variable to the SearchResults component as "artists"
        }
      </div>
    </>
  );
}
export default NavBar;