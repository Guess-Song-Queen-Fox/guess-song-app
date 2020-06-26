<template>
  <div>
  <div v-if="!finished">
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
  <!-- winner -->
  <div v-else>
    <div class="header">
      <img alt="flag" src="../assets/finish.png" width="150" />
      <br />
      <br />
      <h1 class="display-3" style="color:white">END OF THE GAME!</h1>
    </div>
    <br />

    <div class="container">
      <div class="row">
        <div class="col">
          <div class="d-flex flex-column h-100">
            <div class="card" id="firstPanel">
              <div class="card-body">
                <div class="card-text">
                  <h1>Player {{ userRank[0].name }} is the Winner!</h1>
                  <img alt="winner logo" src="../assets/winner.png" width="500" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100" id="thirdPanel">
            <div class="card-header card-title">
              <div class="row">
                <div class="col">
                  <h1>Score Board:</h1>
                </div>
              </div>
            </div>
            <div class="card-body">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="result-summary-row" v-for="(player, index) in userRank" :key="index">
                    <td>{{player.name}}</td>
                    <td>{{player.score}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h1 style="color:black">---</h1>
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
      finished: false
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
      this.updateSongServer(this.curentRoom.songs)
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
        this.sockets.emit('end-game', this.$route.params.id)
      }
    },
    displayScore(){
      this.finished = true
      console.log('game over')
      setTimeout(() => {
        this.$router.push('/rooms')
      }, 4000)
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
    },
    updateSongServer(songs){
      const data = {
        roomId: this.$route.params.id,
        songs
      }
      this.sockets.emit('update-song', data)
    }
  },
  created() {
    this.username = localStorage.username
    this.sockets.on('end-game', () => {
      this.displayScore()
    })
    this.sockets.on('update-score', scores => {
      console.log('score updated')
      const updateScore = {
        roomId: this.$route.params.id,
        list_player: scores
      }
      this.$store.commit('UPDATE_SCORE', updateScore)
    })
    this.sockets.on('stop-song', () => {
      this.stopSong()
    })
    this.sockets.on('room-play', currSong => {
      this.currentSong = currSong
      this.playSong()
    })
    // this.sockets.on('already-guess', () => {
    //   this.stopSong()
    // })
    const payload = {
      roomId: this.$route.params.id,
      playlistId: this.curentRoom.genre
    }
    this.$store.dispatch('getListSongs', payload)
      .then(({data}) => {
          const roomData = {
            songs: data.songs,
            roomId: this.$route.params.id
          }
          this.$store.commit('SET_SONGS', roomData)
          this.updateSongServer(data.songs)
        })
        .catch(err => {
          console.log(err)
        })
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
        },
        userRank(){
          let players = this.curentRoom.list_player.sort((a,b) => b.score - a.score)
          return players
        }
    }

};
</script>
