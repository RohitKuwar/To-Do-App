import { FC, ChangeEvent, KeyboardEvent, useState } from "react";
import Header from "./components/header/Header";
import TodoTask from "./components/todotask/TodoTask";
import { ITask } from "./Interfaces";
import "./App.css";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      setTask(event.target.value);
  };

  const addTask = (): void => {
    if(task!== "") {
      const newTask = {
        taskName: task,
        id: todoList.length + 1,
        isCompleted: false,
      };
      setTodoList([...todoList, newTask]);
      setTask("");
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const toggleTask = (id: number) => {
    const updatedTodo = todoList.map((item: any) => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
    setTodoList(updatedTodo);
  };

  const deleteTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName !== taskNameToDelete;
      })
    );
  };

  return (
    <div className='App'>
      <Header />
      <div className='input-container'>
        <input
            type='text'
            placeholder='Task...'
            autoComplete="off"
            name='task'
            value={task}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className='todoList'>
        {todoList.map((task: ITask, key: number) => {
          return (
            <TodoTask
              key={key}
              task={task}
              deleteTask={deleteTask}
              toggleTask={toggleTask}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
