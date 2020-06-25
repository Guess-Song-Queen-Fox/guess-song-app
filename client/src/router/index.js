import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import GameRoom from '../views/GameRoom.vue';
import MainMenu from '../views/MainMenu.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/lobby',
    name: 'MainMenu',
    component: MainMenu,
  },
  {
    path: '/room/:id',
    name: 'GameRoom',
    component: GameRoom,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
