import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

// styled-components (CSS variables are declared in the :root selector, located in the GlobalStyle variable declared in ../styles/variables.js)
const StyledPlaylistsButton = styled.button`

`;

const PlaylistsButton = () => {

  return (
    <>
      <Link to={ `/playlists` }>
        <StyledPlaylistsButton>Your Playlists</StyledPlaylistsButton>
      </Link>
    </>
  );
};
export default PlaylistsButton;