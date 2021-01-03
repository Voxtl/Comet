<template>
    <div class="ui main container">
        <div class="ui basic segment color white">
            <div class="ui middle aligned two column centered grid">
                <div class="column">
                    <br><br><br><br><br>
                    <h2 style="text-align: center">Login to Voxtl</h2>

                    <div :class="`ui ${this.error.type} message`" v-if="error.shown">
                        {{ this.error.message }}
                    </div>

                    <form class="ui form" method="post" @submit.prevent="loginUser">
                        <div class="field">
                            <label class="color white">Username</label>
                            <input type="text" v-model="login.username" autocomplete="username">
                        </div>

                        <div class="field">
                            <label class="color white">Password</label>
                            <input type="password" v-model="login.password" autocomplete="current-password">
                        </div>
                        <button class="ui button">Login</button>
                    </form>
                </div>
            </div>
        </div>
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
                    password: '',
                    grant_type: 'password',
                    client_id: 'null',
                    client_secret: 'null',
                },
                error: {
                    shown: false,
                    type: '',
                    message: ''
                }
            }
        },
        methods: {
            async loginUser() {
                await this.$auth.logout();
                await this.$auth.loginWith('local', { data: this.login })
                    .then(res => {})
                    .catch(err => {
                        this.error.shown = true;
                        this.error.type = 'error';
                        this.error.message = err.response.data;
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
