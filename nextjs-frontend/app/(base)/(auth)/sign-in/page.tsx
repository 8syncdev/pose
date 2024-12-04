import { SignInForm } from "../components/sign-in-form";
import TabsAuth from "../components/tabs-auth";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <TabsAuth />
      </div>
    </div>
  );
}