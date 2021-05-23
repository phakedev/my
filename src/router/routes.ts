import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../pages/index.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/auth/signin",
    name: "signin",
    component: () =>
      import(/* webpackChunkName: "signin" */ "../pages/auth/signin.vue"),
    meta: { requiresAuth: false, authenticatedRedirect: true },
  },
];

export default routes;
