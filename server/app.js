const expres = require ('express')
const { Socket } = require('dgram')
const app = expres()
const PORT = process.env.PORT || 3001
const server = require("http").Server(app)
const io = require("socket.io")(server)

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
})

server.listen(PORT, (_) => console.log(`listening on PORT: ${PORT}`))