<template>
    <div class="about">
        <md-app class="app">
            <md-app-drawer md-permanent="clipped" class="drawer">
                <md-list class="drawer-list">
                    <md-list-item to="/performance/cpu">
                        <md-icon>memory</md-icon>
                        <span class="md-list-item-text">CPU</span>
                    </md-list-item>

                    <md-list-item to="/performance/memory">
                        <md-icon>business</md-icon>
                        <span class="md-list-item-text">Memory</span>
                    </md-list-item>

                    <md-list-item to="/performance/storage">
                        <md-icon>storage</md-icon>
                        <span class="md-list-item-text">Storage</span>
                    </md-list-item>

                    <md-list-item to="/performance/network">
                        <md-icon>network_check</md-icon>
                        <span class="md-list-item-text">Network</span>
                    </md-list-item>

                    <md-divider/>

                    <md-list-item to="/performance/login">
                        <md-icon>account_circle</md-icon>
                        <span class="md-list-item-text">Log-in</span>
                    </md-list-item>
                </md-list>
            </md-app-drawer>
            <md-app-content class="content">
                <router-view v-if="status!==null" :labels="labels" :status="status" :loads="loads" :temps="temps"
                             :swapUsed="swapUsed" :memoryUsed="memoryUsed" :rxs="rxs" :txs="txs"/>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import ServerApi from "@/js/ServerApi";

    export default {
        name: 'performance',
        data() {
            return {
                interval: -1,
                status: null,
                firstDataTime: -1,
                loads: [],
                temps: [],
                labels: [],
                swapUsed: [],
                memoryUsed: [],
                txs: [],
                rxs: [],
            }
        },
        components: {},
        async mounted() {
            if (localStorage.getItem('auth') === null && !this.$route.path.includes('/login')) {
                await this.$router.push('/performance/login');
            } else {
                let {user, password} = JSON.parse(localStorage.auth);
                await ServerApi.auth(user, password);

                this.interval = setInterval(() => {
                    if (ServerApi.status.state !== null) {
                        clearInterval(this.interval);
                        this.status = ServerApi.status;
                        this.firstDataTime = performance.now();
                        this.addData();
                    }
                }, 50);
            }
        },
        methods: {
            addData() {
                // CPU Data:
                let load = this.status.state.load.currentload;
                let temp = this.status.state.temperature.main;
                let swapUsed = this.status.state.memory.swapused;
                let memoryUsed = this.status.state.memory.used;
                let networkRxs = this.status.state.network[0].rx_sec;
                let networkTxs = this.status.state.network[0].tx_sec;
                let secondsPassed = Math.round((performance.now() - this.firstDataTime) / 1000);
                this.temps.push(temp);
                this.loads.push(load);
                this.swapUsed.push(swapUsed);
                this.memoryUsed.push(memoryUsed);
                this.rxs.push(networkRxs);
                this.txs.push(networkTxs);
                this.labels.push(secondsPassed);
            }
        },
        watch: {
            status: {
                deep: true,
                handler() {
                    this.addData();
                }
            }
        },
        beforeDestroy() {
            clearInterval(this.interval);
            clearInterval(ServerApi.fetchInterval);
        },
    }
</script>

<style scoped>
    .drawer {
        max-width: 200px;
        display: inline-block;
    }

    .drawer-list {
    }

    .app {
        height: 100%;
    }

</style>