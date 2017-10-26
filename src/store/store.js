import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import dummyData from '../data/data';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mode: 'inp',
    recMovies: dummyData.results,
    selectedMovie: dummyData.results[1],
  },
  getters: {
    mode: state => state.mode,
    movies: state => state.recMovies,
    selectedMovie: state => state.selectedMovie,
  },
  mutations: {
    SELECT_MODE(state, mode) {
      state.mode = mode;
    },
    SELECT_MOVIE(state, movie) {
      state.selectedMovie = movie;
    },
  },
  actions: {
    setMode({ commit }, mode) {
      commit('SELECT_MODE', mode);
    },
    setSelectedMovie({ commit }, movie) {
      commit('SELECT_MOVIE', movie);
    },
    generateRec({ commit }, movieId) {
      const apiUrl = 'https://api.themoviedb.org/3/';
      const key = '8df45a2576b9f04343b3848be392d4ba';
      axios.get(`${apiUrl}movie/${movieId}?api_key=${key}&append_to_response=credits,keywords`)
        .then((res) => {
          const getMovieByActor01 = () => {
            const actor = res.data.credits.cast[0].id;
            return axios.get(`${apiUrl}discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_cast=${actor}`);
          };
          const getMovieByActor02 = () => {
            const actor = res.data.credits.cast[1].id;
            return axios.get(`${apiUrl}discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_cast=${actor}`);
          };

          console.log(res);
          console.log(`Search for movie starring ${res.data.credits.cast[0].name}`);
          console.log(`Search for movie in genre ${res.data.genres[0].name}`);
          console.log(`Search for movie starring ${res.data.credits.cast[1].name}`);
          console.log(`Search for movie with keyword ${res.data.keywords.keywords[0].name}`);
          console.log(`Search for movie from company ${res.data.production_companies[0].name}`);

          axios.all([getMovieByActor01(), getMovieByActor02()])
            .then(axios.spread((actor01, actor02) => {
              console.log(actor01);
              console.log(actor02);
            }));
        });
    },
  },
});
