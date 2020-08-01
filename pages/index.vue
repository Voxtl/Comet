<template>
    <div class="ui container">
        <div class="ui card">
            <div class="content">
                Welcome to Voxtl 0.2
                <br><br>
                {{ this.$auth.getToken('local') }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        head() {
            return {
                title: 'Home | Voxtl',
            }
        }
    }
</script>

<style>
</style>
