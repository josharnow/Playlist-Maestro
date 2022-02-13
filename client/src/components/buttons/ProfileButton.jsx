import styled from 'styled-components/macro';
import React from 'react';
import { useParams, Link } from 'react-router-dom';

// styled-components (CSS variables are declared in the :root selector, located in the GlobalStyle variable declared in ../styles/variables.js)
const StyledProfileButton = styled.button`

`;

const ProfileButton = () => {
  const { id } = useParams();

  return (
    <React.Fragment>
      <Link to={ `/profile/${id}` }>
        <StyledProfileButton>Your Profile</StyledProfileButton>
      </Link>
    </React.Fragment>
  );
};
export default ProfileButton;