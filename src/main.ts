import { createApp } from "vue";
import App from "./App.vue";
import "@/shared/styles/index.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(App).use(pinia).mount("#app");
