import React, { memo } from 'react';

import { TaskItem } from './TaskItem';

const TaskList = memo(function TaskList({ tasks, onDeleteTask }) {
  return (
    <div className="task-list">
      <h3>Tasks: </h3>
      <ul className="task-list__list">
        {tasks.map((task) => (
          <li key={task.id} className="task-list__item">
            <TaskItem task={task} onDelete={onDeleteTask} />
          </li>
        ))}
      </ul>
    </div>
  );
});

export { TaskList };
