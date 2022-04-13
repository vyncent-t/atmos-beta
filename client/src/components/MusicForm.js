import MusicButton from "./MusicButton"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import SpotifyWebApi from "spotify-web-api-node"



function MusicForm(props) {
    var musicid = useSelector((state) => state.spotify.clientid)
    const musicToken = localStorage.getItem("spotifyToken")
    const musicChoice = useSelector((state) => state.content.musicButtonChoice)

    console.log(`reading ON MUSIC ID FROM STATE ${musicid}`)

    const spotifyApi = new SpotifyWebApi()

    spotifyApi.setAccessToken(`${musicToken}`)

    useEffect(() => {
        if (musicToken === "none token") return
        spotifyApi.setAccessToken(musicToken)
    }, [musicToken])



    // this function will be ran within the promise of each api req below, it will take the entire response object and select the first 10 playlist items to be saved in local storage

    function updateMusicContent(content) {
        for (let i = 0; i < 10; i++) {
            localStorage.setItem(`musicplaylistcode${i}`, `${content[i]}`)
        }
    }


    // by default the fresh menu has a value of "none" for the music genre playlist, this makes the default data search for peaceful unless a music genre is clicked, making the musicChoice variable change - but the button to create a room isnt going to render unless the user clicks both music and video options

    if (musicChoice === "none") {
        spotifyApi.searchPlaylists("peaceful").then(
            (res) => {
                // console logs the response in browser inspect
                console.log(`music playlist res:`, res.body)
                // parses into the list of playlist items
                var playlistMusicItems = res.body.playlists.items
                // maps the playlist items for their codes
                var playlistCodes = playlistMusicItems.map(playlist => {
                    return playlist.id
                })
                // runs function from before that now updates the codes into local storage to be used later
                updateMusicContent(playlistCodes)
            }
        ).catch((err) => {
            console.log('Something went wrong!', err);
        })
    } else {
        spotifyApi.searchPlaylists(`${musicChoice}`).then(
            (res) => {
                console.log(`music playlist res:`, res.body)
                var playlistMusicItems = res.body.playlists.items
                var playlistCodes = playlistMusicItems.map(playlist => {
                    return playlist.id
                })
                updateMusicContent(playlistCodes)
            }
        ).catch((err) => {
            console.log('Something went wrong!', err);
        })
    }









    return (
        <div className="card bg-dark m-4">
            <div className="card-body">
                <div className="d-flex flex-column justify-content-center">
                    <div className="card-title">
                        <h2>Music Choices</h2>
                    </div>
                    <div className="card-text">
                        <p>{`Your current music choice: ${musicChoice}`}</p>
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                        <MusicButton musicKeyword="Piano" />
                        <MusicButton musicKeyword="Coffee Shop" />
                        <MusicButton musicKeyword="Acoustic" />
                        <MusicButton musicKeyword="Lofi" />
                        <MusicButton musicKeyword="Yoga" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicForm