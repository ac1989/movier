<template>
  <div class="movie-description">
    <div class="desc-header">
      <h1>{{ movie.title }} <span class="faint">({{ movieYear }})</span></h1>
    </div>
    <div class="desc-body">
    <div class="desc-left">
      <p>{{ movie.overview }}</p> 
      <h3>Recommendation Reason:</h3>
      <p>Cast</p>
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
  margin-bottom: 40px;
  text-align: left;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px 20px 40px 20px;
}

.desc-header {
  width: 100%;
}

.desc-body {
  display: flex;
}

.desc-left {
  flex: 3;
}

.desc-right {
  flex: 2;
  text-align: right;
}

ul {
  list-style: none;
}

.faint {
  color: slategray;
}
</style>
