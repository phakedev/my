import { createApp } from "vue";
import "virtual:windi.css";
import App from "./layouts/index.vue";
import supabase from "./plugins/supabase";
import router from "./router";
import "./assets/css/main.css";

createApp(App).use(supabase).use(router).mount("#app");
