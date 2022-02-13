import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

// styled-components (CSS variables are declared in the :root selector, located in the GlobalStyle variable declared in ../styles/variables.js)
const StyledHomeButton = styled.button`

`;

const HomeButton = () => {

  return (
    <>
      <Link to={ `/` }>
        <StyledHomeButton>Go Home</StyledHomeButton>
      </Link>
    </>
  );
};
export default HomeButton;