import Vue from 'vue';
import About from '@/components/Dashboard';

describe('Dashboard.vue', () => {
  it('should render with correct container class', () => {
    const Constructor = Vue.extend(About);
    const vm = new Constructor().$mount();
    expect(vm.$el.className).to.equal('dashboard');
  });
});
