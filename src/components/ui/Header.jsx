import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "./Button.jsx";
import AddSvg from "../../assets/svg/add.svg?react";

const Header = () => {
  return (
    <StyledHeader>
      <Link to="/">
        <span>Momentum</span>
        <img src="/src/assets/Hourglass.png" alt="Hourglass Image" />
      </Link>
      <div>
        <Button variant="secondary">თანამშრომლის შექმნა</Button>
        <Button variant="primary">
          <span>
            <AddSvg />
          </span>
          შექმენი ახალი დავალება
        </Button>
      </div>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  padding: 3rem 12rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > a {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    & > span {
      font-family: "Fredoka One";
      font-weight: var(--font-weight-regular);
      color: var(--color-purple);
      font-size: 3.1rem;
      line-height: 100%;
    }
    & > img {
      width: 3.8rem;
      height: 3.8rem;
      margin: 0.1rem 0 0 0.1rem;
    }
  }
  & > div {
    display: flex;
    gap: 4rem;
  }
`;
