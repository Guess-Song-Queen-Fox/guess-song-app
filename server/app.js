const express = require ('express')
const app = express()
const cors = require("cors")
const errorHandler =  require("./middlewares/errorHandler")
const routes = require("./routes")
// const { Socket } = require('dgram')
const PORT = process.env.PORT || 3001
const server = require("http").Server(app)
const io = require("socket.io")(server)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(routes)
app.use(errorHandler)


let rooms = []

io.on("connection", (socket) => {
    console.log("user connected")
    socket.on("get-rooms", () => {
        io.emit("get-rooms", rooms)
    })
    socket.on("create-room",data => {
        data.id = rooms.length + 1
        data.isPlay = false
        data.songs = []
        rooms.push(data)
        io.emit("get-rooms", rooms)
    })
    socket.on("join-room", data => {
        console.log(data)
        socket.join(`room${data.roomId}`,() => {
            console.log(socket.rooms)
            const index = rooms.findIndex(i => i.id == data.roomId)
            if(!rooms[index].list_player.includes(data.playerName)){
                const dataPlayer = {
                    name: data.playerName,
                    score: 0
                }
                rooms[index].list_player.push(dataPlayer)
            }
            io.emit("get-rooms", rooms)
        })
    })
    socket.on("goToPlay", data => {
        console.log(data)
        socket.broadcast.to(`room${data}`).emit("go-to-play")
        const index = rooms.findIndex(i => i.id == data)
        rooms[index].isPlay = true
        io.emit("get-rooms", rooms)
    })
    socket.on('room-play', data => {
        socket.broadcast.to(`room${data.roomId}`).emit('room-play', data.song)
    })
    socket.on('stop-song', roomId => {
        socket.broadcast.to(`room${roomId}`).emit('stop-song')
    })
    socket.on('success-guess', roomScore => {
        const index = rooms.findIndex(i => i.id == roomScore.roomId)
        rooms[index].list_player.map(player => {
            if(player.name == roomScore.username){
                player.score += 50
                console.log(rooms[index])
            }
        })
        io.to(`room${rooms[index].id}`).emit('update-score', rooms[index].list_player)
    })
    socket.on('end-game', roomId => {
        socket.broadcast.to(`room${roomId}`).emit('end-game')
    })
})

server.listen(PORT, (_) => console.log(`listening on PORT: ${PORT}`))
