import { PropsWithChildren } from "react";
import { NotificationProvider } from "./Notification";
import { GhostsProvider } from "./Ghosts";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <NotificationProvider>
      <GhostsProvider>{children}</GhostsProvider>
    </NotificationProvider>
  );
}
