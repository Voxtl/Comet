export default {
    mode: 'universal',
    target: 'server',
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    css: [],
    plugins: [],
    components: true,
    buildModules: [],
    modules: [
        '@nuxtjs/bulma',
        '@nuxtjs/axios',
        '@nuxtjs/auth'
    ],
    axios: {},
    build: {
        postcss: {
            preset: {
                features: {
                    customProperties: false
                }
            }
        },
    },
    serverMiddleware: ["~/api/index"],
    auth: {
        redirect: {
            login: '/',
            callback: '/auth/signed-in'
        },
        strategies: {
            local: {
                login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
                logout: false,
                user: { url: '/api/auth/user', method: 'get', propertyName: 'user' }
            }
        }
    }
}
