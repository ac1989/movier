import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import dummyData from '../data/data';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mode: 'inp',
    recRating: 8,
    recStage: 0,
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
      const API_URL = 'https://api.themoviedb.org/3/';
      const API_KEY = '?api_key=8df45a2576b9f04343b3848be392d4ba';
      const DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie';
      const COMMON_OPTS = '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';

      let minRating = 6;

      axios.get(`${API_URL}movie/${movieId}${API_KEY}&append_to_response=credits,keywords`)
        .then((res) => {
          console.log(res);
          let flagHorror = false;
          let flagFamily = false;

          const makeDiscoverReqString = (query, criteria) => {
            let string = `${DISCOVER_URL}${API_KEY}${COMMON_OPTS}${query}`;
            if (flagHorror && criteria === 'genre') {
              string = `${DISCOVER_URL}${API_KEY}${COMMON_OPTS}
              &with_genres=27`;
              minRating = 5.5;
            }
            if (flagHorror) {
              string += '&certification_country=US&certification=R';
            }
            if (flagFamily) {
              string += '&certification_country=US&certification.lte=G';
            }
            return string;
          };

          if (res.data.genres.find(genre => genre.name === 'Horror')) {
            flagHorror = true;
            console.log(flagHorror);
            console.log('It\'s a spooky film');
          }
          if (res.data.genres.find(genre => genre.name === 'Family')) {
            flagFamily = true;
            console.log(flagFamily);
            console.log('Fun for all the family');
          }
          const getMoviesByActor = () => {
            const actors = res.data.credits.cast.slice(0, 3);
            let actorString = '&with_cast=';
            actors.forEach((actor) => {
              actorString += `${actor.id}|`;
            });
            actorString = actorString.substring(0, actorString.length - 1);
            const queryString = makeDiscoverReqString(actorString);
            return axios.get(queryString);
          };

          const getMovieByGenre = () => {
            const genres = res.data.genres.slice(0, 3);
            let genreString = '&with_genres=';
            genres.forEach((genre) => {
              genreString += `${genre.id}|`;
            });
            genreString = genreString.substring(0, genreString.length - 1);
            const queryString = makeDiscoverReqString(genreString, 'genre');
            return axios.get(queryString);
          };

          const getMoviesByPCs = () => {
            const productionCompanies = res.data.production_companies;
            let pCString = '&with_companies=';
            productionCompanies.forEach((item) => {
              pCString += `${item.id}|`;
            });
            pCString = pCString.substring(0, pCString.length - 1);
            const queryString = makeDiscoverReqString(pCString);
            return axios.get(queryString);
          };

          // *** ADD A DIRECTORIAL CRITERIA
          const getMoviesByDirector = () => {
            const director = res.data.credits.crew.find(member => member.job === 'Director');
            const directorString = `&with_crew=${director.id}`;
            const queryString = makeDiscoverReqString(directorString);
            return axios.get(queryString);
          };

          const getMoviesByWriter = () => {
            const writer = res.data.credits.crew.find(member => member.job === 'Screenplay');
            console.log(writer);
            const writerString = `&with_crew=${writer.id}`;
            const queryString = makeDiscoverReqString(writerString);
            return axios.get(queryString);
          };

          axios.all([
            getMoviesByActor(),
            getMovieByGenre(),
            getMoviesByPCs(),
            getMoviesByDirector(),
            getMoviesByWriter(),
          ])
            .then(axios.spread((actors, genres, productions, director, writer) => {
              const resultsObject = {
                actors: [],
                genres: [],
                productions: [],
                director: [],
                writer: [],
              };
              // Remove Garbage Movies
              resultsObject.actors = actors.data.results.filter(
                movie => movie.vote_average > minRating && movie.vote_count > 200);
              resultsObject.genres = genres.data.results.filter(
                movie => movie.vote_average > minRating && movie.vote_count > 200);
              resultsObject.productions = productions.data.results.filter(
                movie => movie.vote_average > minRating && movie.vote_count > 200);
              resultsObject.director = director.data.results.filter(
                movie => movie.vote_average > minRating && movie.vote_count > 200);
              resultsObject.writer = writer.data.results.filter(
                movie => movie.vote_average > minRating && movie.vote_count > 200);

              // Sort By Score
              const sortByScore = (a, b) => {
                if (a.vote_average < b.vote_average) {
                  return 1;
                }
                if (b.vote_average < a.vote_average) {
                  return -1;
                }
                return 0;
              };
              resultsObject.actors = resultsObject.actors.sort(sortByScore);
              resultsObject.genres = resultsObject.genres.sort(sortByScore);
              resultsObject.productions = resultsObject.productions.sort(sortByScore);
              console.log(resultsObject);
              // Make Mutation To Set recMovies
            }));
        });
    },
  },
});
