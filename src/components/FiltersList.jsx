import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import X from "../assets/svg/x.svg?react";
import { useEffect } from "react";

const FiltersList = ({ tasks, setTaskList }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const departmentQuery = searchParams.get("department");
  const priorityQuery = searchParams.get("priority");
  const employeeQuery = searchParams.get("employee");

  const selectedDepartments = departmentQuery ? departmentQuery.split(",") : [];
  const selectedPriorities = priorityQuery ? priorityQuery.split(",") : [];
  const selectedEmployee = employeeQuery ? [employeeQuery] : [];
  useEffect(() => {
    const filteredTasks = tasks.filter((task) => {
      const matchesDepartment = selectedDepartments.length ? selectedDepartments.includes(task.department.name) : true;

      const matchesPriority = selectedPriorities.length ? selectedPriorities.includes(task.priority.name) : true;

      const matchesEmployee = selectedEmployee.length ? selectedEmployee.includes(task.employee.name) : true;
      return matchesDepartment && matchesPriority && matchesEmployee;
    });

    setTaskList(filteredTasks);
  }, [selectedDepartments.length, selectedPriorities.length, selectedEmployee.length, selectedEmployee[0]]);

  const isAnyFilter =
    Boolean(selectedDepartments.length) || Boolean(selectedPriorities.length) || Boolean(selectedEmployee.length);

  const handleClearItem = (item, paramKey) => {
    const list = searchParams.get(paramKey)?.split(",") || [];
    const updatedList = list.filter((r) => r !== item);
    if (updatedList.length) {
      searchParams.set(paramKey, updatedList.join(","));
    } else {
      searchParams.delete(paramKey);
    }
    setSearchParams(searchParams);
  };

  const handleClearFilter = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <>
      <StyledFilteredQueries>
        {selectedDepartments?.map((department) => (
          <p key={department}>
            {department}
            <span onClick={() => handleClearItem(department, "department")}>
              <X />
            </span>
          </p>
        ))}
        {selectedPriorities?.map((priority) => (
          <p key={priority}>
            {priority}
            <span onClick={() => handleClearItem(priority, "priority")}>
              <X />
            </span>
          </p>
        ))}
        {selectedEmployee?.map((employee) => (
          <p key={employee}>
            {employee}
            <span onClick={() => handleClearItem(employee, "employee")}>
              <X />
            </span>
          </p>
        ))}

        {isAnyFilter && <span onClick={handleClearFilter}>გასუფთავება</span>}
      </StyledFilteredQueries>
    </>
  );
};

export default FiltersList;

const StyledFilteredQueries = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  max-width: 100%;
  flex-wrap: wrap;
  margin-top: 2.5rem;
  min-height: 2.9rem;
  gap: 0.8rem;
  font-size: var(--font-size-mini);

  & p {
    display: flex;
    align-items: center;
    width: max-content;
    gap: 0.4rem;
    border: 0.1rem solid var(--color-gray);
    border-radius: 4.3rem;
    padding: 0.6rem 1rem;
    color: var(--color-midnight-blue);
    & > span {
      display: flex;
      align-items: center;
      cursor: pointer;
      width: 1.4rem;
      height: 1.4rem;
      stroke: var(--color-charcoal-navy);

      &:hover svg {
        /* stroke: var(--color-text); */
      }
    }
  }

  & > span {
    margin-left: 0.8rem;
    cursor: pointer;
  }
`;

/* const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 3.2rem 0rem 15rem 0rem;

  & > h3 {
    width: max-content;
    font-size: var(--font-size-big);
    font-weight: var(--font-weight-regular);
    margin-top: 3.3rem;
    text-align: center;
  }

  @media screen and (max-width: 1600px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    row-gap: 2rem;
  }
`;
 */
