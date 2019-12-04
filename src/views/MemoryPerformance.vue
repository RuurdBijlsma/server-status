<template>
    <div class="memory-performance" v-if="status!==null">
        <h1>Memory</h1>
        <p>used memory: {{status.state.memory.used}}</p>
        <p>total memory: {{status.state.memory.total}}</p>
    </div>
</template>

<script>
    import ServerApi from "@/js/ServerApi";

    export default {
        name: "MemoryPerformance",
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