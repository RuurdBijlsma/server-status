<template>
    <div id="app">
        <div id="nav">
            <md-tabs md-sync-route>
                <md-tab id="tab-home" md-label="Home" to="/" exact>
                    <home/>
                </md-tab>

                <md-tab id="tab-pages" md-label="Performance" to="/performance/">
                    <performance/>
                </md-tab>
            </md-tabs>
        </div>
    </div>
</template>

<script>
    //TODO:
    //Visualize performance usage nicely with graphs/bars
    //Up time graph with raspberry pi
    //Set dns to direct status.ruurd.dev to raspberry pi

    import Performance from '@/views/Performance';
    import Home from '@/views/Home';
    import ServerApi from "@/js/ServerApi";
    ServerApi.setEndpoint('https://ruurd.dev:3000');


    export default {
        name: 'app',
        components: {Performance, Home},
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
