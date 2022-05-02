<template>
    <div class="cpu-performance" v-if="status!==null">
        <h1>CPU</h1>
        <line-chart class="chart" :chart-data="chartData" :options="chartOptions"/>
        <div class="cpu-grid">
            <div class="cpu">
                <h3>CPU</h3>
                <p>Main Temperature: {{status.state.temperature.main}} °C</p>
                <p>Max Temperature: {{status.state.temperature.max}} °C</p>
                <p>Main Load: {{status.state.load.currentload.toFixed(2)}}%</p>
            </div>
            <div class="cpu" v-for="(cpu, i) in status.state.load.cpus">
                <h3>CPU {{i}}</h3>
                <p v-if="i < status.state.temperature.cores.length">Temperature: {{status.state.temperature.cores[i]}} °C</p>
                <p>Load: {{cpu.load.toFixed(2)}}%</p>
            </div>
        </div>
    </div>
</template>

<script>
    import LineChart from '../components/LineChart.js';


    export default {
        name: "CpuPerformance",
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
            temps: Array,
            loads: Array,
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
            fillData() {
                this.chartData = {
                    labels: this.labels,
                    datasets: [
                        {
                            label: 'CPU Load (%)',
                            backgroundColor: '#b6ff65',
                            data: this.loads
                        },
                        {
                            label: 'CPU Temperature (°C)',
                            backgroundColor: '#589614',
                            data: this.temps
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