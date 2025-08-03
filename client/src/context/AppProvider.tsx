import { PropsWithChildren } from "react";
import { NotificationProvider } from "./Notification";

export function AppProvider({ children}: PropsWithChildren) {
  return (
    <NotificationProvider>
      {children}
    </NotificationProvider>
  )
}