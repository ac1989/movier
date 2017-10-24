<template>
  <div class="movie-list">
    <h2>Movie List Component</h2>
    <mv-movie-list-item
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie">
    </mv-movie-list-item>
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
  components: {
    'mv-movie-list-item': MovieListItem,
  },
};
</script>

