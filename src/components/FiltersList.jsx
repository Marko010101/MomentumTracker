import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { useEffect, useMemo } from "react";
import X from "../assets/svg/x.svg?react";

const FiltersList = ({ tasks, setTaskList }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedDepartments = useMemo(() => searchParams.get("department")?.split(",") || [], [searchParams]);
  const selectedPriorities = useMemo(() => searchParams.get("priority")?.split(",") || [], [searchParams]);
  const selectedEmployee = useMemo(
    () => (searchParams.get("employee") ? [searchParams.get("employee")] : []),
    [searchParams]
  );

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => {
      const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.includes(task.department.name);

      const matchesPriority = selectedPriorities.length === 0 || selectedPriorities.includes(task.priority.name);

      const matchesEmployee = selectedEmployee.length === 0 || selectedEmployee.includes(task.employee.name);

      return matchesDepartment && matchesPriority && matchesEmployee;
    });

    setTaskList(filteredTasks);
  }, [selectedDepartments, selectedPriorities, selectedEmployee, tasks, setTaskList]);

  const isAnyFilter = selectedDepartments.length > 0 || selectedPriorities.length > 0 || selectedEmployee.length > 0;

  const handleClearItem = (item, paramKey) => {
    const list = searchParams.get(paramKey)?.split(",") || [];
    const updatedList = list.filter((r) => r !== item);
    if (updatedList.length) {
      searchParams.set(paramKey, updatedList.join(","));
    } else {
      searchParams.delete(paramKey);
    }
    setSearchParams(new URLSearchParams(searchParams));
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
  margin-bottom: 2.4rem;
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
