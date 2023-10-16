import React, {
  memo,
  useRef,
} from 'react';

const TaskInput = memo(function TaskInput({ onAddTask }) {
  const inputRef = useRef(null);

  function handleSubmit() {
    const inputValue = inputRef.current.value;
    inputValue.trim().length > 4
      ? onAddTask(inputValue)
      : alert("Task title should be more than 4 symbols and should not be empty.");
    inputRef.current.value = "";
  }

  return (
    <div className="task-input">
      <input placeholder="Add task" ref={inputRef} />
      <button onClick={handleSubmit}>Add task</button>
    </div>
  );
});

export { TaskInput };
