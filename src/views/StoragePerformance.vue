<template>
    <div class="storage-performance" v-if="status!==null">
        <h1>Storage</h1>
        <p v-for="device in status.state.storage" :key="device.fs">{{device.fs}}: {{device.used}} / {{device.size}}</p>
    </div>
</template>

<script>
    import ServerApi from "@/js/ServerApi";

    export default {
        name: "StoragePerformance",
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