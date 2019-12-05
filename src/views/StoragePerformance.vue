<template>
    <div class="storage-performance" v-if="status!==null">
        <h1>Storage</h1>
        <div v-for="device in status.state.storage" :key="device.fs">
            <md-divider/>
            <span class="headline md-headline">{{device.fs}}</span>
            <md-subheader>{{device.type}}</md-subheader>
            <md-progress-bar md-mode="determinate" :md-value="device.used / device.size * 100"/>
            <p>Used: {{readableBytes(device.used)}}</p>
            <p>Total: {{readableBytes(device.size)}}</p>
        </div>
    </div>
</template>

<script>
    import Utils from '@/js/Utils.js';

    export default {
        name: "StoragePerformance",
        data() {
            return {
                percentage: 0
            }
        },
        props: {
            status: Object,
        },
        watch: {
            status: {
                deep: true,
                handler() {
                    console.log(this.status);
                }
            }
        },
        methods: {
            readableBytes(bytes) {
                return Utils.bytesToReadable(bytes);
            },
        },
    }
</script>

<style scoped>
    .headline {
        margin-top: 10px;
        display:inline-block;
    }
</style>