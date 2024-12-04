import { HeaderUI } from "@/components/shared";
import { type ReactNode } from "react";
import BreadcrumbProvider from "@/components/providers/breadcrumb-provider";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <HeaderUI />
      <BreadcrumbProvider />
      <main className="w-full">{children}</main>
    </>
  );
}
