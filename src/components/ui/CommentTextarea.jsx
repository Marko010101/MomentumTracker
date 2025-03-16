import styled, { css } from "styled-components";

import Button from "./Button.jsx";

const CommentTextarea = ({ onSubmit, value, onChange, isPending, placeholder }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <WrapperForm onSubmit={onSubmit} isPending={isPending}>
      <StyledTextArea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        disabled={isPending}
        isPending={isPending}
      />
      <StyledButton type="submit" variant="primary" disabled={isPending}>
        {isPending ? "დაელოდეთ..." : "დააკომენტარე"}
      </StyledButton>
    </WrapperForm>
  );
};

export default CommentTextarea;

const WrapperForm = styled.form`
  position: relative;
  height: 13.5rem;
  width: 100%;
  min-height: 13.5rem;
  border: 0.3px solid var(--color-gray-muted);
  border-radius: 1rem;
  background-color: var(--color-white);

  ${({ isPending }) =>
    isPending
      ? css`
          background-color: var(--color-gray-light);
        `
      : css`
          background-color: var(--color-white);
        `}
`;

const StyledTextArea = styled.textarea`
  padding: 2.4rem 2rem 1.5rem 2rem;
  border-radius: 1rem;
  min-height: 8rem;
  width: 99%;
  color: var(--color-grayish-blue);
  font-size: var(--font-size-mini);
  resize: none;
  outline: none;
  border: none;

  &::placeholder {
    /* padding: 1rem 0; */
    color: #898989;
  }

  &:disabled {
    ${({ isPending }) =>
      isPending
        ? css`
            background-color: var(--color-gray-light);
          `
        : css`
            background-color: var(--color-white);
          `}
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  height: 3.5rem;
  bottom: 1.5rem;
  border-radius: 2rem;
  padding: 0.8rem 2rem;
  right: 2rem;
`;
