import React, { useEffect, useState } from 'react';
import { accessToken } from '../spotify';
import { useParams } from 'react-router-dom';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { LoginButton, LogoutButton, ProfileButton, HomeButton } from './buttons';
// import styles from './NavBar.module.css';

const NavBar = () => {
  const [token, setToken] = useState(null);
  const [artists, setArtists] = useState(null);
  const [tracks, setTracks] = useState(null);
  // const [results, setResults] = useState(null);
  const { id } = useParams();

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
    <React.Fragment>
      <div className={""}>
        <div className='d-flex justify-content-between margin'>
          <h1 className=''>🎵 Playlist Maestro 🎵</h1>

          {
            (token && window.location.pathname !== `/profile/${id}`)
              && <SearchBar parentCallback={ handleCallback }/>
          }

          {
            (!token && window.location.pathname !== `/profile/${id}`)
              && <h2 className=''>Please log in to search</h2>
          }

          {
            (token && window.location.pathname !== `/profile/${id}`)
              && <ProfileButton />
          }

          {
            (token && window.location.pathname === `/profile/${id}`)
              && <HomeButton />
          }
          
          {/* If no token, render the login button; else render the logout button */ }
          {
            !token
              ? <LoginButton />
              : <LogoutButton />
          }
        </div>

        {
          token &&
            <SearchResults artists={ artists } tracks={ tracks } /> // Passes the artists variable to the SearchResults component as "artists"
        }
      </div>
    </React.Fragment>
  );
}
export default NavBar;