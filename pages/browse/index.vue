<template>
    <div class="ui main container">
        <div class="ui basic segment color white">
            <h2>Online Streamers</h2>
            <div class="ui four cards">
                <template v-if="$fetchState.pending">
                    <content-placeholders v-for="p in 8" :key="p" :rounded="true">
                        <content-placeholders-img></content-placeholders-img>
                        <content-placeholders-heading></content-placeholders-heading>
                    </content-placeholders>
                </template>
                <template v-else-if="$fetchState.error">
                    {{ $fetchState.error.message }}
                </template>
                <template v-else>
                    <StreamBrowseBlock v-for="stream in streams" :key="stream.user.id" :stream="stream"></StreamBrowseBlock>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import StreamBrowseBlock from "~/components/blocks/browse/StreamBrowseBlock";

    export default {
        name: 'Browse',
        head() {
            return {
                title: 'Browse | Voxtl',
            }
        },
        data() {
            return {
                streams: []
            }
        },
        async fetch() {
            await this.$axios.get('channels/all', { headers: { 'Authorization': `${this.$auth.strategy.token.get()}` } }).then((res) => {
                res.data.result?.forEach(stream => {
                    this.$axios.get(`users/${stream.username}/channel`, { headers: { 'Authorization': `${this.$auth.strategy.token.get()}` } }).then((res) => {
                        this.streams.push(res.data.result);
                    });
                });
            });
        },
        components: {
            StreamBrowseBlock
        }
    }
</script>

<style scoped>

</style>
