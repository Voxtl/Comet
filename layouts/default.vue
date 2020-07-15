<template>
    <body class="dark">
        <Navbar />
        <Nuxt />
    </body>
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
        overflow-y: auto;
    }

    .button {
        padding: 0.75em 2.5em;
        font-size: 1em;
    }

    .button.is-primary {
        background-color: var(--primary);
    }

    .button.is-primary:hover {
        background-color: var(--primary-hover);
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
