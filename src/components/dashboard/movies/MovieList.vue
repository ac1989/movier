<template>
  <div class="movie-list-container">
    <p class="getMore" v-on:click="getMore">Not my tempo...</p>
    <div class="movie-list" v-if="movies.length > 0">
      <mv-movie-list-item
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie">
      </mv-movie-list-item>
    </div>
    <div v-else>
      <p>No more recommendations Bratski.</p>
    </div>
  </div>
</template>

<script>
import MovieListItem from './MovieListItem';

export default {
  computed: {
    movies() {
      return this.$store.getters.movies;
    },
  },
  methods: {
    getMore() {
      this.$store.dispatch('makeRecs');
    },
  },
  components: {
    'mv-movie-list-item': MovieListItem,
  },
  beforeCreate() {
    this.$store.dispatch('makeRecs');
    this.$store.dispatch('setDefaultMovie');
  },
};
</script>

<style scoped>
.movie-list-container {
  width: 90%;
  margin: auto;
}
.movie-list {
  display: flex;
  justify-content: space-around;
  align-content: center;
}

.getMore {
  flex: 1;
}

.getMore:hover {
  color: slategray;
  cursor: pointer;
}
</style>
