<template>
  <div class="hello"></div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class Projects extends Vue {}
</script>

<style scoped>
.hello {
  width: 100px;
  height: 100px;
  background-color: red;
}
</style>
