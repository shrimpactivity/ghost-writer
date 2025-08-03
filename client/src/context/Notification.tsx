import { createContext, PropsWithChildren, useContext, useState } from "react";

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
}

export function NotificationProvider({ children }: PropsWithChildren) {
  const [ notification, setNotification ] = useState("");

  const notify = (text: string, timeout=3000) => {
    setNotification(text);
    if (timeout) {
      setTimeout(() => setNotification(""), timeout);
    }
  }

  return (
    <NotificationContext.Provider value={{notification, notify}}>
      {children}
    </NotificationContext.Provider>
  )
}