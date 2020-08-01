<template>
    <section class="section">
        <div class="columns is-centered">
            <div class="column is-4">
                <h2 class="title is-2">Login</h2>
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
                    <div class="field is-grouped">
                        <div class="control">
                            <button class="button is-primary">Login</button>
                        </div>
                        <div class="control">
                            <nuxt-link to="/auth/forget-password" class="button is-link is-light">Forget Password</nuxt-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
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
                    await this.$auth.logout();
                    await this.$auth.loginWith('local', { data: this.login });

                    this.$axios.setHeader('Authorization', `Bearer ${this.$auth.getToken('local')}`);

                    this.$router.push('/');
                } catch(err) {
                    console.log(`Login error: ${err}`);
                }
            }
        }
    }
</script>

<style scoped>
    form div label {
        color: var(--text);
    }

    section div div h2 {
        color: var(--text);
        text-align: center;
    }
</style>
