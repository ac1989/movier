import Vue from 'vue';
import About from '@/components/About';

describe('About.vue', () => {
  it('should render with correct container class', () => {
    const Constructor = Vue.extend(About);
    const vm = new Constructor().$mount();
    expect(vm.$el.className).to.equal('about');
  });
});
