import { useState, useEffect } from "react";

const useTheme = () => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("isDark") === "true");

  useEffect(() => localStorage.setItem("isDark", isDark), [isDark]);

  return [isDark, setIsDark];
};

export { useTheme };
