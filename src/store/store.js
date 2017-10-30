import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mode: 'inp',
    recRating: 8,
    recStage: 0,
    recMoviePool: {},
    recMovies: [],
    selectedMovie: {},
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
    SET_DEFAULT_MOVIE(state) {
      state.selectedMovie = state.recMovies[0];
    },
    SET_MOVIE_POOL(state, moviePool) {
      state.recMoviePool = moviePool;
    },
    SET_REC_MOVIES(state, movieArray) {
      state.recMovies = movieArray;
    },
  },
  actions: {
    setMode({ commit }, mode) {
      commit('SELECT_MODE', mode);
    },
    setSelectedMovie({ commit }, movie) {
      commit('SELECT_MOVIE', movie);
    },
    setDefaultMovie({ commit }) {
      commit('SET_DEFAULT_MOVIE');
    },
    makeRecs({ commit }) {
      // take the movie pool
      const pool = this.state.recMoviePool;
      const movieArray = [];
      const generationLoop = () => {
        const totalPoolSize = () => {
          let total = 0;
          Object.keys(pool).forEach((key) => {
            total += pool[key].length;
          });
          return total;
        };
        const arrayFull = () => {
          const poolSize = totalPoolSize();
          if (movieArray.length === 5 || poolSize < 5) {
            return true;
          }
          return false;
        };

        if (pool.director.length >= 1 && !arrayFull()) {
          movieArray.push(pool.director[0]);
          pool.director.splice(0, 1);
        }

        if (pool.director.length >= 1 && !arrayFull()) {
          movieArray.push(pool.director[0]);
          pool.director.splice(0, 1);
        }

        if (pool.genres.length >= 1 && !arrayFull()) {
          movieArray.push(pool.genres[0]);
          pool.genres.splice(0, 1);
        }

        if (pool.actors.length >= 1 && !arrayFull()) {
          movieArray.push(pool.actors[0]);
          pool.actors.splice(0, 1);
        }

        if (pool.writer.length >= 1 && !arrayFull()) {
          movieArray.push(pool.writer[0]);
          pool.writer.splice(0, 1);
        }

        if (pool.productions.length >= 1 && !arrayFull()) {
          movieArray.push(pool.productions[0]);
          pool.productions.splice(0, 1);
        }

        if (!arrayFull()) {
          generationLoop();
        }
      };
      generationLoop();

      commit('SET_REC_MOVIES', movieArray);

      // if the array.length isn't > 4
        // do it all again
    },
    generatePool({ commit }, movieId) {
      const API_URL = 'https://api.themoviedb.org/3/';
      const API_KEY = '?api_key=8df45a2576b9f04343b3848be392d4ba';
      const DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie';
      const COMMON_OPTS = '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';

      let minRating = 7;

      axios.get(`${API_URL}movie/${movieId}${API_KEY}&append_to_response=credits`)
        .then((res) => {
          let flagHorror = false;
          let flagFamily = false;

          // *** Perhaps there is a better way to build request strings?
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
          }
          if (res.data.genres.find(genre => genre.name === 'Family')) {
            flagFamily = true;
          }
          const getMoviesByActor = () => {
            const actors = res.data.credits.cast.slice(0, 2);
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
            return axios.get(`${queryString}&append_to_response=credits`);
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

          const getMoviesByDirector = () => {
            const director = res.data.credits.crew.find(member => member.job === 'Director');
            const directorString = `&with_crew=${director.id}`;
            const queryString = makeDiscoverReqString(directorString);
            return axios.get(queryString);
          };

          const getMoviesByWriter = () => {
            let writer = {};
            if (res.data.credits.crew.find(member => member.job === 'Screenplay')) {
              writer = res.data.credits.crew.find(member => member.job === 'Screenplay');
            } else if (res.data.credits.crew.find(member => member.job === 'Writer')) {
              writer = res.data.credits.crew.find(member => member.job === 'Writer');
            }
            res.data.credits.crew.find(member => member.job === 'Screenplay');
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
                actors: actors.data.results,
                genres: genres.data.results,
                productions: productions.data.results,
                director: director.data.results,
                writer: writer.data.results,
              };

              // Remove Garbage Movies
              Object.keys(resultsObject).forEach((key) => {
                resultsObject[key] = resultsObject[key].filter(
                  movie => movie.vote_average > minRating && movie.vote_count > 200);
              });

              // Remove The Queried Movie
              Object.keys(resultsObject).forEach((key) => {
                resultsObject[key] = resultsObject[key].filter(movie => movie.id !== movieId);
              });

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

              Object.keys(resultsObject).forEach((key) => {
                resultsObject[key] = resultsObject[key].sort(sortByScore);
              });

              // Remove Duplicates
              let allowOne = true;
              const removeDupesFromArr = (movieToMatch, arrayToCheck, key) => {
                const filtered = arrayToCheck.filter((arrayItem) => {
                  if (movieToMatch.id === arrayItem.id && allowOne) {
                    allowOne = false;
                    return true;
                  }
                  if (movieToMatch.id === arrayItem.id) {
                    return false;
                  }
                  return true;
                });
                resultsObject[key] = filtered;
              };

              const removeDupesFromAll = (movieToMatch, dataObjectToProcess) => {
                const keys = Object.keys(dataObjectToProcess);
                keys.forEach((key) => {
                  removeDupesFromArr(movieToMatch, resultsObject[key], key);
                });
                allowOne = true;
              };

              Object.keys(resultsObject).forEach((x) => {
                resultsObject[x].forEach((item) => {
                  removeDupesFromAll(item, resultsObject);
                });
              });

              commit('SET_MOVIE_POOL', resultsObject);
              commit('SELECT_MODE', 'rec');
            }));
        });
    },
  },
});
