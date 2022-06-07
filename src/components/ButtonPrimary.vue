<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    text: String,
    disabled: Boolean,
  },
  emits: ["onClick"],
});
</script>

<template>
  <button class="button" @click="$emit('onClick')" :disabled="disabled">
    {{ text }}
  </button>
</template>

<style lang="scss" scoped>
.button {
  border: 1px solid var(--blue);
  padding: 12px 20px;
  cursor: pointer;
  font-size: 20px;
  border-radius: var(--border-radius--sm);
  color: var(--white);
  background-color: var(--blue);
  transition: 0.2s ease-in;

  &:hover {
    background-color: var(--blue--dark);
    border-color: var(--blue--dark);
  }

  &:focus {
    outline: 2px solid var(--blue--dark);
    border-color: var(--blue--dark);
  }

  &:disabled {
    background-color: var(--gray--dark);
    border-color: var(--gray--dark);
    cursor: not-allowed;
  }
}
</style>
