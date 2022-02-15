import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { catchErrors } from '../utils'
import { getPlaylistById, getAudioFeaturesForTracks } from '../spotify';
import TrackList from './TrackList';
import SectionWrapper from './SectionWrapper';
import Loader from './Loader';
import { StyledHeader, StyledDropdown } from '../styles';

const PlaylistComponent = () => {
  const { id } = useParams(); // Used to get the ID of the playlist from the URL param
  const [playlist, setPlaylist] = useState(null);
  const [tracksData, setTracksData] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [audioFeatures, setAudioFeatures] = useState(null);
  const [sortValue, setSortValue] = useState('');
  const sortOptions = ['danceability', 'tempo', 'energy'];

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPlaylistById(id);
      setPlaylist(data);
      setTracksData(data.tracks);
    };

    catchErrors(fetchData());
  }, [id]); // The "id" variable is a dependency for this useEffect hook; it doesn't need to be run until we know the id of the playlist to fetch.

  // When tracksData updates, compile arrays of tracks and audioFeatures
  useEffect(() => {
    if (!tracksData) {
      return;
    }

    // When tracksData updates, check if there are more tracks to fetch then update the state variable
    const fetchMoreData = async () => {
      if (tracksData.next) {
        const { data } = await axios.get(tracksData.next);
        setTracksData(data); 
      }
    };
    setTracks(tracks => ([ // We set the tracksData state variable as the "tracks" array that comes with the JSON response of the playlists endpoint
      ...tracks ? tracks : [],
      ...tracksData.items
    ]));
    catchErrors(fetchMoreData());

    // Also update the audioFeatures state variable using the track IDs
    const fetchAudioFeatures = async () => {
      const ids = tracksData.items.map(({ track }) => track.id).join(',');
      const { data } = await getAudioFeaturesForTracks(ids);
      setAudioFeatures(audioFeatures => ([ // Creates an array of audio feature objects to correspond to each track in the "tracks" array. This "audioFeatures" array should be the same length as the "tracks" array.
        ...audioFeatures ? audioFeatures : [],
        ...data['audio_features']
      ]));
    };
    catchErrors(fetchAudioFeatures());
  }, [tracksData]); 

  // Map over the tracks array, finds the corresponding audio features object from the "audioFeatures" array using the track's id, and assigns it to each track's "audio_features" property
  const tracksWithAudioFeatures = useMemo(() => { // The useMemo hook is used to create the array for performance reasons; the tracksWithAudioFeatures should only be computed when we have both the "tracks" and "audioFeatures" arrays.
    if (!tracks || !audioFeatures) {
      return null;
    }

    return tracks.map(({ track }) => {
      const trackToAdd = track;

      if (!track.audio_features) {
        const audioFeaturesObj = audioFeatures.find(item => {
          if (!item || !track) {
            return null;
          }
          return item.id === track.id;
        });

        trackToAdd['audio_features'] = audioFeaturesObj;
      }

      return trackToAdd;
    });
  }, [tracks, audioFeatures]);

  // Sort tracks by audio feature to be used in template
  const sortedTracks = useMemo(() => { // Active sortValue is used to create another memoized array (sortedTracks) which sorts the tracksWithAudioFeatures array according to the currently selected sortValue.
    if (!tracksWithAudioFeatures) {
      return null;
    }

    return [...tracksWithAudioFeatures].sort((a, b) => {
      const aFeatures = a['audio_features'];
      const bFeatures = b['audio_features'];

      if (!aFeatures || !bFeatures) {
        return false;
      }

      return bFeatures[sortValue] - aFeatures[sortValue];
    });
  }, [sortValue, tracksWithAudioFeatures]);

  // const tracksForTracklist = useMemo(() => { // This creates an array of memoized tracks that is structured appropriately to work with the TrackList component. In each track item object, the data the TrackList component expects is nested in a "track" property.
  //   if (!tracks) {
  //     return;
  //   }
  //   return tracks.map(({ track }) => track); // Creates a memoized array based on our "tracks" state variable to pass to the TrackList component
  // }, [tracks]);

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
              <StyledDropdown active={ !!sortValue }>
                <label className="sr-only" htmlFor="order-select">Sort tracks</label>
                <select
                  name="track-order"
                  id="order-select"
                  onChange={ e => setSortValue(e.target.value) }
                >
                  <option value="">Sort tracks</option>
                  { sortOptions.map((option, i) => (
                    <option value={ option } key={ i }>
                      { `${option.charAt(0).toUpperCase()}${option.slice(1)}` }
                    </option>
                  )) }
                </select>
              </StyledDropdown>

              { 
                sortedTracks 
                  ? (
                    <TrackList tracks={ sortedTracks } /> // The sortedTracks array is passed to the TrackList component so that every time a different option is selected in the dropdown, the TrackList component will re-render with the sorted array of tracks
                  )
                  : <Loader /> 
              }


              {/* { tracksForTracklist 
                && (
                  <TrackList tracks={ tracksForTracklist } />
                ) 
              } */}
            </SectionWrapper>
          </main>
        </>
      ) }
    </>
  )
}
export default PlaylistComponent;