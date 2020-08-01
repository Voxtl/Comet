<template>
    <client-only>
        <body class="dark">
            <Navbar />
            <div class="content" style="padding-top: 57px;">
                <Nuxt />
            </div>
        </body>
    </client-only>
</template>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Asap:wght@400;700&display=swap');

    body.dark {
        --main: #0e0e0e;
        --secondary: #191919;

        --text: #ffffff;

        --primary: #ff7e18;
        --primary-hover: #ff9540;
    }

    body {
        font-family: 'Asap', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
        background-color: var(--main);
        min-height: 100vh;
    }

    /* Padding Helpers */
    .p-0 { padding: 0 !important; }
    .p-2 { padding: 0.5em !important; }

    .pl-0 { padding-left: 0 !important; }

    .pr-0 { padding-right: 0 !important; }

    /* Margin Helpers */
    .m-0 { margin: 0 !important; }

    .mv-0 { margin-top: 0 !important; margin-bottom: 0 !important; }

    .mt-0 { margin-top: 0 !important; }

    .mb-0 { margin-bottom: 0 !important; }
    .mb-2 { margin-bottom: 0.5em !important; }

    .color.white {
        color: #ffffff !important;
    }

    /* Buttons */
    body .ui.primary.button {
        background-color: var(--primary) !important;
    }

    body .ui.primary.button:hover {
        background-color: var(--primary-hover) !important;
    }

    .ui.card {
        background-color: var(--secondary) !important;
        box-shadow: none !important;
    }

    .ui.card .content {
        color: var(--text) !important;
    }

    .ui.card .content .header {
        color: var(--text) !important;
    }

    .ui.card .ui.form .field label {
        color: var(--text) !important;
    }
</style>

<script>
    import Navbar from "~/components/Navbar";

    export default {
        components: {
            Navbar
        }
    }
</script>
