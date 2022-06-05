<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    label: String,
    name: String,
    modelValue: String,
    isInvalid: Boolean,
    invalidMessage: String,
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
  <label>
    {{ label }}
    <input type="text" :name="name" v-model="value" />
  </label>
  <div v-if="isInvalid">
    {{ invalidMessage }}
  </div>
</template>

<style scoped></style>
