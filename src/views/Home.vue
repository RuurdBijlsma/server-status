<template>
    <div class="home" v-if="upStatus!==null">
        <div class="endpoint" v-for="endpoint in upStatus.endpoints" :key="endpoint.name">
            <p>{{endpoint.name}} up: {{endpoint.up}}</p>
            <p>{{endpoint.upTimes}}</p>
        </div>
    </div>
</template>

<script>
    import ServerApi from "@/js/ServerApi";

    export default {
        name: 'home',
        components: {},
        data() {
            return {
                upStatus: null
            }
        },
        async mounted() {
            this.upStatus = await ServerApi.getUptime();
            console.log(this.upStatus);
        }
    }
</script>

<style scoped>

</style>