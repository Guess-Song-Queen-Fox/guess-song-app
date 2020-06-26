<template>
  <div>
    <div class="home">
      <HelloWorld msg="TEBAK LAGU~" />
      <img alt="Vue logo" src="../assets/mic.png" width="300" />
    </div>

    <div>
      <div class="wrapper">
        <center>
          <br />
          <form class="my-4" @submit.prevent="getUsername" autocomplete="chrome-off">
            <div class="form-group col-6">
              <label for="answer" class="h2" style="color:white">Pick Your Username:</label>
              <input
                type="text"
                class="form-control form-control-lg"
                name="username"
                id="username"
                v-model="username"
                required
              />
            </div>
            <br />
            <button class="btn btn-warning btn-lg" style="color:white">Let's Play!</button>
          </form>
          <h1 style="color:black">---</h1>
        </center>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";
// import socket from "@/config/socket";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      username: ""
    };
  },
  methods: {
    getUsername(){
      this.$router.push("./rooms");
      // socket.emit("send-username", this.username);
      localStorage.setItem('username',this.username)
    }
  },
  created() {
      // const socket = io(baseUrl);
      // this.$store.commit('SET_SOCKET', socket);
  
  }
};
</script>
