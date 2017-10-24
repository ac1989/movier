<template>
  <div class="movie-description">
    <p>{{ movie.overview }}</p>
  </div>
</template>

<script>
export default {
  props: [
    'movie',
  ],
};
</script>
