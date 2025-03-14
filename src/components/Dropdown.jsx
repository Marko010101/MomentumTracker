import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { InputCheckbox } from "./ui/InputCheckbox.jsx";
import { StyledDropdown } from "./ui/StyledDropdown.jsx";
import Button from "./ui/Button.jsx";
import { getDepartmentColor } from "../utils/helper.js";

const Dropdown = ({ data, selectionType = "multi", paramKey, onClick, onClose }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryValue = searchParams.get(paramKey);
    if (queryValue) {
      setSelectedItems(selectionType === "multi" ? queryValue.split(",") : [queryValue]);
    }
  }, [searchParams, paramKey, selectionType]);

  const handleChange = (item) => {
    setSelectedItems((prev) => {
      if (selectionType === "multi") {
        return prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item];
      } else {
        return prev[0] === item ? [] : [item];
      }
    });
  };

  const saveSelection = () => {
    const newParams = new URLSearchParams(searchParams);

    if (selectedItems.length > 0) {
      newParams.set(paramKey, selectedItems.join(","));
    } else {
      newParams.delete(paramKey);
    }

    setSearchParams(newParams);
    onClose();
  };

  return (
    <StyledDropdownCheckbox onClick={onClick} paramKey={paramKey}>
      {data?.map((item) => (
        <label key={item.id}>
          <StyledInputCheckbox
            departmentName={paramKey === "department" ? item.name : null}
            type="checkbox"
            value={item.name}
            onChange={() => handleChange(item.name)}
            checked={selectedItems.includes(item.name)}
          />
          {paramKey === "employee" ? <img src={item.avatar} alt={item.name} /> : null}
          <span>
            {item.name} {item.surname}
          </span>
        </label>
      ))}
      <StyledButton variant="primary" p="0.8rem 1.4rem" onClick={saveSelection}>
        არჩევა
      </StyledButton>
    </StyledDropdownCheckbox>
  );
};

export default Dropdown;

const StyledDropdownCheckbox = styled(StyledDropdown)`
  display: grid;

  ${(props) =>
    props.paramKey !== "department" ? "grid-template-columns: 1fr;" : "grid-template-columns: repeat(2, 1fr);"}

  grid-auto-rows: min-content;
  width: 69rem;
  max-height: 31rem;
  overflow-y: auto;
  gap: 2.2rem;

  & label {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    line-height: normal;

    & > span {
    }
  }

  & img {
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 50%;
    margin-left: 0.7rem;
    margin-right: 0.2rem;
    object-fit: cover;
  }

  & label,
  & input,
  & span {
    cursor: pointer;
  }
`;

const StyledInputCheckbox = styled(InputCheckbox)`
  ${({ departmentName }) => {
    const color = getDepartmentColor(departmentName);
    return css`
      border: 1.5px solid ${color};

      &:checked::before {
        border-color: ${color};
      }
    `;
  }}
`;

const StyledButton = styled(Button)`
  grid-column: 1 / -1;
  justify-self: end;
  margin-top: 0.3rem;
  width: 15.5rem;
  height: 3.5rem;
  border-radius: 2rem;
`;
