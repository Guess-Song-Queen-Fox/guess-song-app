<template>
  <div>
    <div class="header">
      <img alt="mic logo" src="../assets/mic.png" width="75" />
      <h1 style="color:white"> Guess the Song Title!</h1>
    </div>

    <img v-if="curentRoom.admin == username && isPlay == false" alt="Play" src="../assets/play.png" width="200" @click="triggerPlay"/>

    <div>
      <div class="wrapper">
        <center>
          <br />
          <form class="my-4" v-if="isPlay" @submit.prevent="getAnswer" autocomplete="chrome-off">
            <div class="form-group col-6">
              <label for="answer" class="h2" style="color:white">Your Answer?</label>
              <input
                type="text"
                class="form-control form-control-lg"
                name="answer"
                id="answer"
                v-model="answer"
                required
              />
            </div>
            <br />
            <button class="btn btn-warning btn-lg" style="color:white">Check</button>
          </form>
          <h1 style="color:black">---</h1>
        </center>
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
  components: {
  },
  data() {
    return {
      answer: "",
      username: "",
      isPlay: false,
      currentSong: {},
      audio: null,
      timer: null,
      displayScore: false
    };
  },
  methods: {
    triggerPlay() {
      this.currentSong = this.curentRoom.songs.pop()
      this.playSong()
      const dataRoom = {
        song: this.currentSong,
        roomId: this.$route.params.id
      }
      this.sockets.emit('room-play', dataRoom)
    },
    playSong(){
      if(this.audio){
        this.audio.pause()
        this.audio = null
      }
      this.timer = setTimeout(() => {
        this.stopSong()
      },29500)
      this.audio = new Audio(this.currentSong.preview)
      console.log(this.audio)
      this.audio.play()
      this.isPlay = true
    },
    stopSong(){
      if(this.audio){
        this.audio.pause()
        this.audio = null
        this.isPlay = false
      }
      if(this.timer){
        clearTimeout(this.timer)
        this.timer = null
      }
      if(this.curentRoom.songs.length < 1){
        this.displayScore()
      }
    },
    displayScore(){
      this.displayScore = true
      console.log('game over')
    },
    getAnswer(){
      if(this.currentSong.title.toLowerCase() == this.answer.toLowerCase()){
        console.log('jawaban benar')
        this.stopSong()
        this.sockets.emit('stop-song', this.$route.params.id)
        const roomScore = {
          roomId: this.$route.params.id,
          username: this.username
        }
        this.sockets.emit('success-guess', roomScore)
      }
    }
  },
  created() {
    this.sockets.on('stop-song', () => {
      this.stopSong()
    })
    this.sockets.on('room-play', currSong => {
      this.currentSong = currSong
      this.playSong()
    })
    this.sockets.on('already-guess', () => {
      this.stopSong()
    })
    this.username = localStorage.username
    const payload = {
      roomId: this.$route.params.id,
      playlistId: this.curentRoom.genre
    }
    this.$store.dispatch('getListSongs', payload)
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
