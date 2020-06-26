<template>
    <div>
        <ul>
            <li v-for="room in rooms" :key="room.id">{{room.name}}</li>
        </ul>
    </div>
</template>
<script>
import io from 'socket.io-client';
const baseUrl = 'http://localhost:3001';
export default {
    computed: {
        sockets(){
            return this.$store.state.socket
        },
        rooms(){
            return this.$store.state.rooms
        }
    },
  created() {
    const socket = io(baseUrl);
    this.$store.commit('SET_SOCKET', socket);
    this.sockets.on("get-rooms", rooms => {
        console.log(rooms)
        this.$store.commit('SET_ROOMS',rooms)
    })
    this.getrooms()
  },
  methods: {
      getrooms(){
          this.sockets.emit("get-rooms")
      }
  }
};
</script>
