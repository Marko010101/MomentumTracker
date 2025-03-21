import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import hourglassImage from "../../assets/img/Hourglass.png";
import Button from "./Button.jsx";
import AddSvg from "../../assets/svg/add.svg?react";
import { useState } from "react";
import ModalAddEmployee from "../ModalAddEmployee.jsx";

const Header = () => {
  const [isCreateEmployeeOpen, setIsCreateEmployeeOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleEmployeeModal = () => setIsCreateEmployeeOpen((isOpen) => !isOpen);

  return (
    <>
      <StyledHeader>
        <Link to="/">
          <span>Momentum</span>
          <img src={hourglassImage} alt="Hourglass Image" />
        </Link>
        <div>
          <Button onClick={handleToggleEmployeeModal} variant="secondary">
            თანამშრომლის შექმნა
          </Button>
          <Button onClick={() => navigate("/task/create")} variant="primary">
            <span>
              <AddSvg />
            </span>
            შექმენი ახალი დავალება
          </Button>
        </div>
      </StyledHeader>
      {isCreateEmployeeOpen ? <ModalAddEmployee handleToggleEmployeeModal={handleToggleEmployeeModal} /> : null}
    </>
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
