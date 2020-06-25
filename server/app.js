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


let rooms = [
    {
        id: 1,
        name: "VS",
        list_player: [],
        admin: "Bujang",
        genre: "7644900062"
    },
    {
        id: 2,
        name: "co-op",
        list_player: [],
        admin: "Bujang",
        genre: "7644761062"
    }
]

io.on("connection", (socket) => {
    console.log("user connected")
    socket.on("get-rooms", () => {
        io.emit("get-rooms", rooms)
    })
    socket.on("create-room",data => {
         data.id = rooms.length + 1
        rooms.push(data)
        io.emit("get-rooms", rooms)
    })
    socket.on("join-room", data => {
        console.log(data)
        socket.join(`room${data.roomId}`,() => {
            console.log(socket.rooms)
            const index = rooms.findIndex(i => i.id == data.roomId)
            if(!rooms.includes(data.playerName)){
                rooms[index].list_player.push(data.playerName)
            }
            io.emit("get-rooms", rooms)
        })
    })
    socket.on("goToPlay", data => {
        console.log(data)
        socket.broadcast.to(`room${data}`).emit("go-to-play")
    })
})

server.listen(PORT, (_) => console.log(`listening on PORT: ${PORT}`))
