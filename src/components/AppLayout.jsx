import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./ui/Header.jsx";

const StyledMain = styled.main`
  width: 100%;
  margin: 0 auto;

  & > h1 {
    margin: 4rem 0 0 11.8rem;
    line-height: 100%;
    letter-spacing: 0;
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-huge);
  }
`;

const AppLayout = () => {
  return (
    <>
      <Header />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </>
  );
};

export default AppLayout;
