// the input becomes the header
<template>
  <div class="dashboard-input">
    <h2>{{ searchMovie }} \/</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchMovie: 'Blade Runner 2049',
    };
  },
  props: [
    'mode',
  ],
};
</script>

<style scoped>
.dashboard-input {
  width: 90%;
  height: 100px;
  margin: auto;
  margin-bottom: 10px;
  padding: 0 10px 0 10px;
  display: flex;
}

h2 {
  height: 40px;
  align-self: flex-end;
}
</style>
