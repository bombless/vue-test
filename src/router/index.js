import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Tetris from '@/components/Tetris'
import Pacman from '@/components/Pacman'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/tetris',
      name: 'Tetris',
      component: Tetris
    },
    {
      path: '/pacman',
      name: 'Pacman',
      component: Pacman
    }
  ]
})
