import Vue from 'vue';
import Vuex from 'vuex';
import axios from'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socket: null,
    rooms: [],
  },
  mutations: {
    SET_SOCKET(state, payload) {
      state.socket = payload;
    },
    SET_ROOMS(state, payload){
      state.rooms = payload;
    },
    SET_SONGS(state, payload){
      const index = state.rooms.findIndex(i => i.id == payload.roomId)
      state.rooms[index].songs = payload.songs
    },
    UPDATE_SCORE(state, payload){
      const index = state.rooms.findIndex(i => i.id == payload.roomId)
      state.rooms[index].list_player = payload.list_player
    }
  },
  actions: {
    getListSongs({commit}, payload) {
      return axios({
        method: 'GET',
        url: `http://localhost:3001/songs/${payload.playlistId}`
      })
    }
  },
  modules: {
  },
});
