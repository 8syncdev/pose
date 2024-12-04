import { type ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="container mx-auto max-w-screen-2xl h-screen overflow-x-hidden overflow-y-auto">
      {children}
    </div>
  );
}
