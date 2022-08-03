import { FC, ChangeEvent, KeyboardEvent, useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { ITask } from "./Interfaces";
import "./App.css";

const LOCAL_STORAGE_KEY: string = "TODOS_KEY";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<ITask[]>([]);

  useEffect(() => {
    const storedTodos = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"
    );
    if (storedTodos) setTodoList(storedTodos);
  }, []);

  // saving the todos in browser storage to prevent loss of todos on refreshing tab
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  };

  const addTask = (): void => {
    if (task !== "") {
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

  const updateTask = (taskNameToUpdate: string): void => {
    let [updatedTask] = 
      todoList.filter((task) => {
        return task.taskName === taskNameToUpdate;
      })
    setTask(updatedTask.taskName);
    deleteTask(taskNameToUpdate);
  };

  const clearList = () => {
    setTodoList([]);
  };

  return (
    <Container className='mt-3 p-3 '>
      <h2 className=' p-3 text-center header-color text-white shadow-lg '>
        <i className='fa-solid fa-list-check'></i> {' '}
        To-Do-List App
      </h2>
      <Row className='p-2 mt-3 mx-auto'>
        <Col
          xs={12}
          sm={12}
          md={8}
          className='p-3 d-flex justify-content-center'
        >
          <input
            className='input shadow form-control d-flex justify-content-center'
            type='text'
            placeholder='Add task...'
            autoComplete='off'
            name='task'
            value={task}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
        </Col>
        <Col
          xs={12}
          sm={12}
          md={4}
          className='p-3 d-flex justify-content-center'
        >
          <Button
            className='addBtn btn-lg shadow w-75'
            variant='outline-warning'
            onClick={addTask}
          >
            Add Task
          </Button>
        </Col>
      </Row>
      <div className='p-3 container justify-content-center'>
        {todoList.map((task) => {
          return (
            <div
              className='alert alert-dismissible fade show alertBox mx-auto shadow-lg task'
              role='alert'
            >
              <input
                className='checkbox'
                type='checkbox'
                checked={task.isCompleted}
                onChange={() => toggleTask(task.id)}
              />
              <span
                className='text'
                style={{
                  textDecoration: task.isCompleted ? "line-through" : "",
                }}
              >
                {task.taskName}
              </span>
              <i className="fa-solid fa-pen-to-square deleteBtn" onClick={() => updateTask(task.taskName)}></i>
              <i className="fa-solid fa-trash deleteBtn" onClick={() => deleteTask(task.taskName)}></i>
            </div>
          );
        })}
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className='p-3 d-flex justify-content-center'
        >
          {todoList.length > 1 ? (
            <Button
              className='clearBtn btn-md shadow w-50'
              variant='outline-primary'
              onClick={clearList}
            >
              Clear List
            </Button>
          ) : null}
        </Col>
      </div>
    </Container>
  );
};

export default App;
