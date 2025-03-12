import styled from "styled-components";

import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <StyledPageNotFound>
      <h1>Sorry, this page isn`t available.</h1>
      <p>
        The link you followed may be broken, or the page may have been removed.
        <span onClick={navigate(-1)}>
          Go back to <span>MomentumTracker.</span>
        </span>
      </p>
    </StyledPageNotFound>
  );
}

export default PageNotFound;

const StyledPageNotFound = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 3.3rem;

  & p {
    margin-top: 3rem;
    flex-grow: 1;

    & span {
      cursor: pointer;

      & span {
        font-weight: var(--font-weight-semibold);
      }

      &:active {
        color: var(--color-gray-500);
      }
    }
  }

  & footer {
    align-self: center;
  }
`;
