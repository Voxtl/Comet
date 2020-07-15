<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <nuxt-link class="navbar-item" to="/" width="28" height="28">
                <img src="https://static.voxtl.com/media/logo-alt.png" width="28" height="28">
            </nuxt-link>

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <nuxt-link to="/browse/following" v-if="$auth.loggedIn" class="navbar-item" exact-active-class="is-active" active-class="is-active">Following</nuxt-link>
                <nuxt-link to="/browse" class="navbar-item" exact-active-class="is-active" active-class="is-active">Browse</nuxt-link>
                <nuxt-link to="/dashboard/stream" class="navbar-item" exact-active-class="is-active" active-class="is-active">Start Streaming</nuxt-link>
            </div>
            <div v-if="$auth.loggedIn" class="navbar-end">
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">{{ $auth.user.username }}</a>
                    <div class="navbar-dropdown">
                        <a class="navbar-item">no</a>
                    </div>
                </div>
            </div>
            <div v-else class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <nuxt-link to="/auth/register" class="button is-primary"><strong>Register</strong></nuxt-link>
                        <nuxt-link to="/auth/login" class="button is-light">Login</nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Navbar",
    }
</script>

<style>
    nav.navbar {
        background-color: var(--secondary);
    }

    nav.navbar div.navbar-brand a.navbar-item {
        padding-left: 2em;
        padding-right: 2em;
    }

    nav.navbar div.navbar-brand a.navbar-item:hover {
        background-color: var(--secondary);
    }

    nav.navbar a.navbar-item {
        color: var(--text);
    }

    nav.navbar a.navbar-link {
        color: var(--text);
    }

    nav.navbar a.navbar-item:hover {
        background-color: var(--main);
    }

    nav.navbar a.navbar-item.is-active {
        background-color: var(--main) !important;
    }

    nav.navbar div.navbar-item.has-dropdown:hover {
        background-color: var(--main);
    }

    nav.navbar div.navbar-item.has-dropdown a.navbar-link:active {
        background-color: var(--main);
    }

    nav.navbar div.navbar-item.has-dropdown a.navbar-link:hover {
        background-color: var(--main);
    }

    nav.navbar div.navbar-item.has-dropdown a.navbar-link:not(.is-arrowless)::after {
        border-color: var(--text);
    }
</style>
