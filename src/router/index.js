import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import About from '@/components/About';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/about',
      name: 'Hello',
      component: HelloWorld,
    },
    {
      path: '/',
      name: 'About',
      component: About,
    },
  ],
});