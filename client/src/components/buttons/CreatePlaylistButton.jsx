import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

// styled-components (CSS variables are declared in the :root selector, located in the GlobalStyle variable declared in ../styles/variables.js)
const StyledCreatePlaylistButton = styled.button`

`;

const CreatePlaylistButton = () => {

  return (
    <>
      <Link to={ `/create-playlist` }>
        <StyledCreatePlaylistButton>Create a Playlist</StyledCreatePlaylistButton>
      </Link>
    </>
  );
};
export default CreatePlaylistButton;