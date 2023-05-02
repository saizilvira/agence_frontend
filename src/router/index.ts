import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: "/",
        name: "desempenho",
        component: () => import("@/views/ConDesempenho.vue")
  }],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router