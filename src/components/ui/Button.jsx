import styled, { css } from "styled-components";

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  gap: 0.4rem;
  font-weight: var(--font-weight-regular);

  ${(props) =>
    props.variant === "primary" &&
    css`
      height: 4rem;
      background-color: var(--color-purple);
      color: var(--color-white);
      border: none;

      &:hover {
        background-color: var(--color-purple-soft);
      }
    `}

  ${(props) =>
    props.variant === "secondary" &&
    css`
      height: 3.9rem;
      background-color: var(--color-white);
      color: var(--color-text);
      border: 1px solid var(--color-purple);

      &:hover {
        border: 1px solid var(--color-purple-soft);
      }
    `}
`;

export default Button;
