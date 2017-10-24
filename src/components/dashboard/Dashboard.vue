<template>
  <div class="dashboard">
    <mv-dashboard-input></mv-dashboard-input>
    <p>Mode: {{ mode }}</p>
  </div>
</template>

<script>
import DashboardInput from './DashboardInput';

export default {
  computed: {
    mode() {
      return this.$store.getters.mode;
    },
  },
  components: {
    'mv-dashboard-input': DashboardInput,
  },
};
</script>
