import AppVue from "@/App.vue";
import FormViewVue from "@/views/FormView.vue";
import SuccessViewVue from "@/views/SuccessView.vue";
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
    // {
    //   // path: "/form/:stepId?",
    //   // redirect: "/form",
    //   name: "form",
    //   // props: true,
    //   component: FormViewVue,
    // },
    // {
    //   path: "/form",
    //   name: "form",
    //   component: FormViewVue,
    // },
    // {
    //   path: "/success",
    //   name: "success",
    //   component: SuccessViewVue,
    // },
  ],
});

export default router;
