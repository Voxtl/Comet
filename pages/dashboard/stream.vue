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
                                <input type="text" readonly="" value="rtmp://ingest.voxtl.tv/push">
                            </div>
                            <div class="field">
                                <label>Stream Key</label>
                                <input type="text" readonly="" value="">
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

    export default {
        name: 'start-streaming',
        head() {
            return {
                title: 'Start Streaming | Voxtl',
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
