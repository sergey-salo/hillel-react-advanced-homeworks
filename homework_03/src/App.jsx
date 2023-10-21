import './App.css';

import React from 'react';

import { TasksDashboard } from './components';
import { useTheme } from './hooks';

function App() {
  const [isDark, setIsDark] = useTheme();

  const theme = isDark ? "dark" : "light";

  return (
    <div className={`app ${theme}`}>
      <div className="theme-gtoggle">
        <label>
          <input type="checkbox" checked={isDark} onChange={(e) => setIsDark(e.target.checked)} />
          Dark mode
        </label>
      </div>
      <TasksDashboard theme={theme} />
    </div>
  );
}

export default App;
