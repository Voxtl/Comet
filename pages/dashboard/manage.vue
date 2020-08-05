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
                        <form class="ui form">
                            <div class="field">
                                <label>Stream Title</label>
                                <input type="text" autocomplete="off" value="">
                            </div>
                            <div class="field">
                                <label>Stream Category</label>
                                <div class="ui search">
                                    <div class="ui input">
                                        <input type="text" autocomplete="off" value="">
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

    export default {
        name: 'manage',
        head() {
            return {
                title: 'Manage | Voxtl',
            }
        },
        middleware: 'auth',
        components: {
            Sidebar
        }
    }
</script>

<style scoped>

</style>
