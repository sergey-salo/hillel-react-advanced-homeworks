import React from "react";

const Input = ({ inputId, labelDesription, ...props }) => {
  return (
    <>
      <label htmlFor={inputId}>{labelDesription}</label>
      <input type="number" id={inputId} {...props} />
    </>
  );
};

export { Input };
