<template>
    <div class="memory-performance" v-if="status!==null">
        <h1>Memory</h1>
        <line-chart class="chart" :chart-data="chartData" :options="chartOptions"/>
        <p>Memory Usage: {{readableBytes(status.state.memory.used)}}</p>
        <p>Total Available Memory: {{readableBytes(status.state.memory.available)}}</p>
        <p>Swap Memory Usage: {{readableBytes(status.state.memory.swapused)}}</p>
    </div>
</template>

<script>
    import LineChart from "@/components/LineChart";
    import Utils from '@/js/Utils.js';

    export default {
        name: "MemoryPerformance",
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
            memoryUsed: Array,
            swapUsed: Array,
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
                            label: 'Swap Memory Used (bytes)',
                            backgroundColor: '#095db3',
                            data: this.swapUsed
                        },
                        {
                            label: 'Memory Used (bytes)',
                            backgroundColor: '#448aff',
                            data: this.memoryUsed
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
</style>