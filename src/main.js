import { createApp } from 'vue'
import './index.css';
import App from './App.vue';

import mitt from 'mitt';

const emiter = mitt();

export default emiter;

const app = createApp(App)

app.mount('#app')
