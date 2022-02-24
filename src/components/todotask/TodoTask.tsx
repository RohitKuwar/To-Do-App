import { ITask } from "../../Interfaces";
import styles from './todotask.module.css';

interface Props {
  task: ITask;
  deleteTask(taskNameToDelete: string): void;
  toggleTask(taskNameToMark: number): void;
}

const TodoTask = ({ task, deleteTask, toggleTask }: Props) => {
  return (
    <div className={styles.taskContainer}>
      <div className={styles.task}>
        <input
          className={styles.checkbox}
          type='checkbox'
          checked={task.isCompleted}
          onChange={() => toggleTask(task.id)}
        />
        <span
          className={styles.text}
          style={{ textDecoration: task.isCompleted ? "line-through" : "" }}
        >
          {task.taskName}
        </span>
        <button
          className={styles.deleteBtn}
          onClick={() => {
            deleteTask(task.taskName);
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default TodoTask;
