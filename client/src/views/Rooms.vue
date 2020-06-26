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

          <div class="card" style="width: 18;" v-for="room in availableRooms" :key="room.id" @click="goToRooms(room.id)">
            <div class="card-body">
              <h3 class="card-title">{{room.name}}</h3>
              <br />
              <p class="card-text">Players : {{room.list_player.length}}</p>
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
                    <option value="1282483245">Pop</option>
                    <option value="7644900062">Rock</option>
                    <option value="7490833544">Anime</option>
                    <option value="3881674142">Jazz</option>
                    <option value="7644919622">Indonesia</option>
                  </select>
                </div>
                <br>
                <button
                  id="addRoom"
                  class="btn btn-dark btn-lg"
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
      genre:"",
      roomname: "",

    }
  },
  computed: {
        sockets(){
            return this.$store.state.socket
        },
        rooms(){
            return this.$store.state.rooms
        },
        availableRooms(){
          let available = this.rooms.filter(room => {
            return room.isPlay == false
          })
          return available
        }
    },
  created() {
    this.sockets.on("get-rooms", rooms => {
        console.log(rooms)
        this.$store.commit('SET_ROOMS',rooms)
    })
    this.getrooms()
  },
  methods: {
      getrooms(){
          this.sockets.emit("get-rooms")
      },
      createRoom(){
          const data = 
          {
            name: this.roomname,
            list_player: [],
            admin: localStorage.username,
            genre: this.genre
          }
          this.sockets.emit("create-room",data)
          this.roomname = ""
          this.genre = ""
      },
      goToRooms(id){
        this.$router.push(`/waiting/${id}`)
      }
  }
};
</script>

