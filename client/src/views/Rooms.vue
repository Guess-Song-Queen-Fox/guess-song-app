<template>
  <div>
    <div class="jumbotron">
      <h1 class="display-4">Choose Your Room:</h1>
    </div>

    <div class="choose1">
      <div class="row text-center h-100">
        <div class="col-sm d-flex flex-column bg-primary">
          <div class="my-3">
            <h1>Pop</h1>
          </div>
        </div>

        <div class="col-sm d-flex flex-column bg-warning">
          <div class="my-3">
            <h1>Rock</h1>
          </div>
        </div>

        <div class="col-sm d-flex flex-column bg-light">
          <div class="my-3">
            <h1>Jazz</h1>
          </div>
        </div>
      </div>
    </div>

    <div class="choose2">
      <div class="row text-center h-100">
        <div class="col-sm d-flex flex-column bg-success">
          <div class="my-3">
            <h1>Indonesia</h1>
          </div>
        </div>

        <div class="col-sm d-flex flex-column bg-danger">
          <div class="my-3">
            <h1>Rock</h1>
          </div>
        </div>

        <div class="col-sm d-flex flex-column bg-info">
          <div class="my-3">
            <h1>Jazz</h1>
          </div>
        </div>
      </div>
    </div>

    <br />
    <img alt="mic" src="../assets/mic.png" width="100" />
    <img alt="mic" src="../assets/mic.png" width="100" />
    <img alt="mic" src="../assets/mic.png" width="100" />
    <img alt="mic" src="../assets/mic.png" width="100" />
    <img alt="mic" src="../assets/mic.png" width="100" />
    <img alt="mic" src="../assets/mic.png" width="100" />
    <img alt="mic" src="../assets/mic.png" width="100" />
    <img alt="mic" src="../assets/mic.png" width="100" />
    <img alt="mic" src="../assets/mic.png" width="100" />
    <img alt="mic" src="../assets/mic.png" width="100" />
    <img alt="mic" src="../assets/mic.png" width="100" />
    <img alt="mic" src="../assets/mic.png" width="100" />
    <img alt="mic" src="../assets/mic.png" width="100" />
    <img alt="mic" src="../assets/mic.png" width="100" />
    <br />
    <br />
    <br />
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
    getUsername() {
      this.$router.push("./rooms");
      socket.emit("send-username", this.username);
    }
  },
  created() {
    socket.on("new-player", response => {
      console.log("listening dari server");
    });
  }
};
</script>
