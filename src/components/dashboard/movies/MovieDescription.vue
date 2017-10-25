<template>
  <div class="movie-description">
    <div class="desc-left">
      <h1>{{ movie.title }} <span class="faint">({{ movieYear }})</span></h1>
      <p>{{ movie.overview }}</p> 
    </div>
    <div class="desc-right">
      <ul>
        <li>{{ movie.credits.cast[0].name }}</li>
        <li>{{ movie.credits.cast[1].name }}</li>
        <li>{{ movie.credits.cast[3].name }}</li>
      </ul>
      <div class="rating">{{ movie.vote_average }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'movie',
  ],
  computed: {
    movieYear() {
      return this.movie.release_date.substring(0, 4);
    },
  },
};
</script>

<style>
.movie-description {
  width: 90%;
  margin: auto;
  margin-top: 10px;
  text-align: left;
  background: rgba(0, 0, 0, .5);
  padding: 0 20px 0 20px;
}

.desc-left {
  width: 60%;
  float: left;
}

.desc-right {
  float: right;
}

.faint {
  color: slategray;
}
</style>
