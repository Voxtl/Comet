export default {
    mode: 'spa',
    target: 'static',
    head: {
        title: process.env.npm_package_name || 'Voxtl',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: 'https://static.voxtl.tv/favicons/favicon.ico' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://static.voxtl.tv/fomantic/semantic.min.css' }
        ],
        script: [
            { src: 'https://static.voxtl.tv/script/jquery.js' },
            { src: 'https://static.voxtl.tv/fomantic/semantic.min.js' }
        ]
    },
    css: [],
    plugins: [
        { src: '@/plugins/vue-content-placeholders.js' }
    ],
    components: true,
    buildModules: [],
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        ['nuxt-matomo', { matomoUrl: 'https://analytics.voxtl.tv/', siteId: 1 }]
    ],
    axios: {
        baseURL: 'https://api.voxtl.tv/'
    },
    build: {
        postcss: {
            preset: {
                features: {
                    customProperties: false
                }
            }
        },
    },
    auth: {
        redirect: {
            login: '/auth/login',
            home: '/'
        },
        strategies: {
            local: {
                endpoints: {
                    login: { url: '/v1/internal/auth/login', method: 'post', propertyName: 'result.token' },
                    logout: false,
                    user: { url: '/v1/user/@me/info', method: 'get', propertyName: 'result' }
                }
            }
        },
        resetOnError: true
    }
}
