<template>
    <div class="ui main container">
        <div class="ui basic segment color white">
            <div class="ui middle aligned two column centered grid">
                <div class="column">
                    <br><br><br><br><br>
                    <h2 style="text-align: center">Register to Voxtl</h2>

                    <div :class="`ui ${this.error.type} message`" v-if="error.shown">
                        {{ this.error.message }}
                    </div>

                    <form class="ui form" method="post" @submit.prevent="registerUser">
                        <div class="field">
                            <label class="color white">Username</label>
                            <input required type="text" v-model="register.username" autocomplete="username">
                        </div>

                        <div class="field">
                            <label class="color white">Email</label>
                            <input required type="email" v-model="register.email" autocomplete="email">
                        </div>

                        <div class="field">
                            <label class="color white">Password</label>
                            <input required type="password" v-model="register.password" autocomplete="new-password">
                        </div>

                        <div class="field">
                            <label class="color white">Confirm Password</label>
                            <input required type="password" v-model="register.confirm" autocomplete="new-password">
                        </div>

                        <div class="three fields">
                            <div class="six wide field">
                                <label class="color white">Date of Birth</label>
                                <select required class="ui field search dropdown" v-model="register.birthday">
                                    <option value="">Day</option>
                                    <option value="01">1</option>
                                    <option value="02">2</option>
                                    <option value="03">3</option>
                                    <option value="04">4</option>
                                    <option value="05">5</option>
                                    <option value="06">6</option>
                                    <option value="07">7</option>
                                    <option value="08">8</option>
                                    <option value="09">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="30">31</option>
                                </select>
                            </div>
                            <div class="six wide field">
                                <label>‎‏‏‎ ‎‎</label>
                                <select required class="ui fluid search dropdown" v-model="register.birthmonth">
                                    <option value="">Month</option>
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>
                            <div class="six wide field">
                                <label>‏‏‎ ‎</label>
                                <input required type="text" placeholder="Year" v-model="register.birthyear">
                            </div>
                        </div>

                        <button class="ui button">Register</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
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
                    confirm: '',
                    birthday: '',
                    birthmonth: '',
                    birthyear: '',
                },
                error: {
                    shown: false,
                    type: '',
                    message: ''
                }
            }
        },
        methods: {
            async registerUser() {
                let data = {
                    username: this.register.username,
                    email: this.register.email,
                    password: this.register.password,
                    dob: `${birthday}-${birthmonth}-${birthyear}`
                }

                await this.$axios.post('https://auth.voxtl.tv/account/register', data)
                    .then(res => {
                        this.$router.push('/auth/login');
                    })
                    .catch(err => {
                        this.error.shown = true;
                        this.error.type = 'error';
                        this.error.message = err.response.data;
                    })
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
