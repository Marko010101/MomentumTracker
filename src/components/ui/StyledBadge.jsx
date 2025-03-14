import styled from "styled-components";

export const StyledBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & > span {
    /* padding: 0.5rem 0.9rem; */
    border-radius: 1.5rem;
    background-color: ${({ departmentColor }) => departmentColor};
    color: var(--color-white);
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    /* padding: 0.4rem; */
    border-radius: 0.4rem;
    color: ${({ priorityColor }) => priorityColor};
    border: 0.5px solid ${({ priorityColor }) => priorityColor};

    & h4 {
      font-size: inherit;
      font-weight: var(--font-weight-medium);
      line-height: 150%;
    }
  }
`;
