import {createApp} from 'vue'
import './assets/css/app.css'

import router from './router'
import {createPinia} from "pinia";
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate)

import App from './App.vue'
import {useGlobalStore} from "./stores/globalStore";

const app = createApp(App)
app.use(pinia)

app.use(router)

router.beforeEach((to, from) => {
    const globalStore = useGlobalStore()
    globalStore.on();

})

router.afterEach((to, from) => {
    const globalStore = useGlobalStore()
    setTimeout(() => globalStore.off(), 1000);
})

app.mount(document.body)
