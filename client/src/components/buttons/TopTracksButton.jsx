import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

// styled-components (CSS variables are declared in the :root selector, located in the GlobalStyle variable declared in ../styles/variables.js)
const StyledTopTracksButton = styled.button`

`;

const TopTracksButton = () => {

  return (
    <>
      <Link to={ `/top-tracks` }>
        <StyledTopTracksButton>Your Top Tracks</StyledTopTracksButton>
      </Link>
    </>
  );
};
export default TopTracksButton;