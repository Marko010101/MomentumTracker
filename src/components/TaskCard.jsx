import { Link } from "react-router";
import styled from "styled-components";

import defaultImage from "../assets/img/defaultAvatar.jpg";
import CommentsIcon from "../assets/svg/Comments.svg?react";

import { formatDateToMonth, getDepartmentColor, getPriorityColor, truncateString } from "../utils/helper.js";
import PriorityDepartmentBadge from "./ui/PriorityDepartmentBadge.jsx";
import { StyledBadge } from "./ui/StyledBadge.jsx";

const TaskCard = ({ task, color }) => {
  const {
    id,
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
    <StyledCardLink to={`/${id}`} color={color}>
      <CardHeader priorityColor={priorityColor} departmentColor={departmentColor}>
        <CustomStyledBadge departmentColor={departmentColor} priorityColor={priorityColor}>
          <PriorityDepartmentBadge
            priorityIcon={priorityIcon}
            priorityName={priorityName}
            departmentName={departmentName}
            isDepartmentNameFixed={true}
          />
        </CustomStyledBadge>
        <p>{formatDateToMonth(due_date)}</p>
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
    </StyledCardLink>
  );
};

export default TaskCard;

const StyledCardLink = styled(Link)`
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

  /* &:first-child div > div {
    padding: 0.4rem;
    }
    &:first-child div > span {
      padding: 0.5rem 0.9rem;
      } */

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

const CustomStyledBadge = styled(StyledBadge)`
  h4 {
    padding: 0 0.5rem;
  }
  & > div {
    padding: 0.4rem;
  }
  & > span {
    padding: 0.5rem 0.9rem;
  }
`;
