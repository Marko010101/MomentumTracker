import styled from "styled-components";

import CommentsIcon from "../assets/svg/Comments.svg?react";
import defaultImage from "../assets/svg/defaultAvatar.jpg";

import {
  fixedDepartmentName,
  formatDate,
  getDepartmentColor,
  getPriorityColor,
  truncateString,
} from "../utils/helper.js";

const TaskCard = ({ task, color }) => {
  const {
    name,
    description,
    due_date,
    total_comments,
    priority: { icon: priorityIcon, name: priorityName },
    department: { name: departmentName, id: departmentId },
    employee: { name: employeeName, surname: employeeSurname, avatar: employeeAvatar },
  } = task;
  const priorityColor = getPriorityColor(priorityName);
  const departmentColor = getDepartmentColor(departmentName);

  const avatar = employeeAvatar || defaultImage;

  return (
    <StyledCard color={color}>
      <CardHeader priorityColor={priorityColor} departmentColor={departmentColor}>
        <div>
          <div>
            <img src={priorityIcon} alt="Priority icon" />
            <h4>{priorityName}</h4>
          </div>
          <span>{fixedDepartmentName(departmentName)}</span>
        </div>
        <p>{formatDate(due_date)}</p>
      </CardHeader>
      <div>
        <StyledText>
          <h3>{name}</h3>
          <p>{truncateString(description)}</p>
        </StyledText>
        <CardFooter>
          <img src={avatar} alt="" />
          <p>
            <CommentsIcon />

            {total_comments}
          </p>
        </CardFooter>
      </div>
    </StyledCard>
  );
};

export default TaskCard;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  border: 1px solid ${({ color }) => color};
  border-radius: 1.5rem;
  padding: 2rem;
  width: 100%;
  min-width: 38.1rem;
  min-height: 21.7rem;
  box-sizing: border-box;
  position: relative;

  & > div:nth-child(2) {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &:hover {
    cursor: pointer;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid transparent;
    border-radius: 1.35rem;
    transition: border-width 0.6s ease, border-color 0.6s ease;
  }

  &:hover::before {
    border-width: 0.2rem;
    border-color: ${({ color }) => color};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-micro);

  & > div {
    display: flex;
    align-items: center;
    gap: 1rem;

    & > span {
      padding: 0.5rem 0.9rem;
      border-radius: 1.5rem;
      background-color: ${({ departmentColor }) => departmentColor};
      color: var(--color-white);
    }

    & > div {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.4rem;
      border-radius: 0.4rem;
      color: ${({ priorityColor }) => priorityColor};
      border: 0.5px solid ${({ priorityColor }) => priorityColor};

      & h4 {
        font-size: inherit;
        font-weight: var(--font-weight-medium);
        line-height: 150%;
      }
    }
  }

  & > p {
  }
`;
const StyledText = styled.div`
  padding: 0 1.05rem;
  margin-top: 2.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  & h3 {
    font-size: var(--font-size-medium-small);
    font-weight: var(--font-weight-medium);
  }
  & p {
    font-size: var(--font-size-mini);
    color: var(--color-grayish-blue);
  }
`;
const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  /* margin-top: 2.8rem; */

  & > img {
    width: 3.1rem;
    height: 3.1rem;
    border-radius: 50%;
    object-fit: cover;
  }

  & > p {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    font-size: var(--font-size-mini);
  }
`;
