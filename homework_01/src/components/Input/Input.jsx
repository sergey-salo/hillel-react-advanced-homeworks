import React from "react";
import "./Input.css";

const Input = ({ labelDesription, ...props }) => {
  return (
    <>
      <label htmlFor="search">{labelDesription}</label>
      <input type="text" className="searchInput" id="search" name="search" {...props} />
    </>
  );
};

export { Input };
