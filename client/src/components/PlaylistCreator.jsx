import { useState, useEffect, useMemo } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
import { catchErrors } from '../utils'
// import { getPlaylistById, getAudioFeaturesForTracks } from '../spotify';
import { getCurrentUserProfile, createPlaylist } from '../spotify';
// import TrackList from './TrackList';
// import SectionWrapper from './SectionWrapper';
// import Loader from './Loader';
// import { StyledHeader, StyledDropdown } from '../styles';

const PlaylistCreator = () => {
  const [userID, setUserID] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  // const [profile, setProfile] = useState(null);
  // const [playlists, setPlaylists] = useState(null);
  // const [topArtists, setTopArtists] = useState(null);
  // const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    const fetchData = async () => { 
      const userProfile = await getCurrentUserProfile(); 
      setUserID(userProfile.data.id);

      // const userPlaylists = await getCurrentUserPlaylists();
      // setPlaylists(userPlaylists.data);

      // const userTopArtist = await getTopArtists();
      // setTopArtists(userTopArtist.data);

      // const userTopTracks = await getTopTracks();
      // setTopTracks(userTopTracks.data);

      // console.log(userProfile.data.id)

      
    };
    
    catchErrors(fetchData()); // Invokes the async function
    
    createPlaylist(userID);
  }, [userID]);
  

  return (
    <>


      {console.log(userID)}
    </>
  )
}
export default PlaylistCreator;