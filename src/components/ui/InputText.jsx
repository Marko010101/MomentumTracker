import styled from "styled-components";

/* export const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 15.5rem;
`; */

export const InputText = styled.input`
  width: 100%;
  height: 4.2rem;
  border-radius: 0.6rem;

  padding: 1rem;
  font-size: var(--font-size-mini);
  font-weight: var(--font-weight-regular);
  outline: none;

  border: 0.1rem solid ${({ isError }) => (isError ? "var(--color-red)" : "var(--color-gray)")};
`;
