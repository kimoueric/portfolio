// ==========================================
// PORTFOLIO CONFIGURATION - MONOCHROME
// ==========================================

const portfolioConfig = {
    personal: {
        name: "Kimou N'cho Guy-Eric",
        title: "Développeur Full Stack",
        email: "contact@kimou.dev",
        location: "Côte d'Ivoire",
        bio: "Développeur Full Stack passionné par la création d'expériences web minimalistes et performantes",
    },

    social: {
        github: "https://github.com/kimou",
        twitter: "https://twitter.com/kimou",
        linkedin: "https://linkedin.com/in/kimou",
        email: "mailto:contact@kimou.dev"
    },

    skills: [
        { name: "React", icon: "./assets/icons/react.svg" },
        { name: "Next.js", icon: "./assets/icons/nextjs.svg" },
        { name: "Spring Boot", icon: "./assets/icons/spring-boot.svg" },
        { name: "Airflow", icon: "./assets/icons/airflow.png" },
        { name: "Docker", icon: "./assets/icons/docker.svg" },
        { name: "TypeScript", emoji: "⚡" },
        { name: "JavaScript", emoji: "🔥" },
        { name: "Java", emoji: "☕" }
    ],

    projects: [
        {
            id: 1,
            title: "RTSIS",
            subtitle: "Real-time Information Supervision",
            description: "Système d'ingestion critique pour le secteur bancaire. Orchestration de flux temps réel garantissant l'intégrité et la disponibilité des données.",
            image: "./assets/images/rtsis.jpg",
            tags: ["Airflow", "Python", "ETL"]
        },
        {
            id: 2,
            title: "GDI",
            subtitle: "Gestion Données Interbancaires",
            description: "Plateforme full-stack unifiant les processus de reporting réglementaire. Architecture distribuée permettant une scalabilité horizontale.",
            image: "./assets/images/gdi.jpg",
            tags: ["Next.js", "Spring", "Docker"]
        }
    ]
};
