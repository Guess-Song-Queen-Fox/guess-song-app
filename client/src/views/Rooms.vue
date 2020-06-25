<template>
  <div>
    <div class="jumbotron">
      <h1 class="display-4">Choose Your Room:</h1>
    </div>

    <div class="bg-secondary mx-3">
      <div class="row text-center">
        <div class="col-sm d-flex flex-column ml-2">
          <div class="my-3">
            <h1 style="color: white">Playing:</h1>
          </div>

          <div class="card" style="width: 18;">
            <div class="card-body">
              <h3 class="card-title">Room 1</h3>
              <br />
              <p class="card-text">Players : 2</p>
              <br />
            </div>
          </div>
          <div class="card" style="width: 18;">
            <div class="card-body">
              <h3 class="card-title">Room 2</h3>
              <br />
              <p class="card-text">Players : 2</p>
              <br />
            </div>
          </div>
          <div class="card" style="width: 18;">
            <div class="card-body">
              <h3 class="card-title">Room 3</h3>
              <br />
              <p class="card-text">Players : 2</p>
              <br />
            </div>
          </div>
        </div>

        <div class="col-sm d-flex flex-column bg-light">
          <div class="my-3"></div>
          <center>
            <div id="createRoom">
              <h1>or Create a Room:</h1>
              <br>
              <br>
              <br>
              <br>
              <form class="my-4" @submit.prevent="createRoom" autocomplete="chrome-off">
                <div class="form-group col-6">
                  <label for="newRoom" class="h2">Room Name</label>
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    name="roomname"
                    id="roomname"
                    v-model="roomname"
                    required
                  />
                </div>
                <div class="form-group col-6">
                  <label for="genre" class="h2">Genre</label>
                  <select class="form-control" v-model="genre">
                    <option value="Pop">Pop</option>
                    <option value="Rock">Rock</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Hit">Hit</option>
                    <option value="Indonesia">Indonesia</option>
                  </select>
                </div>
                <br>
                <button
                  id="addRoom"
                  class="btn btn-dark btn-lg"
                  @click="addRoom"
                  style="color:white"
                >Add New Room</button>
              </form>
              </div>
          </center>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "KANBAN!",
      emailLogin: "",
      passwordLogin: "",
      pageName: ""
    };
  },
  methods: {
    login() {
      axios({
        method: "post",
        url: "http://ka-kanban.herokuapp.com/users/login",
        data: {
          email: this.emailLogin,
          password: this.passwordLogin
        }
      })
        .then(response => {
          console.log("masuklogin");
          localStorage.setItem("access_token", response.data.access_token);
          this.$emit("emit-is-logged-in", true);
        })
        .catch(err => {
          console.log(err);
        });
    },
    register() {
      let value = "Register";
      this.$emit("emit-show-registerPage", value);
    },
    googleSign() {
      this.$gAuth
        .signIn()
        .then(res => {
          let id_token = res.getAuthResponse().id_token;
          console.log(id_token, "id_tokennn dari google");
          this.googleLogin(id_token);
        })
        .catch(err => {
          console.log;
        });
    },
    googleLogin(id_token) {
      axios({
        method: "post",
        url: "http://ka-kanban.herokuapp.com/users/googlesign",
        data: {
          id_token
        }
      })
        .then(response => {
          console.log(response, "responsedariserver");
          localStorage.setItem("access_token", response.data.data.access_token);
          this.$emit("emit-is-google-in", true);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

