<template>
    <div class="home" v-if="upStatus!==null">
        <md-table>
            <md-table-row>
                <md-table-head>Name</md-table-head>
                <md-table-head>Address</md-table-head>
                <md-table-head md-numeric>Port</md-table-head>
                <md-table-head v-for="upTime in upStatus.endpoints[0].upTimes" md-numeric>{{convertDate(upTime.date)}}
                </md-table-head>
                <md-table-head>Status</md-table-head>
            </md-table-row>

            <md-table-row v-for="endpoint in upStatus.endpoints" :key="endpoint.name">
                <md-table-cell>{{endpoint.name}}</md-table-cell>
                <md-table-cell>{{endpoint.url}}</md-table-cell>
                <md-table-cell md-numeric>{{endpoint.port}}</md-table-cell>
                <md-table-cell md-numeric v-for="upTime in endpoint.upTimes">{{(upTime.up * 100).toFixed(2)}}%</md-table-cell>
                <md-table-cell :class="'status ' + (endpoint.up ? 'up' : 'down')">●</md-table-cell>
            </md-table-row>

        </md-table>
    </div>
</template>

<script>
    import ServerApi from "@/js/ServerApi";

    export default {
        name: 'home',
        components: {},
        data() {
            return {
                upStatus: null,
                interval: -1,
            }
        },
        async mounted() {
            this.upStatus = await ServerApi.getUptime();
            this.interval = setInterval(async () => {
                this.upStatus = await ServerApi.getUptime();
            }, 2000);
        },
        methods: {
            convertDate(dateString) {
                let date = new Date(dateString);
                return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            }
        },
        beforeDestroy() {
            clearInterval(this.interval);
        },
    }
</script>

<style scoped>
    .status {
        text-align: center;
        font-size: 30px;
    }

    .up {
        color: green;
    }

    .down {
        color: red;
    }
</style>