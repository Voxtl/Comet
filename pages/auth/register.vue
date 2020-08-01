<template>
    <section class="section">
        <div class="columns is-centered">
            <div class="column is-4">
                <h2 class="title is-2">Register</h2>
                <form method="post" @submit.prevent="registerUser">
                    <div class="field">
                        <label class="label">Username</label>
                        <div class="control">
                            <input class="input" type="text" v-model="register.username" autocomplete="username">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input class="input" type="email" v-model="register.email" autocomplete="email">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input class="input" type="password" v-model="register.password" autocomplete="new-password">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Confirm Password</label>
                        <div class="control">
                            <input class="input" type="password" v-model="register.confirm" autocomplete="new-password">
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button is-primary">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "register",
        head() {
            return {
                title: 'Register | Voxtl',
            }
        },
        data() {
            return {
                register: {
                    username: '',
                    email: '',
                    password: '',
                    confirm: ''
                }
            }
        },
        methods: {
            async registerUser() {
                await this.$axios.post('http://51.15.105.208:3030/v1/internal/auth/register', this.register).then()
                    .catch(error => {
                        console.log(error);
                    });
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
