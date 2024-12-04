'use client';

import { IconCloud } from '@/components/ui/animation/icon-cloud';

const slugs = [
  "typescript",
  "javascript", 
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws", 
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

export function IconCloudDemo() {
  return (
    <div className="card card-hover glass-effect shadow-custom border-glow max-w-md mx-auto">
      <div className="card-content">
        <div className="relative flex aspect-[3/4] w-full items-center justify-center">
          <IconCloud iconSlugs={slugs} />
        </div>
      </div>
      <div className="card-footer justify-center">
        <p className="text-gradient font-semibold text-balance">
          Công nghệ và Tools
        </p>
      </div>
    </div>
  );
}
