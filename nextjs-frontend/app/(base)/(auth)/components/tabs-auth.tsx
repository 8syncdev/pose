"use client";

import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";
import { Tabs } from "@/components/ui/common/tabs";
import dynamic from "next/dynamic";

// Define authentication tabs configuration
const AUTH_TABS = [
    {
        title: "Đăng nhập",
        value: "sign-in",
        content: <SignInForm />
    },
    {
        title: "Đăng ký",
        value: "sign-up", 
        content: <SignUpForm />
    }
];

// Main authentication tabs component
const TabsAuth = dynamic(() => Promise.resolve(function TabsAuthComponent() {
    return (
        <div className="h-screen flex flex-col no-visible-scrollbar">
            <div className="flex-1 flex flex-col h-[100dvh] max-h-screen overflow-hidden p-4">
                <Tabs
                    tabs={AUTH_TABS}
                    containerClassName="mb-4 p-1 rounded-full max-w-fit mx-auto glass-effect"
                    tabClassName="text-sm font-medium"
                    activeTabClassName="bg-[hsl(var(--primary))]"
                    contentClassName="flex-1 overflow-hidden" 
                />
            </div>
        </div>
    );
}), {
    ssr: false,
    loading: () => <div>Loading...</div>
});

export default TabsAuth;
