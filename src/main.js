/* eslint-disable no-unused-vars */
import { createApp } from 'vue'
import App from './App.vue'

import { computed } from 'vue'


//import css
import './assets/css/app.css'

//import router
import router from './router'


import {  registerLicense } from '@syncfusion/ej2-base';
registerLicense("  ")



import togglebutton from './pages/components/togglebutton'





const app = createApp(App);


app.use(router);
    app.mount('#app')


app.component('togglebutton', togglebutton)




