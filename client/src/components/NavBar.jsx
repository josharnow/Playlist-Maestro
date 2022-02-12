import React, { useEffect, useState } from 'react';
import { accessToken, logout } from '../spotify';
import { useParams, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Login from './Login';
// import styles from './NavBar.module.css';
import styled from 'styled-components/macro';

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
              && <Link to={ `/profile/${id}` }><button>Your Profile</button></Link>
          }

          {
            (token && window.location.pathname === `/profile/${id}`)
              && <Link to={ `/` }><button>Go Home</button></Link>
          }
          
          {/* If no token, render the login button; else render the logout button */ }
          {
            !token
              ? <Login />
              : <button onClick={ logout }>Logout</button>
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