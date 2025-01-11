import { createRouter, createWebHistory } from 'vue-router'
import PalDex from '../views/PalDex.vue'
import BreedingFormula from '../views/BreedingFormula.vue'
import AttrImage from '../views/AttrImage.vue'
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
    {
      path: '/attr_image',
      name: 'attr_image',
      component: AttrImage,
    },
  ],
})

export default router
