import MusicButton from "./MusicButton"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import SpotifyWebApi from "spotify-web-api-node"



function MusicForm(props) {
    var musicid = useSelector((state) => state.spotify.clientid)
    const musicToken = localStorage.getItem("spotifyToken")
    const musicChoice = useSelector((state) => state.content.musicButtonChoice)


    const spotifyApi = new SpotifyWebApi({
        clientId: `${musicid}`,
    })

    spotifyApi.setAccessToken(`${musicToken}`)

    useEffect(() => {
        if (musicToken === "none token") return
        spotifyApi.setAccessToken(musicToken)
    }, [musicToken])


    function updateContent(content) {
        for (let i = 0; i < 10; i++) {
            localStorage.setItem(`musicplaylistcode${i}`, `${content[i]}`)
        }
    }

    if (musicChoice === "none") {
        spotifyApi.searchPlaylists("peaceful").then(
            (res) => {
                console.log(`music playlist res:`, res.body)
                var playlistMusicItems = res.body.playlists.items
                var playlistCodes = playlistMusicItems.map(playlist => {
                    return playlist.uri
                })
                updateContent(playlistCodes)
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
                    return playlist.uri
                })
                updateContent(playlistCodes)
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