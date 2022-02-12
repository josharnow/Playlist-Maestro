import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { accessToken } from '../spotify';

const SearchBar = ({ parentCallback }) => {
  const [token, setToken] = useState(null); // Initial state is set to null
  const [searchType, setSearchType] = useState("artists"); // Initial state is set to an empty string
  const [searchKey, setSearchKey] = useState(""); // Initial state is set to an empty string

  useEffect(() => {
    setToken(accessToken); // Sets token to the accessToken variable imported from the spotify.js file
  }, [])

  const search = async (e) => {
    e.preventDefault(); // Prevents the page from reloading when invoking the search
    console.log(`Dropdown selection value: "${searchType}"`);
    console.log(`searchKey value: "${searchKey}"`);
    if (searchType === "artists") {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: searchKey, // Query
          type: "artist" // Type of query
        }
      })

      console.log(`Data: ${JSON.stringify(data)}`);
      console.log(`Artists: ${JSON.stringify(data.artists.items)}`)

      // setArtists(data.artists.items); // Sets the state to whatever is contained in data.artists.items (from Spotify API)
      
      // setTracks(null); // Sets the value of tracks back to the initial state; used for conditional rendering inside of SearchResults component
      
      parentCallback(data.artists.items, null); // Passes the values of the artists search result back to the parent component (NavBar) to then be passed to and rendered on the SearchResults component. The second argument is set to null to ensure that setTracks receives a null argument in the parentCallback function, which is contained in the parent function (NavBar).

    } else if (searchType === "tracks") {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: searchKey, // Query
          type: "track" // Type of query
        }
      })

      console.log(`Data: ${JSON.stringify(data)}`);
      console.log(`Tracks: ${JSON.stringify(data.tracks.items)}`)

      // setTracks(data.tracks.items); // Sets the state to whatever is contained in data.tracks.items (from Spotify API)
      
      // setArtists(null); // Sets the value of artists back to the initial state; used for conditional rendering inside of SearchResults component
      
      parentCallback(null, data.tracks.items); // Passes the values of the tracks search result back to the parent component (NavBar) to then be passed to and rendered on the SearchResults component. The second argument is set to null to ensure that setArtists receives a null argument in the parentCallback function, which is contained in the parent function (NavBar).
    }

    // parentCallback(data.artists.items, data.tracks.items);
  }

  return (
    <React.Fragment>
      <label htmlFor="endpoints" className='leftMargin'>Search for:</label> {/* Matches to id with value of "endpoints" */ }
      <select name="endpoints" id="endpoints" onChange={e => setSearchType(e.target.value)} defaultValue="artists">
        {/* <optgroup label="Artists"> */}
        <option value="artists">Artists</option>
        <option value="tracks">Tracks</option>
        {/* </optgroup> */}
      </select>

      <form onSubmit={ search }> {/* Invokes the search function on form submission */ }
        <input type="text" onChange={ e => setSearchKey(e.target.value) } className='margin' />
        <button type="submit">Search</button>
      </form>
    </React.Fragment>
  )
}
export default SearchBar;