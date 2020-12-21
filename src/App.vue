<template>
    <div id="app">
        <div id="nav">
            <performance/>
        </div>
    </div>
</template>

<script>
    //TODO:
    //Visualize performance usage nicely with graphs/bars
    //Up time graph with raspberry pi
    //Set dns to direct status.ruurd.dev to raspberry pi

    import Performance from '@/views/Performance';
    import ServerApi from "@/js/ServerApi";
    ServerApi.setEndpoint('https://api.ruurd.dev');


    export default {
        name: 'app',
        components: {Performance},
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Material+Icons|Montserrat|Roboto:400,400i,500,700&display=swap');

    #app {
        font-family: 'Montserrat', 'Roboto', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
