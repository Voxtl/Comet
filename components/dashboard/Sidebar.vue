<template>
    <div class="ui inverted fluid vertical menu">
        <div class="item">
            <div class="header">Dashboard</div>
            <div class="menu">
                <nuxt-link class="item" to="/dashboard/manage">Manage</nuxt-link>
                <nuxt-link class="item" to="/dashboard/stream">Start Streaming</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Sidebar"
    }
</script>

<style scoped>

</style>
