import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        alias: "/home",
        name: "projects",
        component: () => import("../components/Projects.vue")
    },
    {
        path: "/project16",
        name: "project16",
        component: () => import("../components/project16/Project16.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
