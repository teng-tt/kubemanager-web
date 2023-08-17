<template>
  <span>
     {{ timeFormat(data)}}
  </span>

</template>

<script>
export default {
  props: {
    data: {
      type: Number
    }
  },
  name: "Timeformat",
  methods: {
    timeFormat(seconds) {
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      const remainingSeconds = seconds % 60;
      const remainingMinutes = minutes % 60;
      const remainingHours = hours % 24;

      const formattedTime = [];
      if (days > 0) {
        formattedTime.push(`${days} day(s)`);
      }
      if (remainingHours > 0) {
        formattedTime.push(`${remainingHours} hour(s)`);
      }
      if (remainingMinutes > 0) {
        formattedTime.push(`${remainingMinutes} minute(s)`);
      }
      if (remainingSeconds > 0) {
        formattedTime.push(`${remainingSeconds} second(s)`);
      }
      return formattedTime.join(', ');
    }
  }
}
</script>

<style scoped>

</style>
