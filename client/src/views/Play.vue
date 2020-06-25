<template>
  <div>
    <div class="header">
      <img alt="mic logo" src="../assets/mic.png" width="75" />
      <h1 style="color:white"> Guess the Song Title!</h1>
    </div>

    <img alt="Play" src="../assets/play.png" width="200" @click="playSong"/>

    <div>
      <div class="wrapper">
        <center>
          <br />
          <form class="my-4" @submit.prevent="getAnswer" autocomplete="chrome-off">
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
      username: ""
    };
  },
  methods: {
    playSong(){
    }
  },
  created() {
  }

};
</script>
