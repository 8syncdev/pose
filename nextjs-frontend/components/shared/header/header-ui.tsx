"use client";

import { useState, useRef, memo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  MenuIcon,
  X,
  BookOpen,
  Newspaper,
  Code,
  Info,
  Gift,
} from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { TimelineContent } from "@/components/ui/animation/scroll/framer-timeline";
import { Spotlight, SpotLightItem } from "@/components/ui/card/splotlight-card";
import { IconCloudCard } from "@/components/ui/card/icon-cloud-card";
import { DrawerContent, HeaderDrawer } from "@/components/ui/common/res-header";
import { Skeleton } from "@/components/ui/skeleton";
import AuthProvider from "@/components/providers/auth-provider";

// Types
interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

interface FeaturedCourse {
  id: number;
  title: string;
  className: string;
  icons: string[];
}

interface NavLinkProps {
  item: NavItem;
  onClick: () => void;
}

interface FeaturedContentProps {
  isDesktop: boolean;
}

// Constants
const NAV_ITEMS: NavItem[] = [
  { path: "/course", label: "Khóa Học", icon: BookOpen },
  // { path: '/blog', label: 'Blog', icon: Newspaper },
  { path: "/exercise", label: "Bài Tập", icon: Code },
  { path: "/info", label: "Thông Tin", icon: Info },
  { path: "/resource", label: "Học Liệu Miễn Phí", icon: Gift },
];

const FEATURED_COURSES: FeaturedCourse[] = [
  {
    id: 1,
    title: "Next.js và React Nâng Cao",
    className: "grid xl:col-span-1 col-start-1 col-end-3",
    icons: [
      "nextdotjs",
      "react",
      "typescript",
      "javascript",
      "tailwindcss",
      "redux",
      "graphql",
      "sass",
    ],
  },
  {
    id: 2,
    title: "Node.js và Express.js",
    className: "grid xl:col-span-1 col-start-3 col-end-6",
    icons: [
      "nodedotjs",
      "express",
      "postgresql",
      "prisma",
      "mongodb",
      "mysql",
      "redis",
      "docker",
    ],
  },
  {
    id: 3,
    title: "React và TypeScript",
    className:
      "xl:col-span-2 xl:row-span-2 row-start-2 row-end-3 col-start-1 col-end-6",
    icons: [
      "react",
      "typescript",
      "jest",
      "testinglibrary",
      "webpack",
      "babel",
      "eslint",
      "prettier",
      "git",
      "github",
    ],
  },
];

// Memoized Components
const NavLink = memo<NavLinkProps>(({ item, onClick }) => (
  <Link
    href={item.path}
    onClick={onClick}
    className="nav-link nav-item animate-slide relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gradient-purple-blue after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 gap-2 w-full"
  >
    <span className="icon-primary transition-transform group-hover:scale-110">
      <item.icon className="w-6 h-6" />
    </span>
    <span className="text-lg md:text-xl">{item.label}</span>
  </Link>
));

NavLink.displayName = "NavLink";

const FeaturedContent = memo<FeaturedContentProps>(({ isDesktop }) => (
  <div className="relative w-full">
    <Spotlight className="grid gap-2 grid-flow-col grid-cols-4">
      {FEATURED_COURSES.map(({ id, className, title, icons }) => (
        <SpotLightItem key={id} className={className}>
          <IconCloudCard title={title} icons={icons} aspectRatio="video" />
        </SpotLightItem>
      ))}
    </Spotlight>
    {!isDesktop && (
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[hsl(var(--background))] to-transparent pointer-events-none" />
    )}
  </div>
));

FeaturedContent.displayName = "FeaturedContent";

const HeaderComponent = () => {
  const [headerOpen, setHeaderOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleCloseHeader = () => setHeaderOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container">
        <TimelineContent animationNum={0} timelineRef={timelineRef}>
          <div className="flex justify-between items-center h-16 px-4 border rounded-lg glass-effect backdrop-blur-lg">
            <div ref={timelineRef}>
              <div className="flex items-center gap-2">
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  <h1 className="text-xl md:text-2xl font-bold text-gradient-purple-blue">
                    IT Course Hub
                  </h1>
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <AuthProvider />

              <HeaderDrawer
                open={headerOpen}
                setOpen={setHeaderOpen}
                drawerBtn={() => (
                  <Button variant="ghost" size="icon">
                    <MenuIcon className="w-6 h-6" />
                  </Button>
                )}
              >
                <DrawerContent>
                  <div className="container mx-auto max-h-[calc(100vh-2rem)] overflow-y-auto">
                    <div className="flex justify-between items-center border-b pb-4">
                      <Link
                        href="/"
                        className="text-2xl md:text-3xl font-bold text-gradient"
                      >
                        IT Course Hub
                      </Link>
                      <Button
                        onClick={handleCloseHeader}
                        variant="ghost"
                        size="icon"
                      >
                        <X className="w-6 h-6" />
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-[minmax(15rem,1fr)_auto] gap-8 py-6">
                      <nav className="flex flex-col md:flex-row gap-8">
                        <ul className="space-y-4 md:space-y-6 font-semibold">
                          {NAV_ITEMS.map((item) => (
                            <li key={item.path}>
                              <NavLink
                                item={item}
                                onClick={handleCloseHeader}
                              />
                            </li>
                          ))}
                        </ul>
                      </nav>

                      <FeaturedContent isDesktop={isDesktop} />
                    </div>
                  </div>
                </DrawerContent>
              </HeaderDrawer>
            </div>
          </div>
        </TimelineContent>
      </div>
    </header>
  );
};

// Fallback component using shadcn Skeleton
const HeaderFallback = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container ">
        <div className="flex justify-between items-center h-16 px-4 border rounded-lg glass-effect backdrop-blur-lg">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-lg" />
          </div>
        </div>
      </div>
    </header>
  );
};

// Export with dynamic import and memo for better performance
export default dynamic(() => Promise.resolve(memo(HeaderComponent)), {
  ssr: false,
  loading: () => <HeaderFallback />,
});
