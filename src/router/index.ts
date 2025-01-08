import { createRouter, createWebHistory } from 'vue-router'
import PalDex from '../views/PalDex.vue'
import BreedingFormula from '../views/BreedingFormula.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/paldex',
    },
    {
      path: '/paldex',
      name: 'paldex',
      component: PalDex,
    },
    {
      path: '/breeding',
      name: 'breeding',
      component: BreedingFormula,
    },
  ],
})

export default router
