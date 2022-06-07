import FormViewVue from "@/views/FormView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/form",
    },
    {
      path: "/form",
      name: "form",
      component: FormViewVue,
    },
  ],
});

export default router;
