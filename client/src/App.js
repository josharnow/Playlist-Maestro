import React, { useState, useEffect } from 'react';
import { accessToken, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';
// import './App.css';
import Main from './views/Main';
import Profile from './views/Profile';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// import styled, { createGlobalStyle } from 'styled-components/macro';
import { GlobalStyle } from './styles';

function App() {
  // const [token, setToken] = useState(null);
  // const [profile, setProfile] = useState(null);

  useEffect(() => {
    // setToken(accessToken); // Sets token to the accessToken variable imported from the spotify.js file

    const fetchData = async () => { // Because the await operator can only be used inside of async functions, an async function is used here. This is better than making the whole useEffect hook async, as that can quickly create complicated problems.
      const { data } = await getCurrentUserProfile(); // getCurrentUserProfile() returns a promise, so we need to wait for the promise to be resolved using await. Destructuring is used to access the data property of the axios response.
      
      // setProfile(data);
    };

    catchErrors(fetchData()); // Invokes the async function
    // console.dir(profile);
  }, []);

  // Scroll to top of page when changing routes
  // https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <BrowserRouter>
      <GlobalStyle /> {/* This will set the styles defined in GlobalStyle globally */}
      <ScrollToTop />

      <Routes>
        {/* when a <Switch> is rendered, it searches through its children <Route> elements to find one whose path matches the current URL. When it finds one, it renders that <Route> and ignores all others. Therefore, routes with more specific (typically longer) paths should be listed before less-specific ones. */}

        <Route path="/top-artists" element={<h1>Top Artists</h1>} />
        <Route path="/top-tracks" element={<h1>Top Tracks</h1>} />
        <Route path="/playlists/:id" element={<h1>Playlist</h1>} />
        <Route path="/playlists" element={<h1>Playlists</h1>} />


        <Route path={`/profile/:id`} element={ <Profile /> } />
        <Route path="/" element={ <Main /> } />
      </Routes>
    </BrowserRouter>
  );
}
export default App;


        // <Route path={ `/profile/${profile.id}`} element={ <Profile /> } />