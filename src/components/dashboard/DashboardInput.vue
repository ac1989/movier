// the input becomes the header
<template>
  <div class="dashboard-input">
    <h2>DashBoard Input (Mode: {{ mode }})</h2>
  </div>
</template>

<script>
export default {
  props: [
    'mode',
  ],
};
</script>
