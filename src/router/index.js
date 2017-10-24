import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
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
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
  ],
});
