import Vue from 'vue';
import Vuex from 'vuex';
import dummyData from '../data/data';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mode: 'rec',
    searchMovie: 'Blade Runner 2049',
    recMovies: dummyData.results,
    selectedMovie: dummyData.results[1],
  },
  getters: {
    mode: state => state.mode,
    movies: state => state.recMovies,
    selectedMovie: state => state.selectedMovie,
  },
  mutations: {
    SELECT_MOVIE(state, movie) {
      state.selectedMovie = movie;
    },
  },
  actions: {
    setSelectedMovie({ commit }, movie) {
      commit('SELECT_MOVIE', movie);
    },
  },
});
