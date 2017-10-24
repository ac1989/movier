<template>
  <div 
    class="movie-list-item" 
    v-bind:style="{ background: `url(${posterUrl})`}"
    @click="setSelectedMovie">
    <p>{{ movie.title }}</p>
    <p>{{ movie.vote_average }}</p>
  </div>
</template>

<script>
export default {
  props: [
    'movie',
  ],
  computed: {
    posterUrl() {
      return `https://image.tmdb.org/t/p/original${this.movie.poster_path}`;
    },
  },
  methods: {
    setSelectedMovie() {
      this.$store.dispatch('setSelectedMovie', this.movie);
    },
  },
};
</script>
