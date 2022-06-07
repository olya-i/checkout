<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  props: {
    label: String,
    name: String,
    modelValue: String as PropType<unknown>,
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
    placeholder(): string {
      return `Enter your ${this.label}`;
    },
  },
});
</script>

<template>
  <div class="input-wrapper">
    <label class="label">
      {{ label }}
      <input
        class="input"
        :class="{ error: isInvalid }"
        type="text"
        :name="name"
        v-model="value"
        :placeholder="placeholder"
      />
    </label>
    <div v-if="isInvalid" class="error-text">
      {{ invalidMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-wrapper {
  margin-bottom: 20px;
}
.label {
  display: block;
  font-weight: bold;
  font-size: 20px;
}

.input {
  display: block;
  margin-top: 4px;
  padding: 12px 20px;
  border-radius: var(--border-radius--sm);
  transition: 0.2s ease-in;
  font-size: 20px;
  border: 1px solid var(--gray--dark);
  color: var(--dark);
  background: var(--white);
  width: 100%;

  &:hover {
    border-color: var(--blue);
  }

  &:focus {
    outline: 2px solid var(--blue--dark);
    border-color: var(--blue--dark);
  }

  &::placeholder {
    color: var(--gray--dark);
  }

  &.error {
    border-color: var(--red);
    outline-color: var(--red);
  }
}

.error-text {
  color: var(--red);
  font-size: 20px;
}
</style>
