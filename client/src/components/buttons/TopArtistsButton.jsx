import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

// styled-components (CSS variables are declared in the :root selector, located in the GlobalStyle variable declared in ../styles/variables.js)
const StyledTopArtistsButton = styled.button`

`;

const TopArtistsButton = () => {

  return (
    <>
      <Link to={ `/top-artists` }>
        <StyledTopArtistsButton>Your Top Artists</StyledTopArtistsButton>
      </Link>
    </>
  );
};
export default TopArtistsButton;