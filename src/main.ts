import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import Relatorio from '@/components/Relatorio.vue'
import Grafico from '@/components/Grafico.vue'
import Pizza from '@/components/Pizza.vue'
import VueMultiselect from 'vue-multiselect'

import 'bootswatch/dist/materia/bootstrap.min.css'
import 'bootstrap/js/dist/tab.js'

createApp(App)
.use(router)
.component('Relatorio', Relatorio)
.component('Grafico', Grafico)
.component('Pizza', Pizza)
.component('VueMultiselect', VueMultiselect)
.mount('#app')
