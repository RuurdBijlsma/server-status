<template>
    <div class="about">
        <md-app>
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
            <md-app-content>
                <router-view/>
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
            }
        },
        components: {},
        async mounted() {
            if (localStorage.getItem('auth') === null && !this.$route.path.includes('/login')) {
                await this.$router.push('/performance/login');
            } else {
                let {user, password} = JSON.parse(localStorage.auth);
                await ServerApi.auth(user, password);
            }
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

    .content {
        vertical-align: top;
        display: inline-block;
    }

</style>