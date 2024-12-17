function TaskCard({task }) {
  return (
    <article class = "task-card">

        {/* task.title , para que me muestre el titulo */}
        <input type="card-title" value={task.title} />
        {/* task.complete , para que me muestre el estado del checkbox */}
        <input type="checkbox" checked={task.completed} /> 
        
    </article>
  )
}

export default TaskCard