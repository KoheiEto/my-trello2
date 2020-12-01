import Vue from 'vue'
import VueRouter from 'vue-router'
import Board from '../views/Board.vue'
import Home from '../views/Home.vue'
import CardEdit from '../views/CardEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/board',
    name: 'board',
    component: Board
  },
  {
    path: '/list/:list_id?/edit',
    name: 'card_edit',
    component: CardEdit
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
