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
              <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Players 1</h5>
                  <p class="card-text">Players Name</p>
                </div>
              </div>
              <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Players 2</h5>
                  <p class="card-text">Players Name</p>
                </div>
              </div>
              <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Players 3</h5>
                  <p class="card-text">Players Name</p>
                </div>
              </div>
              <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Players 4</h5>
                  <p class="card-text">Players Name</p>
                </div>
              </div>
            </div>
          </div>

          <h1 style="color:black">---</h1>

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
    playSong() {}
  },
  created() {}
};
</script>
