<template>
    <div class="ui container">
        <br>
        <div class="ui grid">
            <div class="four wide column">
                <SettingsSidebar />
            </div>
            <div class="twelve wide column">
                <div class="ui fluid card">
                    <div class="content">
                        <div class="header">Profile Info</div>
                        <br>
                        <form class="ui form" @submit.prevent="updateAccountInfo">
                            <div class="field">
                                <label>Username</label>
                                <input type="text" autocomplete="off" v-model="profile_username" readonly>
                            </div>
                            <div class="field">
                                <label>Profile Picture</label>
                                <input type="file" autocomplete="off" ref="avatar">
                            </div>
                            <button class="ui primary button" type="submit">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import SettingsSidebar from "@/components/settings/SettingsSidebar";

    export default {
        name: 'profile',
        components: {SettingsSidebar},
        head() {
            return {
                title: 'Profile | Voxtl'
            }
        },
        data() {
            return {
                profile_username: ''
            }
        },
        asyncData(context) {
            return axios.get(`https://api.voxtl.tv/v1/user/@me/info`, { headers: { 'Authorization': `${context.$auth.getToken('local')}` } }).then(res => {
                return {
                    profile_username: res.data.result.user.username
                }
            }).catch(error => {
                console.error(error);
            });
        },
        methods: {
            async updateAccountInfo() {
                let data = {
                    'profile_username': this.profile_username
                };

                if(this.$refs.avatar.files[0]) {
                    let formData = new FormData;
                    formData.append('avatar', this.$refs.avatar.files[0]);

                    axios.post('https://api.voxtl.tv/v1/internal/upload/avatar', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': this.$auth.getToken('local')
                        }
                    }).then(() => {
                        this.$router.push('/settings/profile');
                    }).catch(err => {
                        console.log(err);
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>
