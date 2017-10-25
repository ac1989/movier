<template>
  <div class="movie-list-item">
    <div 
      class="item-card"
      v-bind:style="{ 'background-image': `url(${posterUrl})`}"
      @click="setSelectedMovie"></div>
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

<style>
.movie-list-item {
  width: 228px;
  height: 340px;
}

.item-card {
  background-color: black;
  width: 208px;
  height: 320px;
  margin: 10px;
  background-size: cover;
  background-position: center;
  transition: all 0.2s ease-out;
}

.item-card:hover {
  transform: scale(1.06);
  transition: all 0.2s ease-out;
  cursor: pointer;
}
</style>
