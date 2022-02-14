import { useEffect, useState } from 'react';
import {
  accessToken,
  getCurrentUserProfile,
  getCurrentUserPlaylists,
  getTopArtists,
  getTopTracks
} from '../spotify';
import SectionWrapper from './SectionWrapper';
import ArtistsGrid from './ArtistsGrid';
import TrackList from './TrackList';
import PlaylistsGrid from './PlaylistsGrid';
import { catchErrors } from '../utils';
import { StyledHeader } from '../styles';

const User = () => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    setToken(accessToken); // Sets token to the accessToken variable imported from the spotify.js file

    const fetchData = async () => { // Because the await operator can only be used inside of async functions, an async function is used here. This is better than making the whole useEffect hook async, as that can quickly create complicated problems.
        const userProfile = await getCurrentUserProfile(); // getCurrentUserProfile() returns a promise, so we need to wait for the promise to be resolved using await.
        setProfile(userProfile.data);

        const userPlaylists = await getCurrentUserPlaylists();
        setPlaylists(userPlaylists.data);

        const userTopArtist = await getTopArtists();
        setTopArtists(userTopArtist.data);
        
      const userTopTracks = await getTopTracks();
      setTopTracks(userTopTracks.data);
      };
      
      catchErrors(fetchData()); // Invokes the async function
    }, [])
    
    // console.log(topTracks)

  return (
    <>
      { 
        (token && profile) 
          && (
            <StyledHeader type="user">
              <div className="header__inner">
                { profile.images.length && profile.images[0].url && (
                <img src={ profile.images[0].url } className="header__img" alt="Avatar" />
                )}

                <div>
                  <div className="header__overline">Profile</div>
                  <h1 className="header__name">{ profile.display_name }</h1>
                  <p className="header__meta">
                    { playlists 
                      && <span>{ playlists.total } Playlist{ playlists.total !== 1 ? 's' : '' }</span>
                    }
                    <span>
                      { profile.followers.total } Follower{ profile.followers.total !== 1 ? 's' : '' }
                    </span>
                  </p>
                </div>
              </div>
            </StyledHeader>
          )
      }


      {/* Top 10 artists are passed to the ArtistsGrid component to keep the User component tidy */}
      <main>
        { 
          (topArtists)
            && (
                <SectionWrapper title="Top artists this month" seeAllLink="/top-artists">
                  <ArtistsGrid artists={ topArtists.items.slice(0, 10) } />
                </SectionWrapper>
            )
        }

        {
          (topTracks)
          && (
            <SectionWrapper title="Top tracks this month" seeAllLink="/top-tracks">
              <TrackList tracks={ topTracks.items.slice(0, 10) } />
            </SectionWrapper>
          )
        }

        {
          (playlists)
          && (
            <SectionWrapper title="Playlists" seeAllLink="/playlists">
              <PlaylistsGrid playlists={ playlists.items.slice(0, 10) } />
            </SectionWrapper>
          )
        }
      </main>


      { 
        (!token) 
          && <h1>Please log in to view your profile</h1>
      }
    </>
  );
}
export default User;