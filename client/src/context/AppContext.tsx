import React, { createContext, useEffect, useMemo, useState, ReactNode } from 'react';

interface MyContextType {
  showNotification: boolean;
  setShowNotification: (value: boolean) => void;
}

export const MyContext = createContext<MyContextType | undefined>(undefined);

interface AppContextProps {
  children: ReactNode;
}

const AppContext: React.FC<AppContextProps> = ({ children }) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(!showNotification);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showNotification]);

  const value = useMemo(() => ({ showNotification, setShowNotification }), [showNotification]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default AppContext;
