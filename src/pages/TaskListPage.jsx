import { useState } from "react";
import styled from "styled-components";

import Filter from "../components/Filter.jsx";
import FilteredList from "../components/FilteredList.jsx";
import FiltersList from "../components/FiltersList.jsx";
import Loader from "../components/ui/Loader.jsx";
import { useTasks } from "../hooks/useTasks.js";
import Empty from "../components/ui/Empty.jsx";

const TaskListPage = () => {
  const { tasks, isLoading, error } = useTasks();
  const [taskList, setTaskList] = useState([]);

  if (isLoading) return <Loader />;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <h1>დავალებების გვერდი</h1>
      <StyledTaskListPage>
        <Filter />
        <FiltersList tasks={tasks} setTaskList={setTaskList} />
        {taskList.length ? <FilteredList taskList={taskList} /> : <Empty />}
      </StyledTaskListPage>
    </>
  );
};

export default TaskListPage;

const StyledTaskListPage = styled.div`
  margin: 5.2rem 12rem 15rem 12rem;
`;
