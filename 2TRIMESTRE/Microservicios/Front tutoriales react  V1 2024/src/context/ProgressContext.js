import React, { createContext, useState } from "react";

export const ProgressContext = createContext();

// children representa los componentes hijos que estarán dentro del ProgressProvider,
//  es decir, los que podrán acceder al contexto.
export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);

  // permite que cualquier componente dentro del ProgressProvider 
  // acceda a progress y pueda modificarlo con setProgress.
  return (
    <ProgressContext.Provider 
    value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};
