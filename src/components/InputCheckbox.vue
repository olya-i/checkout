<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    label: String,
    name: String,
    modelValue: Boolean,
    isInvalid: Boolean,
  },
  emits: ["update:modelValue", "validate"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value: string) {
        this.$emit("update:modelValue", value);
        this.$emit("validate");
      },
    },
  },
});
</script>

<template>
  <div class="checkbox-wrapper">
    <label class="label" :class="{ error: isInvalid }">
      <input type="checkbox" :name="name" v-model="value" />
      {{ label }}
    </label>
  </div>
</template>

<style lang="scss" scoped>
.checkbox-wrapper {
  margin-bottom: 20px;
}
.label {
  font-size: 20px;

  &.error {
    color: var(--red);
  }
}
</style>
