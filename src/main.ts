import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'
import { DataLoaderPlugin} from 'unplugin-vue-router/data-loaders'
import 'vue-select/dist/vue-select.css';

const pinia = createPinia()

createApp(App)
    .use(pinia)
    .use(DataLoaderPlugin, { router })
    .use(router)
    .component('v-select', vSelect)
    .mount('#app')

