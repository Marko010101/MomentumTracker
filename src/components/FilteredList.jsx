import styled from "styled-components";
import TaskCard from "./TaskCard";
import { STATUS_COLORS } from "../constants/STATUS_COLORS.js";
import { STATUSES } from "../constants/STATUSES.js";

const FilteredList = ({ taskList }) => {
  const categorizedTasks = {
    დასაწყები: taskList.filter((task) => task.status.name === "დასაწყები"),
    პროგრესში: taskList.filter((task) => task.status.name === "პროგრესში"),
    "მზად ტესტირებისთვის": taskList.filter((task) => task.status.name === "მზად ტესტირებისთვის"),
    დასრულებული: taskList.filter((task) => task.status.name === "დასრულებული"),
  };

  return (
    <StyledList>
      {Object.entries(categorizedTasks).map(([status, tasks]) => (
        <TaskColumn key={status}>
          <StyledH3 status={status}>{STATUSES[status]}</StyledH3>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} color={STATUS_COLORS[status].color} />
          ))}
        </TaskColumn>
      ))}
    </StyledList>
  );
};

export default FilteredList;

const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5.2rem;
`;

const TaskColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledH3 = styled.h3`
  background-color: ${({ status }) => STATUS_COLORS[status]?.color || "#000"};
  color: var(--color-white);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-medium);
  border-radius: 1rem;
  height: 5.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
