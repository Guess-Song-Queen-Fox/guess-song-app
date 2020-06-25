import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import GameRoom from '../views/GameRoom.vue';
import MainMenu from '../views/MainMenu.vue';
import Rooms from '../views/Rooms.vue';
import Play from '../views/Play.vue';
import Waiting from '../views/Waiting.vue';

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
  {
    path: '/rooms',
    name: 'Rooms',
    component: Rooms,
  },
  {
    path: '/play/:id',
    name: 'Play',
    component: Play,
  },
  {
    path: '/waiting/:id',
    name: 'Waiting',
    component: Waiting,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
