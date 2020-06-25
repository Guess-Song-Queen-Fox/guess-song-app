const axios = require("axios")
const deezer_url = "http://api.deezer.com"

class ApiController {
    
    static formatSong(song) {
        let result = song.map(song => {
            let formatSong = {
                id: song.id,
                title: song.title,
                preview: song.preview
            }
            return formatSong
        })
        return result
    }
    
    static random(songs) {
        let result = []
        while(result.length < 10){
            let random = Math.floor(Math.random()*songs.length)
            result.push(songs[random]) 
        }
        return result
    }
    
    static getSongs(req, res, next) {
        axios({
            method: "get",
            url: `${deezer_url}/playlist/${req.params.category}`
        })
        .then(({data}) => {
            let songs = ApiController.formatSong(data.tracks.data)
            songs = ApiController.random(songs)
            res.status(200).json({songs})
        })
        .catch(err => {
            res.status(500).json({message: "Internal Server Error"})
        })
    }

}

module.exports = ApiController