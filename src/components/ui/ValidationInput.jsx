import { InputText } from "./InputText.jsx";

import Check from "../../assets/svg/check.svg?react";
import { StyledText } from "./StyledText.jsx";
import styled from "styled-components";

const ValidationInput = ({
  fieldName,
  inputName,
  type,
  formValues,
  handleInputChange,
  errors,
  validationText,
  errorText,
}) => {
  return (
    <StyledValidationInput>
      <p>{fieldName} *</p>
      <InputText
        type={type}
        name={inputName}
        value={formValues[inputName]}
        onChange={handleInputChange}
        autoComplete="off"
      />
      <StyledText
        isError={errors[inputName] === validationText[inputName] || errors[inputName] === errorText}
        isSuccess={errors[inputName] === errorText[inputName]}
      >
        {errors[inputName] !== errorText && <span>{<Check />}</span>}
        {errors[inputName] || validationText[inputName]}
      </StyledText>
    </StyledValidationInput>
  );
};

export default ValidationInput;

const StyledValidationInput = styled.div`
  & > p:first-child {
    font-size: var(--font-size-mini);
    font-weight: var(--font-weight-medium);
    color: var(--color-grayish-blue);
  }

  & input {
    margin: 0.3rem 0 0.4rem 0;
  }
`;
