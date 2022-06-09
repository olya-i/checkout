import FormViewVue from "@/views/FormView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "form",
      component: FormViewVue,
    },
  ],
});

export default router;
