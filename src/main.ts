// import './assets/main.css'
// import './index.css'
// import 'ant-design-vue/lib/date-picker/style/css';
// import Antd from 'ant-design-vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App).use(Antd);

app.use(router)

app.mount('#app')
