import Vue from 'vue';
import Dashboard from '@/components/dashboard/Dashboard';
import DashboardInput from '@/components/dashboard/DashboardInput';

describe('Dashboard.vue', () => {
  it('should render with correct container class', () => {
    const Constructor = Vue.extend(Dashboard);
    const vm = new Constructor().$mount();
    expect(vm.$el.className).to.equal('dashboard');
  });
  it('should render DashboardInput.vue by default', () => {
    const Constructor = Vue.extend(Dashboard);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.dashboard-input').className).to.equal('dashboard-input');
  });
});

describe('DashboardInput.vue', () => {
  it('should render the correct container class', () => {
    const Constructor = Vue.extend(DashboardInput);
    const vm = new Constructor().$mount();
    expect(vm.$el.className).to.equal('dashboard-input');
  });
});
