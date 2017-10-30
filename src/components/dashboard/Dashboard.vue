<template>
  <div class="dashboard">
    <div class="back-color"></div>
    <div class="backdrop" v-bind:style="{ 'background-image': `url(${backdropUrl})` }"></div>
    <mv-dashboard-input :mode="mode"></mv-dashboard-input>
    <mv-movie-list v-if="mode == 'rec'"></mv-movie-list>
    <mv-movie-description 
      v-if="mode == 'rec'"
      :movie="selectedMovie">
    </mv-movie-description>
  </div>
</template>

<script>
import DashboardInput from './DashboardInput';
import MovieList from './movies/MovieList';
import MovieDescription from './movies/MovieDescription';

export default {
  computed: {
    mode() {
      return this.$store.getters.mode;
    },
    selectedMovie() {
      return this.$store.getters.selectedMovie;
    },
    backdropUrl() {
      // Preload image for smooth transition.
      const imgUrl = `https://image.tmdb.org/t/p/original${this.selectedMovie.backdrop_path}`;
      const image = new Image();
      image.src = imgUrl;
      image.onload = function () {
        document.querySelector('.backdrop').style.backgroundImage = `url(${imgUrl})`;
      };
    },
  },
  components: {
    'mv-dashboard-input': DashboardInput,
    'mv-movie-list': MovieList,
    'mv-movie-description': MovieDescription,
  },
};
</script>

<style>
.dashboard {
  height: 100vh;
}

.backdrop {
  height: 100vh;
  width: 100%;
  z-index: -1;
  opacity: 0.33;
  position: fixed;
  background-position: center top;
  background-size: cover;
  transition: all 0.6s ease-in-out;
}

.back-color {
  height: 100vh;
  width: 100%;
  z-index: -2;
  background: black;
  position: fixed;
}
</style>
