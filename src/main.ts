import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'
import { createI18n } from 'vue-i18n'
import { DataLoaderPlugin} from 'unplugin-vue-router/data-loaders'
import 'vue-select/dist/vue-select.css';
import messages from '@intlify/unplugin-vue-i18n/messages'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSun, faMoon, faSpinner, faHouse, faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

library.add(faSun, faMoon, faSpinner, faHouse, faBars, faMagnifyingGlass)

const pinia = createPinia()

const i18n = createI18n({
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'en',
    messages: messages
})

createApp(App)
    .use(i18n)
    .use(pinia)
    .use(DataLoaderPlugin, { router })
    .use(router)
    .component('v-select', vSelect)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')

