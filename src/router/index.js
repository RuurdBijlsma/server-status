import Vue from 'vue'
import VueRouter from 'vue-router'
import CpuPerformance from "@/views/CpuPerformance";
import MemoryPerformance from "@/views/MemoryPerformance";
import StoragePerformance from "@/views/StoragePerformance";
import NetworkPerformance from "@/views/NetworkPerformance";
import Login from "@/views/Login";

Vue.use(VueRouter);

const routes = [
    {path: '/performance', redirect: '/performance/cpu'},
    {
        path: '/performance/cpu',
        name: 'cpu-performance',
        component: CpuPerformance,
        props: true,
    },
    {
        path: '/performance/memory',
        name: 'memory-performance',
        component: MemoryPerformance,
        props: true,
    },
    {
        path: '/performance/storage',
        name: 'storage-performance',
        component: StoragePerformance,
        props: true,
    },
    {
        path: '/performance/network',
        name: 'network-performance',
        component: NetworkPerformance,
        props: true,
    },
    {
        path: '/performance/login',
        name: 'login',
        component: Login,
    },
];

const router = new VueRouter({
    routes
});

export default router
