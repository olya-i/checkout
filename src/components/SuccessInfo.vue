<script lang="ts">
import type { IFormField, IGitHubData } from "@/types/interfaces";
import { defineComponent, type PropType } from "vue";
import IconCheck from "../components/icons/IconCheck.vue";

export default defineComponent({
  props: {
    fields: Object as PropType<{ [key: string]: IFormField }>,
    gitHubData: Object as PropType<IGitHubData>,
    isServerError: Boolean,
  },
  components: { IconCheck },
});
</script>

<template>
  <IconCheck class="icon" />
  <h1>Success!</h1>
  <div v-if="isServerError">
    <p>
      User <i>{{ fields && fields.gitHub.value }}</i> is not found in GitHub
    </p>
  </div>
  <img
    v-else
    class="user-img"
    v-bind:src="gitHubData && gitHubData.avatar_url"
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

    @media(max-width: 360px) {
      display: block;
      margin-bottom: 12px;
    }
  }

  &__item-heading {
    font-weight: bold;
    margin-right: 8px;

    @media(max-width: 360px) {
      margin-right: 0;
    }
  }
}
</style>
