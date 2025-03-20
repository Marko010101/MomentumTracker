import styled, { css } from "styled-components";

/* export const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 15.5rem;
`; */

export const InputText = styled(({ type, isError, ...props }) =>
  type === "textarea" ? <textarea {...props} /> : <input {...props} />
)`
  width: 100%;
  height: ${({ type }) => (type === "textarea" ? "13.3rem" : "4.2rem")};
  border-radius: 0.6rem;
  padding: 1rem;
  font-size: var(--font-size-mini);
  font-weight: var(--font-weight-regular);
  outline: none;
  border: 0.1rem solid ${({ isError }) => (isError ? "var(--color-red)" : "var(--color-gray)")};
  text-align: start;
  resize: ${({ type }) => (type === "textarea" ? "none" : "auto")};
`;
