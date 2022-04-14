import MusicButton from "./MusicButton"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const axios = require('axios')


function MusicForm(props) {
    var musicid = useSelector((state) => state.spotify.clientid)
    const musicToken = localStorage.getItem("spotifyToken")
    console.log(`need the normal music token ${musicToken}`)
    const musicChoice = useSelector((state) => state.content.musicButtonChoice)

    console.log(`reading ON MUSIC ID FROM STATE ${musicid}`)




    // this function will be ran within the promise of each api req below, it will take the entire response object and select the first 10 playlist items to be saved in local storage

    function updateMusicContent(content) {
        for (let i = 0; i < 10; i++) {
            localStorage.setItem(`musicplaylistcode${i}`, `${content[i]}`)
        }
    }


    // by default the fresh menu has a value of "none" for the music genre playlist, this makes the default data search for peaceful unless a music genre is clicked, making the musicChoice variable change - but the button to create a room isnt going to render unless the user clicks both music and video options

    if (musicChoice === "none") {

        axios.post('/spotify-set', {
            userData: {
                musicKey: "peaceful",
                accessToken: `${musicToken}`
            }
        }).then(
            (res) => {
                console.log(`music playlist res:`, res)
                // the following is printed on the browser console
                console.log(`user custom music for default`)
                // response print from the spotify custom you need to expand in browser console
                console.log(res)
                console.log("THE LINE ABOVE IS THE RES FROM THE SPOTIFY CUSTOM YOU NEED TO EXPAND IT INTO DATA THEN PLAYLISTS")
                // NEED TO FORMAT AS STRING COMMA OBJECT FOR IT TO READ IN CONSOLE
                console.log(`reading music playlist res: `, res.data.playlists.items)

                // now we use the function from above

                var playlistMusicItems = res.data.playlists.items
                var playlistCodes = playlistMusicItems.map(playlistCode => {
                    return playlistCode.id
                })
                updateMusicContent(playlistCodes)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    } else {
        axios.post('/spotify-set', {
            userData: {
                musicKey: `${musicChoice}`,
                accessToken: `${musicToken}`
            }
        }).then(
            (res) => {
                console.log(`music playlist res:`, res)
                // the following is printed on the browser console
                console.log(`user custom music for ${musicChoice}`)
                // response print from the spotify custom you need to expand in browser console
                console.log(res)
                console.log("THE LINE ABOVE IS THE RES FROM THE SPOTIFY CUSTOM YOU NEED TO EXPAND IT INTO DATA THEN PLAYLISTS")
                // NEED TO FORMAT AS STRING COMMA OBJECT FOR IT TO READ IN CONSOLE
                console.log(`reading music playlist res: `, res.data.playlists.items)

                // now we use the function from above

                var playlistMusicItems = res.data.playlists.items
                var playlistCodes = playlistMusicItems.map(playlist => {
                    return playlist.id
                })
                updateMusicContent(playlistCodes)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }




    // else {
    //     spotifyApi.searchPlaylists(`${musicChoice}`).then(
    //         (res) => {
    //             console.log(`music playlist res:`, res.body)
    //             var playlistMusicItems = res.body.playlists.items
    //             var playlistCodes = playlistMusicItems.map(playlist => {
    //                 return playlist.id
    //             })
    //             updateMusicContent(playlistCodes)
    //         }
    //     ).catch((err) => {
    //         console.log('Something went wrong!', err);
    //     })
    // }









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