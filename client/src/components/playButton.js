const axios = require('axios')


function PlayButton(props) {

    let token = localStorage.getItem("spotifyToken")
    console.log("printing from play button")
    console.log(props.playlistInfo.tracks)

    let musicList = props.playlistInfo.tracks


    function playButtonHandler() {

        console.log("playing music")
        console.log(musicList)
        console.log(musicList[0].track.uri)
        let trackZero = musicList[0].track.uri
        axios.post('/spotify-play-music', {
            userData: {
                accessToken: `${token}`,
                musicURI: trackZero
            }
        }).then(
            (res) => {
                console.log("play worked")
                console.log(res)
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )

    }

    let words = "play music"


    return (

        <div>
            <button onClick={playButtonHandler}>{words}</button>
        </div>

    )
}




export default PlayButton