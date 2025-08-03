import { PropsWithChildren } from "react";

export default function CenterHorizontal({ children }: PropsWithChildren) {
  return <div style={{ display: "flex", justifyContent: "center" }}>{children}</div>;
}
