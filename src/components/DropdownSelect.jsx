import { useState } from "react";
import styled, { css } from "styled-components";

import ArrowDown from "../assets/svg/arrow-down.svg?react";
import ArrowUp from "../assets/svg/arrow-up.svg?react";
import { LuLoaderCircle } from "react-icons/lu";

import { useOutsideClick } from "../hooks/useOutsideClick.js";
import SpinnerSmall from "./ui/SpinnerSmall.jsx";

const DropdownSelect = ({ handleAction, data, defaultText, isPending = false, isError = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useOutsideClick(() => setIsOpen(false));

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSelect = (id, itemName) => {
    setSelectedItem(itemName);
    handleAction(id);
    setIsOpen(false);
  };

  return (
    <StyledDropdown ref={dropdownRef} isOpen={isOpen} isPending={isPending} isError={isError}>
      <ul>
        <p onClick={handleToggle}>
          {selectedItem || defaultText}
          <span>{isPending ? <SpinnerSmall color="var(--color-purple)" /> : isOpen ? <ArrowUp /> : <ArrowDown />}</span>
        </p>

        {isOpen &&
          !isPending &&
          data?.map((item) => (
            <li key={item.id} onClick={() => handleSelect(item.id, item.name)}>
              {item.name}
            </li>
          ))}
      </ul>
    </StyledDropdown>
  );
};

export default DropdownSelect;

const StyledDropdown = styled.div`
  position: absolute;
  width: 25.9rem;
  border-radius: 0.6rem;
  z-index: ${(props) => (props.isOpen ? "1000" : "100")};
  top: -0.5rem;

  overflow: auto;
  user-select: none;

  background-color: var(--color-white);
  border: 0.1rem solid ${({ isError }) => (isError ? "var(--color-red)" : "var(--color-gray)")};
  font-size: var(--font-size-mini);
  color: var(--color-text-dark);
  font-weight: var(--font-weight-light);
  /* font-weight; */
  & > ul {
    width: 100%;

    & p {
      cursor: pointer;
      padding: 1.2rem 1.4rem;
      position: relative;

      & > span {
        display: flex;
        position: absolute;
        right: 1.4rem;
        top: 50%;
        transform: translateY(-50%);
      }

      &:hover {
        background-color: var(--color-very-light-gray);
      }
    }

    & li {
      cursor: pointer;
      padding: 1.2rem 1.4rem;
      &:hover {
        background-color: var(--color-gray-light);
      }
    }
    & li {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
  }
`;
