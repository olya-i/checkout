<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  props: {
    label: String,
    name: String,
    modelValue: Boolean as PropType<unknown>,
    isInvalid: Boolean,
  },
  emits: ["update:modelValue", "validate"],
  computed: {
    value: {
      get() {
        return this.modelValue as boolean;
      },
      set(value: boolean) {
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
