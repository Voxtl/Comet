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
                        <div class="header">Stream Info</div>
                        <br>
                        <form class="ui form" @submit.prevent="updateStreamInfo">
                            <div class="field">
                                <label>Stream Title</label>
                                <input type="text" autocomplete="off" v-model="stream_title">
                            </div>
                            <div class="field">
                                <label>Stream Category</label>
                                <div class="ui search" id="category-search">
                                    <div class="ui input">
                                        <input class="prompt" type="text" autocomplete="off" v-model="stream_category">
                                    </div>
                                </div>
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
    import Sidebar from '~/components/dashboard/Sidebar'
    import axios from "axios";

    export default {
        name: 'manage',
        head() {
            return {
                title: 'Manage | Voxtl',
                script: [
                    {
                        innerHTML: `
                            $('#category-search')
                                .search({
                                    apiSettings: {
                                        url: 'https://api.voxtl.tv/v1/category/search/{query}',
                                        beforeXHR: function(xhr) {
                                            xhr.setRequestHeader('Authorization', '${this.$auth.getToken('local')}');
                                            return xhr;
                                        }
                                    },
                                    fields: {
                                        results: 'result',
                                        title: 'name'
                                    }
                                });
                        `
                    }
                ]
            }
        },
        data() {
            return {
                stream_title: '',
                stream_category: ''
            }
        },
        asyncData(context) {
            return axios.get(`https://api.voxtl.tv/v1/user/@me/stream`, { headers: { 'Authorization': `${context.$auth.getToken('local')}` } }).then(res => {
                return axios.get(`https://api.voxtl.tv/v1/category/${res.data.result.info.category}`, { headers: { 'Authorization': `${context.$auth.getToken('local')}` } }).then(resp => {
                    return {
                        stream_title: res.data.result.info.title,
                        stream_category: resp.data.result.category.name
                    }
                });
            }).catch(error => {
                console.error(error);
            });
        },
        middleware: 'auth',
        components: {
            Sidebar
        },
        methods: {
            async updateStreamInfo() {
                let data = {
                    'stream_title': this.stream_title,
                    'stream_category': this.stream_category
                }

                await this.$axios.post('https://api.voxtl.tv/v1/internal/update/dashboard/manage', data)
                    .then(res => {
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    })
            }
        }
    }
</script>

<style scoped>

</style>
