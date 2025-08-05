import { createContext, PropsWithChildren, useContext, useRef, useState } from "react";

interface NotificationContextType {
  notification: string;
  notify: (text: string, timeout?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
}

export function NotificationProvider({ children }: PropsWithChildren) {
  const [ notification, setNotification ] = useState("");
  const timeoutRef = useRef<number>(undefined)

  const notify = (text: string, duration?: number) => {
    setNotification(text);
    if (duration) {
      const newTimeout = window.setTimeout(() => setNotification(""), duration);
      if (timeoutRef) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = newTimeout;
    }
  }

  return (
    <NotificationContext.Provider value={{notification, notify}}>
      {children}
    </NotificationContext.Provider>
  )
}