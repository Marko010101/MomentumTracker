import React, { useEffect } from "react";
import styled from "styled-components";
import { format, addDays } from "date-fns";

import CalendarIcon from "../../assets/svg/calendar-line.svg?react";

const Datepicker = ({ formValues, handleInputChange }) => {
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");

  useEffect(() => {
    if (!formValues.deadline) {
      handleInputChange({ target: { name: "deadline", value: tomorrow } });
    }
  }, [formValues, handleInputChange, tomorrow]);

  const handleIconClick = () => {
    const dateInput = document.getElementById("datepicker");
    if (dateInput) {
      dateInput.focus();
      dateInput.showPicker();
    }
  };

  return (
    <StyledDatepicker htmlFor="datepicker">
      <h4>დედლაინი*</h4>
      <DatePickerContainer>
        <CalendarIcon onClick={handleIconClick} />
        <input
          type="date"
          id="datepicker"
          name="deadline"
          value={formValues.deadline || tomorrow}
          onChange={handleInputChange}
          min={tomorrow}
          required
        />
      </DatePickerContainer>
    </StyledDatepicker>
  );
};

export default Datepicker;

const StyledDatepicker = styled.label`
  margin-top: 8.9rem;
  width: 31.8rem;
  margin-bottom: 1.5rem;

  & > h4 {
    font-size: var(--font-size-tiny);
    font-weight: var(--font-weight-regular);
    margin-bottom: 0.4rem;
  }
`;

const DatePickerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1.4rem;
  border: 1px solid var(--color-gray-light);
  border-radius: 5px;
  width: 31.8rem;
  height: 4.7rem;
  background-color: white;

  & svg {
    cursor: pointer;
  }

  input[type="date"] {
    border: none;
    outline: none;
    width: 100%;
    font-size: 1.4rem;
    letter-spacing: -1px;
    color: var(--color-text-dark);
    background-color: transparent;
    /* Hide the default calendar icon */
    &::-webkit-calendar-picker-indicator {
      display: none;
    }

    /* Style the date input text */
    &::-webkit-datetime-edit {
    }

    &::-webkit-datetime-edit-fields-wrapper {
    }

    &::-webkit-datetime-edit-text {
      padding: 0 0.2rem;
    }

    &::-webkit-datetime-edit-month-field,
    &::-webkit-datetime-edit-day-field,
    &::-webkit-datetime-edit-year-field {
      padding: 0 0.2rem;
    }
  }
`;
