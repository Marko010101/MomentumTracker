import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useTask } from "../hooks/useTask.js";
import Loader from "../components/ui/Loader.jsx";
import PriorityDepartmentBadge from "../components/ui/PriorityDepartmentBadge.jsx";
import { formatDateToWeekday, getDepartmentColor, getPriorityColor } from "../utils/helper.js";
import { StyledBadge } from "../components/ui/StyledBadge.jsx";
import TaskDetails from "../components/TaskDetails.jsx";
import CommentsSection from "../components/CommentsSection.jsx";

const TaskPage = () => {
  const { taskId } = useParams();
  const { task, isLoading, error } = useTask(taskId);
  if (isLoading) return <Loader />;
  if (error) return <p>{error.message}</p>;
  const {
    description,
    due_date,
    id,
    name,
    employee: {
      name: employeeName,
      surname: employeeSurname,
      avatar,
      department: { id: departmentId, name: departmentName },
    },
    priority: { icon, id: priorityId, name: priorityName },
    status: { id: statusId, name: statusName },
  } = task;

  const employeeFullName = `${employeeName} ${employeeSurname}`;

  const priorityColor = getPriorityColor(priorityName);
  const departmentColor = getDepartmentColor(departmentName);

  return (
    <StyledTaskPage>
      <TaskDetailsBox>
        <div>
          <CustomStyledBadge priorityColor={priorityColor} departmentColor={departmentColor}>
            <PriorityDepartmentBadge
              priorityIcon={icon}
              priorityName={priorityName}
              departmentName={departmentName}
              isDepartmentNameFixed={false}
            />
          </CustomStyledBadge>
          <h1>{name}</h1>
          <h2>{description}</h2>
        </div>
        <TaskDetails
          avatar={avatar}
          departmentName={departmentName}
          employeeFullName={employeeFullName}
          due_date={due_date}
          statusName={statusName}
          taskId={taskId}
        />
      </TaskDetailsBox>
      <CommentsSection taskId={taskId} />
    </StyledTaskPage>
  );
};

export default TaskPage;

const StyledTaskPage = styled.section`
  margin: 4rem 12rem 15rem;
  display: grid;
  grid-template-columns: 71.5rem 74.1rem;
  justify-content: space-between;
  /* gap: 22.3rem; */
`;

const TaskDetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6.3rem;

  & > div > h1 {
    margin-top: 1.2rem;
    line-height: normal;
    font-family: "Inter";
    font-size: var(--font-size-huge);
    font-weight: var(--font-weight-semibold);
  }
  & > div > h2 {
    margin-top: 2.6rem;
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-regular);
    line-height: 150%;
  }
`;

const CustomStyledBadge = styled(StyledBadge)`
  padding-top: 1rem;
  gap: 1.8rem;
  & > div {
    padding: 0.4rem 0.5rem;
  }
  & > span {
    padding: 0.5rem 1rem;
  }
`;
