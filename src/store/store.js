import Vue from 'vue';
import Vuex from 'vuex';
import dummyData from '../data/data';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mode: 'rec',
    recMovies: dummyData,
  },
  getters: {
    mode: state => state.mode,
  },
});
