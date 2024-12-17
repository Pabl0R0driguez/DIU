import HeaderComponents from "../components/HeaderComponents"
import TaskCard from "../components/TaskCard";

function TasksPage() {
  const {tasks} = useContext(TasksContext);

  const taskCards = tasks.map((task) => (
    <li key={task.id}>
      <TaskCard task={task}></TaskCard>
    </li>
  ));
  return (
    <>
    <HeaderComponents></HeaderComponents>
    <section id="tasks-page">
        <h2 className="title">Tasks</h2>
        <ul className="task-list">{taskCards}</ul>

    </section>
    
    
    </>
  )
}

export default TasksPage;
