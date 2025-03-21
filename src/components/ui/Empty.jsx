import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";

const Empty = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const hasFilters = searchParams.has("department") || searchParams.has("priority") || searchParams.has("employee");

  return (
    <Container>
      <Heading>No Tasks Found</Heading>
      <Text>
        {hasFilters
          ? "No tasks match your current filters. Try adjusting the filters or "
          : "It looks like your task list is empty. "}
        <span onClick={() => navigate("/task/create")}>
          add a new task <Arrow>&#x2192;</Arrow>
        </span>
      </Text>
    </Container>
  );
};

const moveArrow = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
`;
export default Empty;
const Container = styled.div`
  border-top: 1px solid var(--color-gray-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`;

const Heading = styled.h3`
  font-size: var(--font-size-big);
  font-weight: var(--font-weight-semibold);
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: var(--font-size-tiny);
  color: var(--color-gray-dark);
  & > span {
    font-size: var(--font-size-small);
    background-color: var(--color-purple);
    color: var(--color-white);
    padding: 0.5rem 1rem;
    border-radius: 1.5rem;
    cursor: pointer;
    width: max-content;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      background-color: var(--color-purple-soft);
    }
  }
`;

const Arrow = styled.span`
  display: inline-block;
  animation: ${moveArrow} 1s infinite;
`;
