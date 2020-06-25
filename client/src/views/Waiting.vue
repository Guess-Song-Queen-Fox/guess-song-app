<template>
  <div>
    <div class="header">
      <img alt="mic logo" src="../assets/waiting.png" width="75" />
      <br />
      <br />
      <h1 class="display-3" style="color:white">Be Ready</h1>
    </div>
    <br />
    <img alt="Play" src="../assets/run.png" width="200" @click="playSong" />

    <div>
      <div class="wrapper">
          <br />
          <h1 class="display-3" style="color:white">Players:</h1>
          <div class="column">
            <div class="row d-flex justify-content-between  mx-5">
              <div class="card" style="width: 18rem;" v-for="(player,index) in curentRoom.list_player" :key="index">
                <div class="card-body">
                  <h5 class="card-title">Players {{index + 1 }}</h5>
                  <p class="card-text">{{player}}</p>
                </div>
              </div>
            </div>
          </div>

          <h1 style="color:black">---</h1>
          <br />
          <button class="btn btn-warning btn-lg" style="color:white" v-if="curentRoom.admin == username" @click="goToPlay">Berpacu Dalam Melodi !</button>


      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
// import socket from "@/config/socket";

export default {
  name: "Play",
  components: {},
  data() {
    return {
      username: ""
    };
  },
  methods: {
    playSong() {},
    goToPlay() {
      this.sockets.emit("goToPlay", this.$route.params.id)
      this.$router.push(`/play/${this.$route.params.id}`)
    }
  },
  created() {
    this.username = localStorage.username
    this.sockets.on("go-to-play",() => {
      this.$router.push(`/play/${this.$route.params.id}`)
    })
    const data = {
      roomId: this.$route.params.id,
      playerName: localStorage.username
    }
    this.sockets.emit("join-room", data)
    console.log(this.curentRoom)
  },
  computed: {
        sockets(){
            return this.$store.state.socket
        },
        rooms(){
            return this.$store.state.rooms
        },
        curentRoom(){
          const index = this.rooms.findIndex(i => i.id == this.$route.params.id)
          return this.rooms[index]
        }
    }
};
</script>
