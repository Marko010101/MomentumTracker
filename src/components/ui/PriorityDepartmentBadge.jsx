import styled from "styled-components";
import { fixedDepartmentName } from "../../utils/helper.js";

const PriorityDepartmentBadge = ({ priorityIcon, priorityName, departmentName, isDepartmentNameFixed }) => {
  return (
    <>
      <div>
        <img src={priorityIcon} alt="Priority icon" />
        <h4>{priorityName}</h4>
      </div>
      <span>{isDepartmentNameFixed ? fixedDepartmentName(departmentName) : departmentName}</span>
    </>
  );
};

export default PriorityDepartmentBadge;
