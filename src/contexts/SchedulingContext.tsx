import { createContext, useContext, useState, ReactNode } from "react";

interface SchedulingContextType {
  isOpen: boolean;
  openScheduler: () => void;
  closeScheduler: () => void;
}

const SchedulingContext = createContext<SchedulingContextType | undefined>(undefined);

export function SchedulingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openScheduler = () => setIsOpen(true);
  const closeScheduler = () => setIsOpen(false);

  return (
    <SchedulingContext.Provider value={{ isOpen, openScheduler, closeScheduler }}>
      {children}
    </SchedulingContext.Provider>
  );
}

export function useScheduling() {
  const context = useContext(SchedulingContext);
  if (context === undefined) {
    throw new Error("useScheduling must be used within a SchedulingProvider");
  }
  return context;
}
