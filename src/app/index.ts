import { createApp } from 'vue';
import App from './App.vue';
import { store } from './model';
import { focus } from '@/shared/directives';

const app = createApp(App);
app.use(store);
app.directive(focus.name, focus);

export default app;
