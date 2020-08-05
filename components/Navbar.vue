<template>
    <div id="header">
        <div class="ui fixed inverted secondary menu">
            <nuxt-link to="/" class="item img"><img src="https://static.voxtl.tv/media/logo-alt.png" alt="Voxtl Logo"></nuxt-link>

            <nuxt-link to="/browse/following" v-if="this.$auth.loggedIn" class="item" exact-active-class="active">Following</nuxt-link>
            <nuxt-link to="/browse" class="item" exact-active-class="active">Browse</nuxt-link>
            <nuxt-link to="/dashboard/stream" class="item" exact-active-class="active">Start Streaming</nuxt-link>

            <div class="right menu" v-if="this.$auth.loggedIn">
                <div class="ui dropdown item">
                    <div class="item p-0"><img class="ui avatar image" :src="`https://img.voxtl.tv/user/avatar/${this.$auth.user.user.id}.webp`"></div>
                    <div class="text">{{ this.$auth.user.user.username }}</div>
                    <i class="dropdown icon"></i>
                    <div class="menu">
                        <nuxt-link class="item" :to="{ path: '/' + this.$auth.user.user.username }">
                            <i class="video icon"></i>
                            Channel
                        </nuxt-link>
                        <nuxt-link class="item" to="/dashboard/manage">
                            <i class="tachometer alternate icon"></i>
                            Dashboard
                        </nuxt-link>
                        <nuxt-link class="item" to="/settings/profile">
                            <i class="cog icon"></i>
                            Settings
                        </nuxt-link>
                        <div class="divider"></div>
                        <a class="item" @click="logout">
                            <i class="sign out alternate icon"></i>
                            Logout
                        </a>
                    </div>
                </div>
            </div>
            <div class="right menu" v-else>
                <div class="item pr-0">
                    <nuxt-link class="ui button" to="/auth/login">Login</nuxt-link>
                </div>
                <div class="item pl-0">
                    <nuxt-link class="ui primary button" to="/auth/register">Register</nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        methods: {
            async logout() {
                await this.$auth.logout();
            }
        },
        mounted() {
            $('.dropdown').dropdown({
                on: 'hover'
            });
        }
    }
</script>

<style>
    body div#header .ui.menu {
        border-radius: 0 !important;
        padding: 0em 1em !important;
        background-color: var(--secondary) !important;
        flex-shrink: 0 !important;
    }

    body div#header ui.menu > a.item {
        color: var(--text) !important;
    }

    body div#header a.item.img:hover {
        background-color: transparent !important;
    }
</style>
