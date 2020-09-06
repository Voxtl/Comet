<template>
    <div class="ui container">
        <br>
        <div class="ui grid">
            <div class="four wide column">
                <Sidebar />
            </div>
            <div class="twelve wide column">
                <div class="ui fluid card">
                    <div class="content">
                        <div class="header">Start Streaming</div>
                        <br>
                        <div class="ui form">
                            <div class="field">
                                <label>Ingest Server</label>
                                <input type="text" readonly="" value="rtmp://ingest-1.nue-de.voxtl.com/push">
                            </div>
                            <div class="field">
                                <label>Stream Key</label>
                                <div class="ui action input">
                                    <input type="text" readonly="" v-bind:value="shownStreamKey">
                                    <button class="ui button" v-on:click="stream_key_shown=!stream_key_shown">{{ stream_key_shown ? "Hide" : "Show" }}</button>
                                    <button class="ui button" v-on:click="copyStreamKey">Copy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Sidebar from '~/components/dashboard/Sidebar'
    import axios from "axios";

    export default {
        name: 'start-streaming',
        head() {
            return {
                title: 'Start Streaming | Voxtl',
            }
        },
        data() {
            return {
                stream_key: '',
                stream_key_shown: false
            }
        },
        computed: {
            shownStreamKey: function() {
                if(this.stream_key_shown) {
                    return this.stream_key;
                } else {
                    return [...this.stream_key].fill("*").join("")
                }
            }
        },
        methods: {
            copyStreamKey: function() {
                navigator.clipboard.writeText(this.stream_key)
            }
        },
        asyncData(context) {
            return axios.get(`https://api.voxtl.tv/v1/user/@me/stream`, { headers: { 'Authorization': `${context.$auth.getToken('local')}` } }).then(resp => {
                return {
                    stream_key: resp.data.result.user.id + '--' + resp.data.result.private.stream_key
                }
            });
        },
        middleware: 'auth',
        components: {
            Sidebar
        }
    }
</script>

<style scoped>

</style>
