import "./App.css";
import { Button } from "./components/Button";
import { Counter } from "./components/Counter/Counter";
import { useState } from "react";

function App() {
  const [isDisplayCounter, setIsDisplayCounter] = useState(true);

  const handleClickButton = () => setIsDisplayCounter(!isDisplayCounter);

  return (
    <div>
      <Button
        className="display-counter-btn"
        tittle={isDisplayCounter ? "Hide Counter" : "Display Counter"}
        onClick={handleClickButton}
      />
      {isDisplayCounter && <Counter />}
    </div>
  );
}

export default App;
