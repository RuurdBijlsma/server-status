<template>
    <div class="network-performance" v-if="status!==null">
        <h1>Network</h1>
        <div v-for="network in status.state.network" :key="network.iface">
            <h3>{{network.iface}}</h3>
            <line-chart class="chart" :chart-data="chartData" :options="chartOptions"/>
            <div class="cpu-grid">
                <div class="cpu">
                    <h4>Transmitted</h4>
                    <p>Rate: {{readableBytes(network.tx_sec)}}/s</p>
                    <p>Total: {{readableBytes(network.tx_bytes)}}</p>
                    <p>Dropped: {{readableBytes(network.tx_dropped)}}</p>
                    <p>Errors: {{network.tx_errors}}</p>
                </div>
                <div class="cpu">
                    <h4>Received</h4>
                    <p>Rate: {{readableBytes(network.rx_sec)}}/s</p>
                    <p>Total: {{readableBytes(network.rx_bytes)}}</p>
                    <p>Dropped: {{readableBytes(network.rx_dropped)}}</p>
                    <p>Errors: {{network.rx_errors}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LineChart from "@/components/LineChart";
    import Utils from '@/js/Utils.js';

    export default {
        name: "NetworkPerformance",
        components: {
            LineChart
        },
        data() {
            return {
                chartData: {},
                chartOptions: {
                    responsive: true,
                },
            }
        },
        props: {
            txs: Array,
            rxs: Array,
            labels: Array,
            status: Object,
        },
        mounted() {
            this.fillData();
        },
        watch: {
            labels() {
                this.fillData();
            }
        },
        methods: {
            readableBytes(bytes) {
                return Utils.bytesToReadable(bytes);
            },
            fillData() {
                this.chartData = {
                    labels: this.labels,
                    datasets: [
                        {
                            label: 'Received per second (bytes)',
                            backgroundColor: '#5f2198',
                            data: this.rxs
                        },
                        {
                            label: 'Transmitted per second (bytes)',
                            backgroundColor: '#9e52e4',
                            data: this.txs
                        },
                    ]
                }
            },
        },
    }
</script>

<style scoped>
    .chart {
        max-width: 620px;
    }
    .cpu{
        min-width:200px;
    }
    .cpu-grid{
        overflow: hidden;
        display: grid;
        grid-template-columns: auto auto ;
        grid-template-rows: auto auto auto;
    }
</style>