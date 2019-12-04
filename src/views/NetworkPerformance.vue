<template>
    <div class="network-performance" v-if="status!==null">
        <h1>Network</h1>
        <div v-for="device in status.state.network" :key="device.iface">
            <p>{{device.iface}}</p>
            <p>received: {{device.rx_bytes}}</p>
            <p>transmitted: {{device.tx_bytes}}</p>
        </div>
    </div>
</template>

<script>
    import ServerApi from "@/js/ServerApi";

    export default {
        name: "NetworkPerformance",
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