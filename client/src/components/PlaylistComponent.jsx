import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { catchErrors } from '../utils'
import { getPlaylistById } from '../spotify';
import TrackList from './TrackList';
import SectionWrapper from './SectionWrapper';
import { StyledHeader } from '../styles';

const PlaylistComponent = () => {
  const { id } = useParams(); // Used to get the ID of the playlist from the URL param
  const [playlist, setPlaylist] = useState(null);
  const [tracksData, setTracksData] = useState(null);
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylistById(id);
      setPlaylist(data);
      setTracksData(data.tracks);
    };

    catchErrors(fetchData());
  }, [id]);

  // When tracksData updates, compile arrays of tracks and audioFeatures
  useEffect(() => {
    if (!tracksData) {
      return;
    }

    // When tracksData updates, check if there are more tracks to fetch
    // then update the state variable
    const fetchMoreData = async () => {
      if (tracksData.next) {
        const { data } = await axios.get(tracksData.next);
        setTracksData(data);
      }
    };

    setTracks(tracks => ([
      ...tracks ? tracks : [],
      ...tracksData.items
    ]));

    catchErrors(fetchMoreData());
  }, [tracksData]);

  const tracksForTracklist = useMemo(() => { // This creates an array of memoized tracks that is structured appropriately to work with the TrackList component. In each track item object, the data the TrackList component expects is nested in a "track" property.
    if (!tracks) {
      return;
    }
    return tracks.map(({ track }) => track);
  }, [tracks]);

  return (
    <>
      { playlist && (
        <>
          <StyledHeader>
            <div className="header__inner">
              { playlist.images.length && playlist.images[0].url && (
                <img className="header__img" src={ playlist.images[0].url } alt="Playlist Artwork" />
              ) }
              <div>
                <div className="header__overline">Playlist</div>
                <h1 className="header__name">{ playlist.name }</h1>
                <p className="header__meta">
                  { playlist.followers.total ? (
                    <span>{ playlist.followers.total } { `follower${playlist.followers.total !== 1 ? 's' : ''}` }</span>
                  ) : null }
                  <span>{ playlist.tracks.total } { `song${playlist.tracks.total !== 1 ? 's' : ''}` }</span>
                </p>
              </div>
            </div>
          </StyledHeader>

          <main>
            <SectionWrapper title="Playlist" breadcrumb={ true }>
              { tracksForTracklist 
                && (
                  <TrackList tracks={ tracksForTracklist } />
                ) 
              }
            </SectionWrapper>
          </main>
        </>
      ) }
    </>
  )
}

export default PlaylistComponent;