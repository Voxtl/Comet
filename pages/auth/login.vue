<template>
    <div class="container">
        <form method="post" @submit.prevent="loginUser">
            <div class="field">
                <label class="label">Username</label>
                <div class="control">
                    <input class="input" type="text" v-model="login.username" autocomplete="username">
                </div>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" v-model="login.password" autocomplete="current-password">
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <button class="button is-primary">Submit</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        head() {
            return {
                title: 'Login | Voxtl',
            }
        },
        data() {
            return {
                login: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            async loginUser() {
                try {
                    await this.$auth.loginWith('local', { data: this.login });

                    this.$router.push('/');
                } catch(err) {
                    console.log(err);
                }
            }
        }
    }
</script>

<style>

</style>
