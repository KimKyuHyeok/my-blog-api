import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router/index';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

// bootstrap-vue-next
import { createBootstrap } from 'bootstrap-vue-next';
import axios from 'axios';

const app = createApp(App);
const bootstrapVue = createBootstrap(app);

axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

app.use(router);
app.use(bootstrapVue);

app.mount(document.body);
