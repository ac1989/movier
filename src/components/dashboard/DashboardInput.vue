// the input becomes the header
<template>
  <div :class="modeClass">
    <div class="mode-inp" v-if="mode == 'inp'">
      <input 
        type="text" 
        v-model="searchMovie"
        v-on:keyup="findMovie">
      <button class="btn-search">Search</button>
      <ul>
        <li 
        v-for="(result, index) in autoMovies.results" 
        :key="result.id"
        v-on:click="generateRec(index)">
          {{ result.title }} <span>{{ result.release_date.substring(0, 4) }}</span>
        </li>
      </ul>
    </div>
    <div class="mode-rec">
      <h2 v-on:click="returnToInput">{{ searchMovie }} \/</h2>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';

export default {
  data() {
    return {
      searchMovie: '',
      autoMovies: [],
    };
  },
  props: [
    'mode',
  ],
  methods: {
    findMovie: _.debounce(function () {
      const key = '8df45a2576b9f04343b3848be392d4ba';
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${this.searchMovie}&page=1&include_adult=false`)
        .then((res) => {
          this.autoMovies = res.data;
        });
    }, 400),
    generateRec(index) {
      this.searchMovie = this.autoMovies.results[index].title;
      this.$store.dispatch('generatePool', this.autoMovies.results[index].id);
    },
    returnToInput() {
      if (this.mode === 'rec') {
        this.searchMovie = '';
        this.autoMovies = [];
        this.$store.dispatch('setMode', 'inp');
      }
    },
  },
  computed: {
    modeClass() {
      return `dashboard-input-${this.mode}`;
    },
  },
};
</script>

<style scoped>
.dashboard-input-rec {
  width: 90%;
  height: 100px;
  margin: auto;
  margin-bottom: 10px;
  padding: 0 10px 0 10px;
  display: flex;
}
.dashboard-input-rec:hover {
  cursor: pointer
}

.dashboard-input-tra {
  width: 800px;
  height: 300px;
  background: blue;
}

.dashboard-input-inp {
  width: 800px;
  height: 300px;
  margin: auto;
  background: red;
  display: flex;
  transform: translate3d(0, 100px, 0);
}

h2 {
  height: 40px;
  align-self: flex-end;
}

li:hover {
  cursor: pointer;
}
</style>
