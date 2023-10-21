import './Task.css';

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

import { isNil } from 'lodash';

import { TaskInput } from './TaskInput';
import { TaskList } from './TaskList';

let nextId = 3;
const initialList = [
  { id: 0, title: "Wash the car", isCompleted: false },
  { id: 1, title: "Clean the room", isCompleted: false },
  { id: 2, title: "Buy the foods", isCompleted: true },
];

const getInitialTasksList = () => {
  const initialData = localStorage.getItem("tasks");
  return !isNil(initialData) ? JSON.parse(initialData) : initialList;
};

const TasksDashboard = ({ theme }) => {
  const [tasks, setTasks] = useState(getInitialTasksList);

  useLayoutEffect(() => {
    const count = tasks.length;
    const title = `You have ${count} task${count === 0 || count > 1 ? "s" : ""}`;
    document.title = title;
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const memoTasks = useMemo(() => tasks, [tasks]);

  const handleAddTask = useCallback(
    (title) => {
      setTasks([
        ...tasks,
        {
          id: nextId++,
          title: title,
          done: false,
        },
      ]);
    },
    [tasks]
  );

  const handleDeleteTodo = useCallback(
    (taskId) => {
      setTasks(tasks.filter((t) => t.id !== taskId));
    },
    [tasks]
  );

  return (
    <div className={theme}>
      <TaskInput onAddTask={handleAddTask} />
      <TaskList tasks={memoTasks} onDeleteTask={handleDeleteTodo} />
    </div>
  );
};

export { TasksDashboard };
