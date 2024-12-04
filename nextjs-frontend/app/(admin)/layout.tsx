import { redirect } from "next/navigation";
import { getUserByToken } from "@/lib/actions/auth/auth.action";
import { getUserRoles } from "@/lib/actions/user/user.action";
import { getCookieToken } from "@/lib/cookie";
import { GetUserDataFromTokenDto } from "@/lib/actions/auth/auth.dto";
import { SidebarLayout } from "./providers/sidebar-provider";
import { DockProvider } from "@/components/providers/dock-provider";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getCookieToken();

  if (!token) {
    redirect("/");
  }

  const response = await getUserByToken();

  if (!response.success || !response.result) {
    redirect("/");
  }

  const userData = (response.result as GetUserDataFromTokenDto).user;
  if (!userData.userID) {
    redirect("/");
  }
  const rolesResponse = await getUserRoles(Number(userData.userID));

  if (!rolesResponse.success || !rolesResponse.result) {
    redirect("/");
  }

  const roles = Array.isArray(rolesResponse.result)
    ? rolesResponse.result
    : [rolesResponse.result];

  const isAdmin = roles.some((role) => role.name === "admin");

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <main className="">
      <SidebarLayout>
        <DockProvider>{children}</DockProvider>
      </SidebarLayout>
    </main>
  );
}
