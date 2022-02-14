import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentUserPlaylists } from '../spotify';
import { catchErrors } from '../utils';
import SectionWrapper from './SectionWrapper';
import PlaylistsGrid from './PlaylistsGrid';

// Two useState hooks and two useEffect hooks are used because the Spotify API
// has a maximum number of playlists that it will return with each response, but
// we want the component to display all of the playlists. If the user has more
// than the number of playlists returned by the first response (default is 20),
// the other playlists need to be retrieved with another API call. The Spotify
// API handles this by wrapping the JSON response in a "paging object" which has
// a "next" property containing the URL of the next page of items. In order to
// get the next set of playlists, a GET request must be made to the URL defined
// in the "next" property. The second useEffect hook is invoked when
// playlistsData is updated, using axios.get() to send a GET request to the
// value of playlistsData.next and updating playlistsData with the resulting
// data. Because a loop is effectively created here, using playlistsData as a
// dependency and updating playlistsData within the hook, a conditional must be
// used to wrap the fetch and set state logic. When there is no next property on
// playlistsData, it means the last paging object has been hit.

const Playlists = () => {
  const [playlistsData, setPlaylistsData] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserPlaylists();
      setPlaylistsData(data);
    };

    catchErrors(fetchData());
  }, []);

  // When playlistsData updates, check if there are more playlists to fetch then update the state variable
  useEffect(() => {
    if (!playlistsData) {
      return;
    }

    // Playlist endpoint only returns 20 playlists at a time, so we need to make sure we get ALL playlists by fetching the next set of playlists
    const fetchMoreData = async () => {
      if (playlistsData.next) {
        const { data } = await axios.get(playlistsData.next);
        setPlaylistsData(data);
      }
    };

    // Use functional update to update playlists state variable to avoid including playlists as a dependency for this hook and creating an infinite loop
    setPlaylists(playlists => ([
      ...playlists ? playlists : [],
      ...playlistsData.items
    ]));

    // Fetch next set of playlists as needed
    catchErrors(fetchMoreData());

  }, [playlistsData]);

  return (
    <main>
      <SectionWrapper title="Public Playlists" breadcrumb={ true }>
        { playlists && (
          <PlaylistsGrid playlists={ playlists } />
        ) }
      </SectionWrapper>
    </main>
  );
};
export default Playlists;