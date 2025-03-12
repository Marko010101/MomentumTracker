import styled from "styled-components";

export const InputCheckbox = styled.input`
  min-width: 2.2rem;
  width: 2.2rem;
  height: 2.2rem;
  background-color: var(--color-white);
  border-radius: 0.6rem;
  border: 1.5px solid var(--color-purple);
  appearance: none;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0.2rem;
    left: 0.7rem;
    width: 0.6rem;
    height: 1.2rem;
    border: 0.15rem solid transparent;
    border-left: none;
    border-top: none;
    transform: rotate(45deg) scale(1);
  }

  &:checked::before {
    border-color: var(--color-purple);
  }
`;
