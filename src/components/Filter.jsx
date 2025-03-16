import { useState } from "react";
import styled from "styled-components";

import { useDepartments } from "../hooks/useDepartments.js";
import { usePriorities } from "../hooks/usePriorities.js";
import { useEmployees } from "../hooks/useEmployees.js";
import FilterListItem from "./FilterListItem.jsx";
import Loader from "./ui/Loader.jsx";

const Filter = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { departments, isLoading: isLoadingDep, error: errorDep } = useDepartments();
  const { priorities, isLoading: isLoadingPriorities, error: errorPriorities } = usePriorities();
  const { employees, isLoading: isLoadingEmp, error: errorEmp } = useEmployees();
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const handleClose = () => {
    setOpenIndex(null);
  };

  if (isLoadingDep || isLoadingPriorities || isLoadingEmp) {
    return <Loader />;
  }
  if (errorDep || errorPriorities || errorEmp) {
    return <p>{errorDep?.message || errorPriorities?.message || errorEmp?.message || "An error occurred."}</p>;
  }
  return (
    <StyledUl>
      <FilterListItem
        isOpen={openIndex === 0}
        onToggle={() => handleToggle(0)}
        onClose={handleClose}
        data={departments}
        selectionType="multi"
        paramKey="department"
      >
        დეპარტამენტი
      </FilterListItem>
      <FilterListItem
        isOpen={openIndex === 1}
        onToggle={() => handleToggle(1)}
        onClose={handleClose}
        data={priorities}
        selectionType="multi"
        paramKey="priority"
      >
        პრიორიტეტი
      </FilterListItem>
      <FilterListItem
        isOpen={openIndex === 2}
        onToggle={() => handleToggle(2)}
        onClose={handleClose}
        data={employees}
        paramKey="employee"
        selectionType="single"
      >
        თანამშრომელი
      </FilterListItem>
    </StyledUl>
  );
};

export default Filter;

const StyledUl = styled.ul`
  display: flex;
  border: 0.1rem solid var(--color-gray-light);
  border-radius: 1rem;
  gap: 4.5rem;
  width: max-content;
`;
