import {
  Users,
  UserCog,
  GraduationCap,
  BookOpen,
  LifeBuoy,
  Send,
  Dumbbell
} from "lucide-react"

import { MY_INFO } from "@/constants/my-info"

// Root URL
const ROOT_URL = "/dashboard"

// API Routes Configuration
const API_ROUTES = {
  users: {
    root: "users",
    paths: {
    //   list: "",
    }
  },
  roles: {
    root: "roles", 
    paths: {
      //   list: "",
      assign: "/assign",
    }
  },
  courses: {
    root: "courses",
    paths: {
      //   list: "",
      chapter: "/chapter",
      lesson: "/lesson",
    }
  },
  enrollments: {
    root: "enrollments",
    paths: {
      //   list: "",
    }
  },
  exercises: {
    root: "exercises",
    paths: {
      //   list: "",
      agent: "/agent",
    }
  }
}

// Helper function to generate menu items
const generateMenuItems = (route: any) => {
  return Object.entries(route.paths).map(([key, path]) => ({
    title: `${key.charAt(0).toUpperCase() + key.slice(1)} ${route.root.slice(0, -1)}`,
    url: `${ROOT_URL}/${route.root}${path}`,
  }))
}

// Generate sidebar data dynamically
export const generateSidebarData = () => {
  return {
    user: {
      name: MY_INFO.name,
      email: MY_INFO.email,
      avatar: MY_INFO.avatar,
    },
    navMain: [
      {
        title: "User Management",
        url: `${ROOT_URL}/${API_ROUTES.users.root}`,
        icon: Users,
        items: generateMenuItems(API_ROUTES.users),
      },
      {
        title: "Role Management",
        url: `${ROOT_URL}/${API_ROUTES.roles.root}`,
        icon: UserCog,
        items: generateMenuItems(API_ROUTES.roles),
        children: [
          {
            title: "Assign Role",
            url: `${ROOT_URL}/${API_ROUTES.roles.paths.assign}`,
          },
        ]
      },
      {
        title: "Course Management", 
        url: `${ROOT_URL}/${API_ROUTES.courses.root}`,
        icon: BookOpen,
        items: generateMenuItems(API_ROUTES.courses),
        children: [
          {
            title: "Chapter",
            url: `${ROOT_URL}/${API_ROUTES.courses.paths.chapter}`,
          },
          {
            title: "Lesson",
            url: `${ROOT_URL}/${API_ROUTES.courses.paths.lesson}`,
          }
        ]
      },
      {
        title: "Enrollment Management",
        url: `${ROOT_URL}/${API_ROUTES.enrollments.root}`,
        icon: GraduationCap,
        items: generateMenuItems(API_ROUTES.enrollments),
      },
      {
        title: "Exercise Management",
        url: `${ROOT_URL}/${API_ROUTES.exercises.root}`,
        icon: Dumbbell,
        items: generateMenuItems(API_ROUTES.exercises),
      }
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      }
    ]
  }
}

// Export the generated sidebar data
export const sidebarData = generateSidebarData()
