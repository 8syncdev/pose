import { DockProvider } from "@/components/providers/dock-provider";
import { type ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="container">
      <DockProvider>{children}</DockProvider>
    </div>
  );
}
