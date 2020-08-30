<template>
    <div class="ui inverted fluid vertical menu">
        <div class="item">
            <div class="header">Settings</div>
            <div class="menu">
                <nuxt-link class="item" to="/settings/profile">Profile</nuxt-link>
                <nuxt-link class="item" to="/settings/account">Account</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SettingsSidebar'
    }
</script>

<style scoped>

</style>
