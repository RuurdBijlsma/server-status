<template>
    <div class="cpu-performance" v-if="status!==null">
        <h1>CPU</h1>
        <p>temp: {{status.state.temperature.main}}</p>
        <p>load: {{status.state.load.currentload}}</p>
    </div>
</template>

<script>
    import ServerApi from "@/js/ServerApi";

    export default {
        name: "CpuPerformance",
        data() {
            return {
                interval: -1,
                status: null,
            }
        },
        mounted() {
            this.interval = setInterval(() => {
                if (ServerApi.status.state !== null) {
                    clearInterval(this.interval);
                    this.status = ServerApi.status;
                }
            }, 50);
        },

        beforeDestroy() {
            clearInterval(this.interval);
        }
    }
</script>

<style scoped>

</style>