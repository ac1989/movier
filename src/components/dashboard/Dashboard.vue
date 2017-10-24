<template>
  <div class="dashboard">
    <mv-dashboard-input :mode="mode"></mv-dashboard-input>
    <p>Mode: {{ mode }}</p>
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
  },
  components: {
    'mv-dashboard-input': DashboardInput,
    'mv-movie-list': MovieList,
    'mv-movie-description': MovieDescription,
  },
};
</script>
