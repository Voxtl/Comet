export default {
    mode: 'spa',
    target: 'static',
    head: {
        title: 'Voxtl',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Voxtl. Next generation streaming.' }
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
    generate: {
        fallback: true,
    },
    plugins: [
        { src: '@/plugins/vue-content-placeholders.js' }
    ],
    components: true,
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next'
    ],
    build: {
        postcss: {
            preset: {
                features: {
                    customProperties: false
                }
            }
        },
    },
    axios: {
        baseURL: 'https://api.voxtl.tv',
    },
    auth: {
        strategies: {
            local: {
                // scheme: 'refresh',
                token: {
                    property: 'access_token',
                    maxAge: 3600
                },
                // refreshToken: {
                //     property: 'refresh_token',
                //     data: 'refresh_token',
                //     maxAge: 60 * 60 * 24 * 30,
                // },
                user: {
                    property: 'result',
                    authFetch: false,
                },
                endpoints: {
                    login: { url: 'https://auth.voxtl.tv/auth/login', method: 'post' },
                    refresh: false, // { url: '/api/auth/refresh', method: 'post' },
                    user: { url: 'users/@me/profile', method: 'get'},
                    logout: false, // { url: '/api/auth/logout', method: 'post' }
                },
            },
        },
    },
};