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
    }
  },
  actions: {
    getListSongs({commit}, payload) {
      axios({
        method: 'GET',
        url: `http://localhost:3001/songs/${payload.playlistId}`
      })
        .then(({data}) => {
          const roomData = {
            songs: data.songs,
            roomId: payload.roomId
          }
          commit('SET_SONGS', roomData)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  },
});
