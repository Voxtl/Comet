<template>
    <div class="ui container">
        <br>
        <div class="ui card">
            <div class="content">
                Welcome to Voxtl 0.2
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        head() {
            return {
                title: 'Home | Voxtl',
            }
        }
    }

    // Eastereggs
    var keys = '';
    window.addEventListener('keypress', function (e) {
        keys += `${String.fromCharCode(e.keyCode)}`;
        console.log(keys);
        if (keys.includes('adam')) window.location.replace('https://www.twitch.tv/fudgeyofficial');
        if (keys.includes('luke')) window.location.replace('https://www.twitch.tv/squashytomato');
    });
</script>

<style>
</style>
