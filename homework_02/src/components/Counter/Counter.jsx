import React, { useEffect } from "react";
import { useState } from "react";
import "./Counter.css";
import { Button } from "../Button";
import { Input } from "../Input";
import { isNil } from "lodash";

function getLocalStorageValueOrDefault(key, defaultValue) {
  const value = localStorage.getItem(key);
  return !isNil(value) ? value : defaultValue;
}

function setLocalStorageItem(key, value) {
  localStorage.setItem(key, value);
}

const Counter = () => {
  const [counter, setCounter] = useState(() => +getLocalStorageValueOrDefault("counter", 0));
  const [minValue, setMinValue] = useState(() => +getLocalStorageValueOrDefault("minValue", 0));
  const [maxValue, setMaxValue] = useState(() => +getLocalStorageValueOrDefault("maxValue", 50));
  const [isDecreaseVisible, setIsDecreaseVisible] = useState(() =>
    Boolean(getLocalStorageValueOrDefault("isDecreaseVisible", false))
  );
  const [isIncreaseVisible, setIsIncreaseVisible] = useState(() =>
    Boolean(getLocalStorageValueOrDefault("isIncreaseVisible", true))
  );

  useEffect(() => {
    counter <= minValue ? setIsDecreaseVisible(false) : setIsDecreaseVisible(true);
    counter >= maxValue ? setIsIncreaseVisible(false) : setIsIncreaseVisible(true);

    setLocalStorageItem("counter", counter);
    setLocalStorageItem("minValue", minValue);
    setLocalStorageItem("maxValue", maxValue);
  }, [counter, minValue, maxValue]);

  useEffect(() => {
    setLocalStorageItem("isDecreaseVisible", isDecreaseVisible);
  }, [isDecreaseVisible]);

  useEffect(() => {
    setLocalStorageItem("isIncreaseVisible", isIncreaseVisible);
  }, [isIncreaseVisible]);

  const handleClickIncrease = () => setCounter(counter + 1);
  const handleClickDecrease = () => setCounter(counter - 1);

  const handleChangeMinValue = (e) => setMinValue(e.target.value);
  const handleChangeMaxValue = (e) => setMaxValue(e.target.value);

  return (
    <div className="counter">
      <h3 className="counter-header">Counter</h3>

      <div className="counter-display">
        <Button tittle="-" onClick={handleClickDecrease} disabled={!isDecreaseVisible} />
        <span className="display">{counter}</span>
        <Button tittle="+" onClick={handleClickIncrease} disabled={!isIncreaseVisible} />
      </div>

      <div className="counter-toggles">
        <div>
          <Input
            inputId="minInput"
            labelDesription="Min value:"
            min="0"
            name="min value"
            value={minValue}
            onChange={handleChangeMinValue}
          />
        </div>
        <div>
          <Input
            inputId="maxInput"
            labelDesription="Max value:"
            min="0"
            name="max value"
            value={maxValue}
            onChange={handleChangeMaxValue}
          />
        </div>
      </div>
    </div>
  );
};

export { Counter };
