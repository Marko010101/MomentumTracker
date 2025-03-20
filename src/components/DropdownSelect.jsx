import { useEffect, useState } from "react";
import styled from "styled-components";

import ArrowDown from "../assets/svg/arrow-down.svg?react";
import ArrowUp from "../assets/svg/arrow-up.svg?react";
import AddCircle from "../assets/svg/addCircle.svg?react";

import { useOutsideClick } from "../hooks/useOutsideClick.js";
import LoaderMini from "./ui/LoaderMini.jsx";

const DropdownSelect = ({
  handleAction,
  data,
  defaultValue,
  defaultText,
  isPending = false,
  isError = false,
  handleToggleEmployeeModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedSurname, setSelectedSurname] = useState(null);
  const dropdownRef = useOutsideClick(() => setIsOpen(false));

  useEffect(() => {
    if (data && data.length > 0) {
      const defaultItem = data.find((item) => item.id === defaultValue);
      if (defaultItem) {
        setSelectedItem(defaultItem.name);
        setSelectedIcon(defaultItem.icon || null);
        setSelectedAvatar(defaultItem.avatar || null);
        setSelectedSurname(defaultItem.surname || null);
      }
    }
  }, [data, defaultValue]);

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSelect = (id, itemName, itemIcon, itemAvatar, itemSurname) => {
    setSelectedItem(itemName);
    setSelectedIcon(itemIcon || null);
    setSelectedAvatar(itemAvatar || null);
    setSelectedSurname(itemSurname || null);
    if (handleAction) {
      handleAction(id);
    }
    setIsOpen(false);
  };

  return (
    <StyledDropdown ref={dropdownRef} isOpen={isOpen} isPending={isPending} isError={isError} isAvatar={selectedAvatar}>
      <ul>
        <p className="flex-gap" onClick={handleToggle}>
          {selectedAvatar && <img className="img-avatar" src={selectedAvatar} alt={`avatar of ${selectedItem}`} />}
          {selectedIcon && <img src={selectedIcon} alt="Icon" />}
          {selectedItem} {selectedSurname && selectedSurname}
          {!selectedItem && !selectedSurname && defaultText}
          <span>{isPending ? <LoaderMini color="var(--color-purple)" /> : isOpen ? <ArrowUp /> : <ArrowDown />}</span>
        </p>

        {isOpen && !isPending && (
          <>
            {defaultText === "აირჩიეთ თანამშრომელი" && (
              <StyledAddBtn onClick={handleToggleEmployeeModal} className="create-employee-option">
                <AddCircle /> თანამშრომლის შექმნა
              </StyledAddBtn>
            )}
            {data.length > 0 &&
              data.map((item) => (
                <li
                  className="flex-gap"
                  key={item.id}
                  onClick={() => handleSelect(item.id, item.name, item.icon, item.avatar, item.surname)}
                >
                  {item?.icon && <img src={item.icon} alt="Icon" />}
                  {item?.avatar && <img className="img-avatar" src={item.avatar} alt={`avatar of ${item.name}`} />}
                  {item.name} {item.surname}
                </li>
              ))}
          </>
        )}
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

  & > ul {
    width: 100%;

    & p {
      cursor: pointer;
      padding-left: 1.4rem;
      /* padding: 1.2rem 1.4rem; */
      position: relative;
      min-height: 4.2rem;

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
      padding: ${({ isAvatar }) => (isAvatar ? "0.5rem 1.4rem" : "1.2rem 1.4rem")};

      &:hover {
        background-color: var(--color-white-smoke);
      }
    }
  }
  .flex-gap {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .img-avatar {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    margin-right: 0.6rem;
    object-fit: cover;
  }
`;

const StyledAddBtn = styled.li`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.2rem 1.5rem !important;
  color: var(--color-purple);
`;
