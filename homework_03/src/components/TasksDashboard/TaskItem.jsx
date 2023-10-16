import React from 'react';

const TaskItem = ({ task, onDelete }) => {
  return (
    <label>
      {task.title} <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
};

export { TaskItem };
