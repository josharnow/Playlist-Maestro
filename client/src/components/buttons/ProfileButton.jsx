import styled from 'styled-components/macro';
import { useParams, Link } from 'react-router-dom';

// styled-components (CSS variables are declared in the :root selector, located in the GlobalStyle variable declared in ../styles/variables.js)
const StyledProfileButton = styled.button`

`;

const ProfileButton = () => {
  const { id } = useParams();

  return (
    <>
      <Link to={ `/profile/${id}` }>
        <StyledProfileButton>Your Profile</StyledProfileButton>
      </Link>
    </>
  );
};
export default ProfileButton;