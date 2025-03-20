import { useState } from "react";
import styled from "styled-components";

import CloseX from "../assets/svg/closeX.svg?react";
import { validationTextEmployee } from "../constants/validationTextEmployee.js";
import { useCreateEmployee } from "../hooks/useCreateEmployee.js";
import { useDepartments } from "../hooks/useDepartments.js";
import { useOutsideClick } from "../hooks/useOutsideClick.js";
import { validationEmployee } from "../utils/validationEmployee.js";
import DropdownSelect from "./DropdownSelect.jsx";
import Button from "./ui/Button.jsx";
import { ModalOverlay } from "./ui/ModalOverlay.jsx";
import { StyledText } from "./ui/StyledText.jsx";
import Upload from "./ui/Upload.jsx";
import ValidationInput from "./ui/ValidationInput.jsx";
import LoaderMini from "./ui/LoaderMini.jsx";

const ModalAddEmployee = ({ handleToggleEmployeeModal }) => {
  const { mutate: createEmployee, isPending } = useCreateEmployee();
  const { departments } = useDepartments();

  const [file, setFile] = useState(null);
  const ref = useOutsideClick(handleToggleEmployeeModal);
  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    department: null,
    avatar: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    department: "",
    avatar: "",
  });
  console.log(errors);
  const handleDepartmentSelect = (departmentId) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      department: departmentId,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      department: validationEmployee("department", departmentId),
    }));
  };

  const handleFileChange = (uploadedFile) => {
    if (uploadedFile) {
      const fileUrl = URL.createObjectURL(uploadedFile);
      setFile(fileUrl);
      setFormValues({ ...formValues, avatar: uploadedFile });
      setErrors({
        ...errors,
        avatar: validationEmployee("avatar", uploadedFile),
      });
    } else {
      setFile(null);
      setFormValues({ ...formValues, avatar: null });
      setErrors({ ...errors, avatar: "" });
    }
  };

  const handleDelete = () => {
    setFile(null);
    setFormValues({ ...formValues, avatar: null });
    setErrors({ ...errors, avatar: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: validationEmployee(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = Object.keys(formValues).reduce((acc, key) => {
      acc[key] = validationEmployee(key, formValues[key]);
      return acc;
    }, {});

    setErrors(newErrors);

    // Check if there are any validation errors
    const hasErrors = Object.values(newErrors).some((error) => error && error.length > 0);
    if (!hasErrors) {
      const formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("surname", formValues.surname);
      formData.append("department_id", formValues.department);
      if (formValues.avatar) {
        formData.append("avatar", formValues.avatar);
      }

      // Trigger the mutation with onSuccess callback
      createEmployee(formData, {
        onSuccess: () => {
          handleToggleEmployeeModal(); // Close the modal on success
        },
        onError: (error) => {
          console.error("Error creating employee:", error);
        },
      });
    }
  };

  return (
    <ModalOverlay>
      <ModalContent ref={ref}>
        <span onClick={handleToggleEmployeeModal}>
          <CloseX />
        </span>
        <h3 className="TextBolder">თანამშრომლის დამატება</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <ValidationInput
              fieldName="სახელი"
              inputName="name"
              type="text"
              formValues={formValues}
              handleInputChange={handleInputChange}
              errors={errors}
              validationText={validationTextEmployee}
            />
            <ValidationInput
              fieldName="გვარი"
              inputName="surname"
              type="text"
              formValues={formValues}
              handleInputChange={handleInputChange}
              errors={errors}
              validationText={validationTextEmployee}
            />
          </div>
          <div className="grid-col">
            <StyledLabel htmlFor="file-upload" className="TextBolder">
              ავატარი *
            </StyledLabel>
            <Upload
              value={file}
              onChange={handleFileChange}
              handleDelete={handleDelete}
              name="file-upload"
              isError={Boolean(errors.avatar)}
              setError={(error) =>
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  avatar: error,
                }))
              }
            />
            {errors.avatar && <StyledText isError={true}>{errors.avatar}</StyledText>}
          </div>
          <div>
            <DropwdownWrapper isError={errors.department}>
              <StyledLabel htmlFor="department">დეპარტამენტი *</StyledLabel>
              <DropdownSelect
                data={departments}
                defaultText="აირჩიეთ დეპარტამენტი"
                handleAction={handleDepartmentSelect}
                isError={errors.department}
              />
              {errors.department && <StyledText isError={true}>{errors.department}</StyledText>}
            </DropwdownWrapper>
          </div>
          <div>
            <Button variant="secondary" type="button" onClick={handleToggleEmployeeModal}>
              გაუქმება
            </Button>
            <Button variant="primary" type="submit" disabled={isPending}>
              {isPending ? <LoaderMini /> : "თანამშრომლის დამატება"}
            </Button>
          </div>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};
export default ModalAddEmployee;

const ModalContent = styled.div`
  position: relative;
  margin-top: 11.8rem;
  width: 91.3rem;
  height: max-content;
  padding: 11.7rem 5rem 6rem 5rem;
  border-radius: 1rem;
  background-color: var(--color-white);

  & h3 {
    font-size: var(--font-size-large);
    font-weight: var(--font-weight-medium);
    text-align: center;
    margin-bottom: 4.5rem;
    color: var(--color-text);
  }

  & form {
    display: flex;
    flex-direction: column;
    gap: 4.5rem;

    & > div:last-child {
      display: flex;
      justify-content: end;
      margin-top: -1.8rem;
    }

    & > div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 2.2rem;
    }

    .grid-col {
      grid-column: 1/-1;
      display: grid;
    }
  }

  & > span {
    position: absolute;
    top: 4rem;
    right: 5rem;
    cursor: pointer;

    & > svg:hover {
      stroke: var(--color-gray);
    }
  }
`;

const DropwdownWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 10.2rem;

  & > div {
    top: 1.9rem;
    left: 0;
    width: 38.4rem;
    max-height: 20rem;
  }
  & > p {
    margin-top: 3.9rem;
  }
`;

const StyledLabel = styled.label`
  font-size: var(--font-size-mini);
  font-weight: var(--font-weight-medium);
  color: var(--color-grayish-blue);
  line-height: normal;
  margin-bottom: 0.8rem;
  width: max-content;
  cursor: pointer;
`;
