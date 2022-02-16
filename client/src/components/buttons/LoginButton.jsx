import styled from 'styled-components/macro';

// const StyledLoginContainer = styled.main`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

// styled-components (CSS variables are declared in the :root selector, located in the GlobalStyle variable declared in ../styles/variables.js)
const StyledLoginButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;

const login_uri =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8000/api/login'
    : 'https://playlist-maestro.herokuapp.com/api/login';

const LoginButton = () => {

  return(
    <StyledLoginButton href={login_uri}>
      Log in
    </StyledLoginButton>
  );
};
export default LoginButton;