import { ITask } from "../../Interfaces";

interface Props {
  task: ITask;
  deleteTask(taskNameToDelete: string): void;
  toggleTask(taskNameToMark: number): void;
}

const TodoTask = ({ task, deleteTask, toggleTask }: Props) => {
  return (
    <div className="alert alert-dismissible fade show alertBox mx-auto shadow-lg task"
    role="alert">
        <input
          className='checkbox'
          type='checkbox'
          checked={task.isCompleted}
          onChange={() => toggleTask(task.id)}
        />
        <span
          className='text'
          style={{ textDecoration: task.isCompleted ? "line-through" : "" }}
        >
          {task.taskName}
        </span>
        <button
          type='button'
          className='deleteBtn'
          onClick={() => {
            deleteTask(task.taskName);
          }}
        >
          &times;
        </button>
    </div>
  );
};

export default TodoTask;
