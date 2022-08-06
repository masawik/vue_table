import { createApp } from 'vue';
import App from './App.vue';
import { store } from './model';

const app = createApp(App);
app.use(store);

export default app;
