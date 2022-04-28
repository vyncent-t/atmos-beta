const axios = require('axios')




// need to rework props so that when song component is made, the song info is passed into the props

// use something like trackInfo={track.uri} on the song component once its finished (or something like that)
function PlayButton(props) {

    let token = localStorage.getItem("spotifyToken")



    // **********************
    // console.log("printing from play button")
    // replace props.whatever.we to correct data format
    // console.log(props.songURI)
    // replace this too
    // **********************



    function playButtonHandler() {

        console.log("playing music")

        // replace the rest
        // console.log(musicList)
        // console.log(musicList[0].track.uri)
        // let trackZero = musicList[0].track.uri
        axios.post('/spotify-play-music', {
            userData: {
                accessToken: `${token}`,
                musicURI: props.songURI
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
            <button onClick={playButtonHandler} className="btn btn-primary m-3">{words}</button>
        </div>

    )
}




export default PlayButton