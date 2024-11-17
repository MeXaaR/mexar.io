import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "mexar.io - Bundle of free tools for developers and designers",
        short_name: "mexar.io",
        description:
            "Discover these useful tools for developers and designers. Free tools for everyone. Forever",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        orientation: "portrait",
        scope: "/",
        lang: "en",
        categories: ["developer tools", "utilities", "productivity"],
        icons: [
            {
                src: "/images/logo_dark.png",
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/images/logo_dark.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/images/logo_dark.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/images/logo_dark.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            },
        ],
        screenshots: [
            {
                src: "/images/screenshot.png",
                sizes: "1170x2532",
                type: "image/png",
            },
        ],
        shortcuts: [
            {
                name: 'Dev Tools',
                short_name: 'Dev Tools',
                description: 'Access developer tools',
                url: '/devtools',
                icons: [{ src: '/images/logo_dark.png', sizes: '192x192' }]
            },
            {
                name: 'Conversions',
                short_name: 'Conversions',
                description: 'Access conversion tools',
                url: '/conversions',
                icons: [{ src: '/images/logo_dark.png', sizes: '192x192' }]
            }
        ],
        prefer_related_applications: false,
        related_applications: [],
        dir: "ltr",
    }
} 