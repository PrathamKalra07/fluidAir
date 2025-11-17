import React, { createContext, useState, useContext, ReactNode } from 'react';

type Tab = 'profile' | 'orders' | 'service' | 'contact';

type NavContextType = {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
};

const NavigationContext = createContext<NavContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  return (
    <NavigationContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationTab = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigationTab must be used within NavigationProvider');
  return context;
};
