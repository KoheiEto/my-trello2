import Vue from 'vue'
import VueRouter from 'vue-router'
import Board from '../components/Board.vue'
/* import Home from '../views/Home.vue' */

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'board',
    component: Board
  },
  /* {
    path: '/board',
    name: 'Board',
    component: Board
  } */
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
