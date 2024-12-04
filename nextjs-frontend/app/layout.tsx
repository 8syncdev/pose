import localFont from "next/font/local";
import "./styles/globals.css";
import "./styles/components.css";
import "./styles/utility.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import SecurityProvider from "@/components/providers/security-provider";
import { MY_INFO } from "@/constants/my-info";
import { Metadata } from "next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: `${MY_INFO.company} - ${MY_INFO.major} | Expert in ${Object.values(
    MY_INFO.techStack
  ).join(", ")}`,
  description: `${MY_INFO.name} (${MY_INFO.nickname}) - ${MY_INFO.major} at ${
    MY_INFO.company
  }. Specializing in ${Object.values(MY_INFO.techStack).join(", ")}. Contact: ${
    MY_INFO.email
  }`,
  manifest: "/manifest.json",
  keywords: [
    "technology",
    "development",
    "web",
    "mobile",
    "ai",
    MY_INFO.company,
    MY_INFO.name,
    MY_INFO.major,
  ],
  authors: [{ name: MY_INFO.name, url: MY_INFO.socials.github }],
  creator: MY_INFO.name,
  publisher: MY_INFO.company,
  robots: "index, follow",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
  openGraph: {
    type: "website",
    title: `${MY_INFO.company} - ${MY_INFO.major}`,
    description: `${MY_INFO.name} (${MY_INFO.nickname}) - ${MY_INFO.major} at ${MY_INFO.company}`,
    images: [{ url: MY_INFO.avatar }],
  },
  icons: [
    {
      url: MY_INFO.logo.src,
      sizes: "any",
      rel: "icon",
      type: "image/png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <SecurityProvider onSecurity="true">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </SecurityProvider>
      </body>
    </html>
  );
}
