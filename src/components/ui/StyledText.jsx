import styled from "styled-components";

export const StyledText = styled.p`
  font-size: var(--font-size-nano);
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-top: 0.2rem;

  color: ${({ isError, isSuccess }) => (isError ? "var(--color-red)" : isSuccess ? "var(--color-green)" : "#6C757D")};

  & span {
    width: 1.6rem;
    height: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    & svg {
      stroke: ${({ isError, isSuccess }) =>
        isError ? "var(--color-red)" : isSuccess ? "var(--color-green)" : "#6C757D"};
    }
  }
`;
