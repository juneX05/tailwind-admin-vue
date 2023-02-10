import { createApp } from 'vue'
import './assets/css/app.css'
import App from './App.vue'

// createApp(App).mount('#app')
import router from './router'

createApp(App)
    .use(router)
    .mount(document.body)
