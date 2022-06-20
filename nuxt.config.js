const pkg = require("./package");
console.log("ENV", process.env.NODE_ENV);

const isProd = process.env.NODE_ENV === "production";
const fs = require("fs");
const packageJson = fs.readFileSync("./package.json");
const version = JSON.parse(packageJson).version || 0;

module.exports = {
    router: {
        base: "/",
        linkExactActiveClass: "active",
    },
    env: {
        PACKAGE_VERSION: version,
    },
    /*
     ** Headers of the page
     */
    head: {
        title: "مشاوره فروش | فراروند ‌داده‌ها",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            {
                hid: "description",
                name: "description",
                content: "UD SALES CONSULTING - Ulta Data Group",
            },
        ],
        link: [
            { rel: "icon", type: "image/png", href: "favicon.png" },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700",
            },
            {
                rel: "stylesheet",
                href: "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
                integrity: "sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/",
                crossorigin: "anonymous",
            },
        ],
    },

    /*
     ** Customize the progress-bar color
     */
    loading: { color: "#5e72e4" },

    /*
     ** Global CSS
     */
    css: ["assets/fonts/IranSans/css/fontiran.css", "assets/css/nucleo/css/nucleo.css", "assets/sass/ud.scss"],

    pwa: {
        meta: {
            title: "مشاوره فروش | فراروند ‌داده‌ها",
            author: "Pourya Noufallah",
        },
        manifest: {
            name: "ud-sales-consulting",
            short_name: "sales-consulting",
            display: "standalone",
            background_color: "#000000",
            theme_color: "#172b4d",
            lang: "fa",
        },
    },

    /*
     ** Plugins to load before mounting the App
     */
    plugins: ["~/plugins/dashboard/dashboard-plugin", "~/plugins/dashboard/axios", { src: "~/plugins/dashboard/datePicker", ssr: false }],

    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        "@nuxtjs/axios",
        "@nuxtjs/auth",
        "@nuxtjs/pwa",
    ],
    /*
     ** Axios module configuration
     */
    axios: { baseURL: "http://localhost:14738" },
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: "account/login",
                        method: "post",
                        propertyName: "data.token",
                    },
                    user: {
                        url: "account/check-authentication",
                        method: "post",
                        propertyName: "data",
                    },
                    logout: false,
                },
            },
        },
        fullPathRedirect: true,
        cookie: {
            prefix: "auth.",
            options: {
                path: "/",
                expires: 365,
            },
        },
    },
    /*
     ** Build configuration
     */
    build: {
        transpile: ["vee-validate/dist/rules"],
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {},
        extractCSS: process.env.NODE_ENV === "production",
        babel: {
            plugins: [
                [
                    "component",
                    {
                        libraryName: "element-ui",
                        styleLibraryName: "theme-chalk",
                    },
                ],
            ],
        },
    },
};