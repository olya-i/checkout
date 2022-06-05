<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    totalSteps: Number,
    currentStep: Number,
  },
});
</script>

<template>
  <div class="steps-wrapper">
    <div
      v-for="step in totalSteps"
      :key="step"
      class="steps-wrapper__item"
      :class="{
        'steps-wrapper__item--filled': step - 1 <= Number(currentStep),
      }"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.steps-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 44px;

  &__item {
    width: 30%;
    height: 12px;
    gap: 24px;
    border-radius: var(--border-radius--sm);
    background-color: var(--blue--light);
    background: linear-gradient(
        to left,
        var(--blue--light) 50%,
        var(--blue) 50%
      )
      right;
    background-size: 202%;
    transition: 0.3s ease-in-out;

    &--filled {
      background-color: var(--blue);
      background-position: left;
    }
  }
}
</style>
