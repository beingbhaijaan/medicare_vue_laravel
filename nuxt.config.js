require('dotenv').config()


module.exports = {
    mode: "spa",
    head: {
        title: "Medicare",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            },
            {
                hid: "description",
                name: "description",
                content: "Nuxt.js project"
            },
            { name: "msapplication-TileColor", content: "#ffffff" },
            { name: "theme-color", content: "#ffffff" }
        ],
        link: [
            {
                rel: "apple-touch-icon",
                sizes: "57x57",
                href: "/images/favicon/apple-icon-57x57.png"
            },
            {
                rel: "apple-touch-icon",
                sizes: "60x60",
                href: "/images/favicon/apple-icon-60x60.png"
            },
            {
                rel: "apple-touch-icon",
                sizes: "72x72",
                href: "/images/favicon/apple-icon-72x72.png"
            },
            {
                rel: "apple-touch-icon",
                sizes: "76x76",
                href: "/images/favicon/apple-icon-76x76.png"
            },
            {
                rel: "apple-touch-icon",
                sizes: "114x114",
                href: "/images/favicon/apple-icon-114x114.png"
            },
            {
                rel: "apple-touch-icon",
                sizes: "120x120",
                href: "/images/favicon/apple-icon-120x120.png"
            },
            {
                rel: "apple-touch-icon",
                sizes: "144x144",
                href: "/images/favicon/apple-icon-144x144.png"
            },
            {
                rel: "apple-touch-icon",
                sizes: "152x152",
                href: "/images/favicon/apple-icon-152x152.png"
            },
            {
                rel: "apple-touch-icon",
                sizes: "180x180",
                href: "/images/favicon/apple-icon-180x180.png"
            },
            {
                rel: "icon",
                type: "image/png",
                sizes: "192x192",
                href: "/images/favicon/android-icon-192x192.png"
            },
            {
                rel: "icon",
                type: "image/png",
                sizes: "32x32",
                href: "/images/favicon/favicon-32x32.png"
            },
            {
                rel: "icon",
                type: "image/png",
                sizes: "96x96",
                href: "/images/favicon/favicon-96x96.png"
            },
            {
                rel: "icon",
                type: "image/png",
                sizes: "16x16",
                href: "/images/favicon/favicon-16x16.png"
            },
            {
                rel: "icon",
                type: "image/x-icon",
                href: "/images/favicon/favicon.ico"
            },
            { rel: "manifest", href: "/manifest.json" },
            { rel: "manifest", href: "images/favicon/site.webmanifest" },
            {
                rel: "mask-icon",
                href: "images/favicon/safari-pinned-tab.svg",
                color: "#1abc9c"
            }
        ],
        script: [
            { src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit', defer: true, async: true}
        ]
    },
    loading: { color: "#3B8070" },
    build: {
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/
                });
            }
        }
    },
    plugins: [
        "~/plugins/axios",
        "~/plugins/filters",
        "~/plugins/components",
        { src: "~/plugins/calendar.js", ssr: false },
        { src: "~/plugins/swiper.js", ssr: false },
        { src: "~/plugins/affix.js", ssr: false },
        { src: "~/plugins/addthis.js", ssr: false },
        { src: "~/plugins/sweetalert.js", ssr: false },
        { src: "~/plugins/persistent-store.js", ssr: false },
        { src: "~/plugins/multiselect.js", ssr: false }
    ],
    css: [
        "swiper/dist/css/swiper.css",
        "vue-multiselect/dist/vue-multiselect.min.css",
        "./assets/sass/app.scss"
    ],
    modules: ["@nuxtjs/axios", "@nuxtjs/dotenv"],
    axios: {
        baseURL: `${process.env.BASE_URL}/api`
    },
    env: {
        stagingURL: 'http://staging.medihealthtourism.com',
        baseURL: process.env.BASE_URL,
        apiURL: `${process.env.BASE_URL}/api`,
        siteKey: process.env.SITE_KEY
    },
    router: {
        extendRoutes(routes, resolve) {
            routes.push({
                name: "login",
                path: "/login",
                component: resolve(__dirname, "pages/auth/login.vue")
            });
            routes.push({
                name: "account-activation",
                path: "/signup/activate/:token",
                component: resolve(__dirname, "pages/auth/account-activation.vue")
            });
            routes.push({
                name: "change-password",
                path: "/change-password",
                component: resolve(__dirname, "pages/auth/change-password.vue")
            });
            routes.push({
                name: "forgot-password",
                path: "/forgot-password",
                component: resolve(__dirname, "pages/auth/forgot-password.vue")
            });
            routes.push({
                name: "password-recovery-token",
                path: "/password-recovery/:token",
                component: resolve(
                    __dirname,
                    "pages/auth/password-recovery/_token.vue"
                )
            });
            routes.push({
                name: "schedule-appointment",
                path: "/patient/schedule-appointment",
                component: resolve(__dirname, "pages/patient/doctors.vue")
            });
            routes.push({
                name: "edit-profile",
                path: "/edit-profile",
                component: resolve(__dirname, "pages/auth/edit-profile.vue")
            });
            routes.push({
                name: "custom",
                path: "*",
                component: resolve(__dirname, "pages/error/404.vue")
            });
        }
    }
};

