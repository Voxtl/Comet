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
                                <div class="ui fluid search selection dropdown" id="category-search">
                                    <input type="hidden" v-model="stream_category">
                                    <div class="text">{{ stream_category_name }}</div>
                                    <div class="menu">
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
                // script: [
                //     {
                //         innerHTML: `
                //             $('#category-search')
                //                 .dropdown({
                //                     apiSettings: {
                //                         url: 'https://api.voxtl.tv/v1/category/search/{query}',
                //                         beforeXHR: function(xhr) {
                //                             xhr.setRequestHeader('Authorization', '${this.$auth.getToken('local')}');
                //                             return xhr;
                //                         },
                //                         onResponse: function(res) {
                //                             let response = {
                //                                 success: true,
                //                                 results: []
                //                             };

                //                             if(!res.result) {
                //                                 return;
                //                             }

                //                             $.each(res.result, function(index, item) {
                //                                 response.results.push({
                //                                    name: item.name,
                //                                    value: item.slug,
                //                                 });
                //                             });

                //                             return response;
                //                         }
                //                     }
                //                 });
                //         `
                //     }
                // ]
            }
        },
        data() {
            return {
                stream_title: '',
                stream_category_name: '',
                stream_category_id: '',
                stream_category: ''
            }
        },
        asyncData(context) {
            return context.$axios.get(`users/@me/channel`, { headers: { 'Authorization': `${context.$auth.strategy.token.get()}` } }).then(res => {
                return {
                    stream_title: res.data.result.channel.title,
                    stream_category_name: res.data.result.channel.category
                }
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

                // await this.$axios.post('https://api.voxtl.tv/v1/internal/update/dashboard/manage', data)
                //     .then(res => {
                //         console.log(res);
                //     }).catch(err => {
                //         console.log(err);
                //     })
            },
            async categorySearch() {
                console.log('search');
            }
        }
    }
</script>

<style scoped>

</style>
