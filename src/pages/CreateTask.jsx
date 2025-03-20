import { useEffect, useState } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import DropdownSelect from "../components/DropdownSelect.jsx";
import ModalAddEmployee from "../components/ModalAddEmployee.jsx";
import Button from "../components/ui/Button.jsx";
import Datepicker from "../components/ui/Datepicker.jsx";
import { StyledText } from "../components/ui/StyledText.jsx";
import ValidationInput from "../components/ui/ValidationInput.jsx";
import { validationTextTask } from "../constants/validationTextTask.js";
import { useDepartments } from "../hooks/useDepartments.js";
import { useEmployees } from "../hooks/useEmployees.js";
import { usePriorities } from "../hooks/usePriorities.js";
import { useStatuses } from "../hooks/useStatuses.js";
import { validationTask } from "../utils/validationTask.js";
import { useCreateTask } from "../hooks/useCreateTask.js";

const CreateTask = () => {
  const navigate = useNavigate();
  const { priorities, isLoading: isLoadingPriorities } = usePriorities();
  const { statuses, isLoading: isLoadingStatuses } = useStatuses();
  const { departments, isLoading: isLoadingDepartments } = useDepartments();
  const { employees, isLoading: isLoadingEmp, error: errorEmp } = useEmployees();
  const [isCreateEmployeeOpen, setIsCreateEmployeeOpen] = useState(false);
  const { mutate: createTask, isPending } = useCreateTask();

  const [formValues, setFormValues] = useState(() => {
    const savedFormValues = localStorage.getItem("taskFormValues");
    return savedFormValues
      ? JSON.parse(savedFormValues)
      : {
          name: "",
          description: "",
          priority: 2,
          status: 1,
          department: null,
          employee: null,
          deadline: "",
        };
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    department: "",
    employee: "",
  });

  console.log(errors);
  useEffect(() => {
    localStorage.setItem("taskFormValues", JSON.stringify(formValues));
  }, [formValues]);

  const filteredEmployees = employees?.filter((employee) => employee.department.id == formValues.department);

  const handleDropdownChange = (field) => (id) => {
    setFormValues((prevValues) => {
      const newValues = {
        ...prevValues,
        [field]: id,
        ...(field === "department" && { employee: null }),
      };
      if (field === "department" && id) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          department: "",
        }));
      }
      if (field === "employee" && id) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          employee: "",
        }));
      }
      return newValues;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: validationTask(name, value) });
  };
  const handleToggleEmployeeModal = () => setIsCreateEmployeeOpen((isOpen) => !isOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = Object.keys(formValues).reduce((acc, key) => {
      acc[key] = validationTask(key, formValues[key]);
      return acc;
    }, {});

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error && error.length > 0);
    if (!hasErrors) {
      const formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("description", formValues.description);
      formData.append("due_date", formValues.deadline);
      formData.append("status_id", formValues.status);
      formData.append("employee_id", formValues.employee);
      formData.append("priority_id", formValues.priority);

      createTask(formData, {
        onSuccess: () => {
          localStorage.removeItem("taskFormValues");
          navigate("/");
        },
        onError: (error) => {
          console.error("Error creating task:", error);
        },
      });
    }
  };

  return (
    <StyledCreteTask>
      <h1>შექმენი ახალი დავალება</h1>
      <form>
        <div>
          <StyledInputBox>
            <ValidationInput
              fieldName="სათაური"
              inputName="name"
              type="text"
              formValues={formValues}
              handleInputChange={handleInputChange}
              errors={errors}
              validationText={validationTextTask}
              includeSvgCheck={false}
              isRequired={true}
            />
          </StyledInputBox>
          <StyledInputBox isDescription={true}>
            <ValidationInput
              fieldName="აღწერა"
              inputName="description"
              type="textarea"
              formValues={formValues}
              handleInputChange={handleInputChange}
              errors={errors}
              validationText={validationTextTask}
              includeSvgCheck={false}
              isRequired={false}
            />
          </StyledInputBox>
          <DropdownWrapper>
            <div>
              <h4>პრიორიტეტი*</h4>
              <DropdownSelect
                handleAction={handleDropdownChange("priority")}
                data={priorities}
                defaultValue={formValues.priority}
                isPending={isLoadingPriorities}
              />
            </div>
            <div>
              <h4>სტატუსი*</h4>
              <DropdownSelect
                handleAction={handleDropdownChange("status")}
                data={statuses}
                defaultValue={formValues.status}
                isPending={isLoadingStatuses}
              />
            </div>
          </DropdownWrapper>
        </div>
        <div>
          <DropdownWrapper>
            <div className="colExpand">
              <h4>დეპარტამენტი*</h4>
              <DropdownSelect
                handleAction={handleDropdownChange("department")}
                data={departments}
                defaultValue={formValues.department}
                isPending={isLoadingDepartments}
                defaultText="აირჩიეთ დეპარტამენტი"
              />
            </div>
            {errors.department && <StyledText isError={true}>{errors.department}</StyledText>}
          </DropdownWrapper>
          <DropdownWrapper className="mt-sm p-sm">
            {formValues.department ? (
              <div className="colExpand">
                <h4>პასუხისმგებელი თანამშრომელი*</h4>
                <DropdownSelect
                  handleAction={handleDropdownChange("employee")}
                  data={filteredEmployees}
                  defaultValue={formValues.employee}
                  defaultText="აირჩიეთ თანამშრომელი"
                  key={formValues.department}
                  handleToggleEmployeeModal={handleToggleEmployeeModal}
                />
              </div>
            ) : null}
            {errors.employee && formValues.department && <StyledText isError={true}>{errors.employee}</StyledText>}
          </DropdownWrapper>
          <Datepicker formValues={formValues} handleInputChange={handleInputChange} />
          <div className="btnSubmit">
            <Button onClick={handleSubmit} disabled={isPending} type="submit" variant="primary">
              დავალების შექმნა
            </Button>
          </div>
        </div>
      </form>
      {isCreateEmployeeOpen ? <ModalAddEmployee handleToggleEmployeeModal={handleToggleEmployeeModal} /> : null}
    </StyledCreteTask>
  );
};

export default CreateTask;

const StyledCreteTask = styled.div`
  margin: 4rem 11.8rem 0rem;

  & > h1 {
    font-weight: var(--font-weight-semibold);
    font-size: var(--font-size-huge);
    margin-bottom: 3rem;
  }

  & input {
    height: 4.5rem;
  }

  & > form {
    display: grid;
    grid-template-columns: 55rem 55rem;
    column-gap: 16.1rem;
    height: 80.4rem;
    background-color: #fbf9ffa6;
    padding: 6.5rem 5.5rem 6.2rem;
    border-radius: 0.4rem;
    border: 0.3px solid #ddd2ff;

    & > div {
      display: flex;
      flex-direction: column;
      gap: 5.5rem;
    }
  }
  .mt-sm {
    margin-top: 2.4rem;
  }
  .btnSubmit {
    margin-top: 9.2rem;
    width: 100%;
    display: flex;
    justify-content: end;

    & > button {
      font-size: var(--font-size-small);
    }
  }
`;

const StyledInputBox = styled.div`
  & > div {
    & > h4 {
      font-size: var(--font-size-tiny);
      font-weight: var(--font-weight-regular);
      margin-bottom: 0.3rem;
    }
    & > *:nth-child(2) {
      font-weight: var(--font-weight-light);
      padding: 1.4rem;
    }
  }
`;

const DropdownWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 7.6rem;
  grid-column-gap: 3.2rem;

  & > p {
    margin-top: 5.4rem;
    padding: 0rem !important;
  }

  & > div {
    position: relative;

    & li,
    & p {
      padding: 1.4rem;
    }

    & > div {
      top: 2.4rem;
      width: 100%;
    }

    & > h4 {
      font-size: var(--font-size-tiny);
      font-weight: var(--font-weight-regular);
      color: var(--color-grayish-blue);
    }
  }

  .colExpand {
    grid-column: 1 / -1;
  }

  &.p-sm {
    & li,
    & p {
      padding: 0.5rem 1.4rem;
    }
  }
`;
