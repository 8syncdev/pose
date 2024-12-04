import { MY_INFO } from "@/constants/my-info";
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${MY_INFO.company} - ${MY_INFO.major} | Expert in ${Object.values(MY_INFO.techStack).join(", ")}`,
        short_name: MY_INFO.company,
        description: `${MY_INFO.name} (${MY_INFO.nickname}) - ${MY_INFO.major} at ${MY_INFO.company}. Specializing in ${Object.values(MY_INFO.techStack).join(", ")}. Contact: ${MY_INFO.email}`,
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [
            {
                src: MY_INFO.logo.src,
                sizes: "32x32",
                type: "image/png",
                purpose: "any"
            },
            {
                src: MY_INFO.logo.src,
                sizes: "16x16",
                type: "image/png",
            },
            {
                src: MY_INFO.logo.src,
                sizes: "auto",
                type: "image/png",
            },
        ],
        scope: "/",
        orientation: "any",
        categories: ["technology", "development", "web", "mobile", "ai"],
        lang: "en",
        dir: "ltr",
        prefer_related_applications: false,
        related_applications: [],
        shortcuts: [
            {
                name: "GitHub",
                url: MY_INFO.socials.github,
                description: "View my GitHub profile"
            }
        ]
    }
}
