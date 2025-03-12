import { useState } from "react";
import styled from "styled-components";

import Filter from "../components/Filter.jsx";
import FiltersList from "../components/FiltersList.jsx";
import { useTasks } from "../hooks/useTasks.js";
import Loader from "../components/ui/Loader.jsx";
import FilteredList from "../components/FilteredList.jsx";

const TaskListPage = () => {
  const { tasks, isLoading, error } = useTasks();
  const [taskList, setTaskList] = useState([]);
  console.log(taskList);
  if (isLoading) return <Loader />;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <h1>დავალებების გვერდი</h1>
      <StyledTaskListPage>
        <Filter />
        <FiltersList tasks={tasks} setTaskList={setTaskList} />
        <FilteredList taskList={taskList} />
      </StyledTaskListPage>
    </>
  );
};

export default TaskListPage;

const StyledTaskListPage = styled.div`
  margin: 5.2rem 12rem 15rem 12rem;
`;
