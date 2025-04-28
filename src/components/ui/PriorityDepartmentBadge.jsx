import styled from "styled-components";
import { fixedDepartmentName } from "../../utils/helper.js";
import { PRIORITY } from "../../constants/PRIORITY.js";
import { DEPARTMENTS } from "../../constants/DEPARTMENTS.js";

const PriorityDepartmentBadge = ({ priorityIcon, priorityName, departmentName, isDepartmentNameFixed }) => {
  return (
    <>
      <div>
        <img src={priorityIcon} alt="Priority icon" />
        <h4>{PRIORITY[priorityName]}</h4>
      </div>
      <span>{isDepartmentNameFixed ? fixedDepartmentName(DEPARTMENTS[departmentName]) : departmentName}</span>
    </>
  );
};

export default PriorityDepartmentBadge;
