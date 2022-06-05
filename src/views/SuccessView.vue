<script lang="ts">
import { defineComponent } from "vue";
import IconCheck from "../components/icons/IconCheck.vue";

export default defineComponent({
  props: {
    fields: Object,
    gitHubData: Object,
  },
  components: { IconCheck },
});
</script>

<template>
  <IconCheck class="icon" />
  <h1>Success!</h1>
  <img
    class="user-img"
    v-bind:src="gitHubData.avatar_url"
    width="180"
    height="180"
    alt="User Avatar form GitHub"
  />
  <div class="user-data">
    <div v-for="field in fields" :key="field.label">
      <div v-if="!field.private" class="user-data__item">
        <p class="user-data__item-heading">{{ field.label }}:</p>
        <p>{{ field.value }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  width: 48px;
  height: 48px;
  color: var(--blue);
}

.user-img {
  margin-top: 8px;
  border-radius: 12px;
  border: 1px solid var(--gray);
  object-fit: cover;
}

.user-data {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &__item {
    display: inline-flex;
  }

  &__item-heading {
    font-weight: bold;
    margin-right: 8px;
  }
}
</style>
