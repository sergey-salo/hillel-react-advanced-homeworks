import React from "react";

const Button = ({ onClick, tittle, ...props }) => {
  return (
    <button onClick={onClick} {...props}>
      {tittle}
    </button>
  );
};

export { Button };
