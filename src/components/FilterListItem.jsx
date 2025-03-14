import styled from "styled-components";

import ArrowDown from "../assets/svg/arrowDown.svg?react";
import ArrowUp from "../assets/svg/arrowUp.svg?react";

import { useOutsideClick } from "../hooks/useOutsideClick.js";
import Dropdown from "./Dropdown.jsx";

function FilterListItem({ children, isOpen, onToggle, onClose, data, selectionType = "multi", paramKey }) {
  const ref = useOutsideClick(onClose);
  return (
    <StyledLi onClick={onToggle} isOpen={isOpen} ref={isOpen ? ref : null}>
      <ToggleText isOpen={isOpen}>
        {children} <span>{isOpen ? <ArrowUp /> : <ArrowDown />}</span>
      </ToggleText>
      {isOpen && (
        <Dropdown
          data={data}
          selectionType={selectionType}
          paramKey={paramKey}
          onClick={(e) => e.stopPropagation()}
          onClose={onToggle}
        />
      )}
    </StyledLi>
  );
}

export default FilterListItem;

const StyledLi = styled.li`
  position: relative;
  width: 19.9rem;
  padding: 1rem 1.8rem;
  border-radius: 1rem;
  cursor: pointer;
`;

const ToggleText = styled.p`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: ${(props) => (props.isOpen ? "var(--color-purple)" : "var(--color-text-dark)")};

  &:hover {
    color: var(--color-purple);
  }

  &:hover svg {
    fill: var(--color-purple);
  }

  & span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.4rem;
    height: 2.4rem;

    & svg {
      width: 1.2rem;
      height: 0.8rem;
      fill: ${(props) => (props.isOpen ? "var(--color-purple)" : "var(--color-text-dark)")};
    }
  }
`;
