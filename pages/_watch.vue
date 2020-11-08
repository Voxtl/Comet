<template>
    <div class="ui grid m-0">
        <div id="player-column" class="twelve wide column" style="height: calc(100vh - 57px); overflow-y: scroll;">
            <div>
                <div id="player"></div>
            </div>
            <div class="ui fluid card">
                <div class="content">
                    <div class="ui items">
                        <div class="ui item">
                            <div class="ui tiny circular image" style="display: flex;">
                                <img :src="`https://img.voxtl.tv/user/avatar/${this.streamer.profile.avatar}.webp`" alt="User Avatar" style="align-self: center;">
                            </div>
                            <div class="middle aligned content">
                                <div class="left floated">
                                    <h2 class="mb-0" style="font-size: 1.65em;">{{ this.streamer.user.username }}: {{ this.streamerInfo.channel.title }}</h2>
                                    <h3 class="mv-0"><span id="title"></span></h3>
                                    <div class="ui label">
                                        <i class="gamepad icon"></i>
                                        <span id="category">{{ this.streamerInfo.channel.category }}</span>
                                    </div>
                                    <div class="ui label">
                                        <i class="users icon"></i>
                                        <span id="team">Loading...</span>
                                    </div>
                                </div>
                                <div class="right floated" style="text-align: right;">
                                    <div class="ui label">
                                        <i class="eye icon"></i>
                                        <span id="viewers">{{ this.streamerInfo.channel.viewers.count }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="chat-column" class="four wide column" style="height: calc(100vh - 57px); right: 0; position: fixed; background-color: var(--secondary);">
            <div id="chat" class="ui list" style="height: 100%; display: flex; flex-direction: column;">
                <div style="overflow-y: scroll;" id="messages"></div>
                <div style="margin-top: auto; padding-top: 1em;">
                    <form class="ui form" id="chat-input" @submit.prevent="sendMessage">
                        <div class="field">
                            <div class="ui icon input mb-2">
                                <i class="smile outline link icon"></i>
                                <input type="text" v-model="message" autocomplete="off" placeholder="Say something...">
                            </div>
                            <button class="tiny circular ui right floated icon button" type="submit">
                                Send <i class="paper plane icon"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "watch",
        head() {
            return {
                title: `${this.streamer.user.username} | Voxtl`,
                script: [
                    { src: 'https://static.voxtl.tv/script/hls.js' },
                    {
                        src: 'https://static.voxtl.tv/player/ovenplayer.js',
                        callback: () => (this.ovenPlayerLoaded = true)
                    },
                    {
                        skip: !this.ovenPlayerLoaded,
                        innerHTML: `
                            player = OvenPlayer.create("player", {
                                sources: [
                                    {
                                        "file": 'wss://distribution-1.nue-de.voxtl.com:3334/live/${this.streamer.user.id}_source',
                                        "type": "webrtc",
                                        "label": "Source (Velocity)"
                                    },
                                    {
                                        "file": 'https://distribution-1.nue-de.voxtl.com/live/${this.streamer.user.id}_source/playlist.m3u8',
                                        "type": "hls",
                                        "label": "Source (HLS)"
                                    },
                                ],
                                autoStart: true
                            });

                            player.on('stateChanged', function(data) {
                                if(data.newstate === 'error') {

                                }
                            });
                        `,
                        body: true
                    },
                    {
                        innerHTML: `
                            function randomString(length) {
                               let result = '';
                               const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                               const charactersLength = characters.length;

                               for (let i = 0; i < length; i++) {
                                  result += characters.charAt(Math.floor(Math.random() * charactersLength));
                               }

                               return result;
                            }

                            socket = new WebSocket('wss://ws.voxtl.tv/${this.streamer.user.id}');

                            socket.addEventListener('open', function(event) {
                                socket.send(JSON.stringify({
                                    'event': 'join',
                                    'data': '${this.$auth.loggedIn ? this.$auth.getToken('local').substr(7) : 'guest'}'
                                }));
                            });

                            socket.addEventListener('message', function(event) {
                                let data = JSON.parse(event.data);
                                const id = randomString(8);

                                let badgeMarkup = '';

                                data.badges.forEach(badge => {
                                    badgeMarkup += '' +
                                        '<span style="align-self: center;" data-tooltip="' + badge.name + '" data-position="top left" data-variation="mini">' +
                                            '<i class="small bordered ' + badge.icon + ' icon" style="background-color: #' + badge.color + '; align-self: center; color: #ffffff;">' +
                                            '</i>' +
                                        '</span>';
                                });

                                let markup = '' +
                                    '<div class="item" style="display: flex; margin-bottom: 0.2em;">' +
                                        '<img class="ui avatar image" src="https://img.voxtl.tv/user/avatar/' + data.viewer.id + '.webp" style="align-self: center;">' +
                                        '<div class="content" style="display: flex;">' +
                                            badgeMarkup +
                                            '<div class="header" style="font-size: 1.2em; align-self: center; color: #ffffff; font-weight: 700;">' + data.viewer.username + '</div>' +
                                            '<div class="description" style="font-size: 1em; align-self: center; margin-left: 0.4em; word-break: break-word; color: #BABABA;" id="' + id + '"></div>' +
                                        '</div>' +
                                    '</div>';

                                $('#messages').append(markup);
                                document.getElementById(id).appendChild(document.createTextNode(decodeURI(data.message)));
                            });
                        `
                    }
                ]
            }
        },
        data() {
            return {
                ovenPlayerLoaded: false,
                message: '',
            }
        },
        asyncData(context) {
            return axios.get(`https://api.voxtl.tv/users/${context.params.watch}/profile`, { headers: { 'Authorization': `${context.$auth.getToken('local')}` } }).then(res => {
                return axios.get(`https://api.voxtl.tv/users/${context.params.watch}/channel`, { headers: { 'Authorization': `${context.$auth.getToken('local')}` } }).then(ress => {
                    return {
                        streamer: res.data.result,
                        streamerInfo: ress.data.result
                    }
                });
            });
        },
        methods: {
            async sendMessage() {
                socket.send(JSON.stringify({
                    'event': 'message',
                    'data': encodeURI(this.message)
                }));

                this.message = '';
            }
        },
        mounted() {
            window.setInterval(() => {
                axios.get(`https://api.voxtl.tv/users/${context.params.watch}/profile`, { headers: { 'Authorization': `${this.$auth.getToken('local')}` } }).then(res => {
                    axios.get(`https://api.voxtl.tv/users/${context.params.watch}/channel`, { headers: { 'Authorization': `${this.$auth.getToken('local')}` } }).then(ress => {
                        this.streamer = res.data.result;
                        this.streamerInfo = ress.data.result;
                    });
                });
            }, 5000);
        }
    }
</script>

<style scoped>
</style>
