import React from "react";
import styled from "styled-components";

import Calendar from "../assets/svg/calendar.svg?react";
import Employee from "../assets/svg/employee.svg?react";
import PieChart from "../assets/svg/pie-chart.svg?react";

import { useStatuses } from "../hooks/useStatuses.js";
import { useUpdateStatus } from "../hooks/useUpdateStatus.js";
import { formatDateToWeekday } from "../utils/helper.js";
import DropdownSelect from "./DropdownSelect.jsx";
import { STATUSES } from "../constants/STATUSES.js";
import { DEPARTMENTS } from "../constants/DEPARTMENTS.js";

const TaskDetails = ({ avatar, departmentName, employeeFullName, due_date, statusName, taskId }) => {
  const { statuses, isLoading, error } = useStatuses();
  const { mutate: changeStatus, isPending, error: changeStatusError } = useUpdateStatus();

  if (isLoading) return null;
  if (error || changeStatusError) return <p>{error.message || changeStatusError.message}</p>;

  const handleStatusChange = (newStatusId) => {
    const currentStatus = statuses.find((status) => status.name === statusName);

    if (currentStatus && currentStatus.id === newStatusId) {
      return;
    }

    changeStatus({
      id: taskId,
      body: { status_id: newStatusId },
    });
  };

  return (
    <Details>
      <h3>Task Details</h3>
      <ul>
        <li>
          <PieChart />
          <span>Status</span>
        </li>
        <li>
          <Employee />
          <span>Employee</span>
        </li>
        <li>
          <Calendar />
          <span>Task Due Date</span>
        </li>
      </ul>
      <ul>
        <li>
          <div>
            <DropdownSelect
              handleAction={handleStatusChange}
              data={statuses}
              defaultText={STATUSES[statusName]}
              isPending={isPending}
              type="status"
            />
          </div>
        </li>
        <StyledEmployeeLi>
          <img src={avatar} alt="Employee image" />
          <div>
            <span>{DEPARTMENTS[departmentName]}</span>
            <p>{employeeFullName}</p>
          </div>
        </StyledEmployeeLi>
        <li>
          <p>{formatDateToWeekday(due_date)}</p>
        </li>
      </ul>
    </Details>
  );
};

export default TaskDetails;

const Details = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;

  & > h3 {
    padding: 1rem 0;
    margin-bottom: 1.8rem;
    font-size: var(--font-size-big);
    font-weight: var(--font-weight-medium);
    grid-column: 1/-1;
  }
  & > ul {
    display: flex;
    justify-content: center;
    flex-direction: column;

    & > div {
    }

    & > li {
      position: relative;
      height: 7rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;

      & > span {
        color: var(--color-gray-dark);
      }

      & > p {
        color: var(--color-text-dark);
        font-size: var(--font-size-mini);
      }
    }
  }
`;

const StyledEmployeeLi = styled.li`
  & > div {
    position: relative;
    margin-left: 0.6rem;
    width: max-content;
  }

  & span {
    position: absolute;
    top: -1.5rem;
    width: max-content;
    color: var(--color-gray-dark);

    font-size: 1.1rem;
    font-weight: var(--font-weight-light);
  }
  & p {
    line-height: 150%;
    font-size: var(--font-size-mini);
    color: var(--color-text-dark);
  }
  & img {
    object-fit: cover;
    border-radius: 50%;
    width: 3.2rem;
    height: 3.2rem;
  }
`;
