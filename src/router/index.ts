import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "../modules/useAuth";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Auth Middleware
router.beforeEach((to, from, next) => {
  const { authenticated, user } = useAuth();

  // If not authenticate then go to signin route
  if (
    authenticated.value === false &&
    to.meta.requiresAuth === true &&
    !user?.value
  ) {
    next({ name: "signin" });
  } else next();
});

router.beforeEach((to, from, next) => {
  const { authenticated } = useAuth();

  // If authenticated and authenticated redirect then go to home
  if (
    authenticated.value === true &&
    to.meta.requiresAuth === false &&
    to.meta.authenticatedRedirect === true
  ) {
    next({ name: "home" });
  } else next();
});

export default router;
