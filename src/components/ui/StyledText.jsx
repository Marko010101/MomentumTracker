import styled from "styled-components";

export const StyledText = styled.p`
  font-size: var(--font-size-nano);
  color: #6c757d;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-top: 0.2rem;

  /* color: ${({ isError, isSuccess }) =>
    isError ? "var(--color-red)" : isSuccess ? "var(--color-green)" : "#6C757D"}; */

  /* & span {
    width: 1.3rem;
    height: 1.1rem;
    display: flex;
    & svg {
      stroke: ${({ isError, isSuccess }) => (isError ? "red" : isSuccess ? "green" : "var(--color-text)")};
    }
  }  */
`;
