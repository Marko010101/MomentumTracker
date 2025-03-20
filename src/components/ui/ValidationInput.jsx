import { InputText } from "./InputText.jsx";

import Check from "../../assets/svg/check.svg?react";
import { StyledText } from "./StyledText.jsx";
import styled from "styled-components";
import { useState } from "react";

const ValidationInput = ({
  fieldName,
  inputName,
  type,
  formValues,
  handleInputChange,
  errors,
  validationText,
  includeSvgCheck = true,
  isRequired = true,
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const validationMessages = validationText[inputName];

  const handleChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Zა-ჰ\s]/g, "");

    setIsTouched(true);
    handleInputChange({ target: { name: e.target.name, value: value } });
  };

  return (
    <StyledValidationInput>
      <h4>
        {fieldName}
        {isRequired ? "*" : null}
      </h4>
      <InputText
        type={type}
        name={inputName}
        value={formValues[inputName]}
        isError={errors[inputName]}
        onChange={handleChange}
        onBlur={() => setIsTouched(true)}
        autoComplete="off"
      />
      {validationMessages && Array.isArray(validationMessages) ? (
        validationMessages.map((message, index) => {
          const isMessageError = errors[inputName] === message;
          const shouldValidate = isTouched || errors[inputName];

          return (
            <StyledText
              key={index}
              isError={shouldValidate && isMessageError}
              isSuccess={shouldValidate && !isMessageError}
            >
              {inputName === "description" && formValues[inputName].length < 1 ? null : (
                <>
                  {includeSvgCheck && (
                    <span>
                      <Check />
                    </span>
                  )}
                  {message}
                </>
              )}
            </StyledText>
          );
        })
      ) : (
        <StyledText isError={!!errors[inputName]} isSuccess={!errors[inputName]}>
          <span>{<Check />}</span>
          {validationMessages}
        </StyledText>
      )}
    </StyledValidationInput>
  );
};

export default ValidationInput;

const StyledValidationInput = styled.div`
  & > h4 {
    font-size: var(--font-size-mini);
    font-weight: var(--font-weight-medium);
    color: var(--color-grayish-blue);
  }

  & input {
    margin: 0.3rem 0 0.4rem 0;
  }
`;
