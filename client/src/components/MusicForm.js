import MusicButton from "./MusicButton"
import { useEffect } from "react"
import { useSelector } from "react-redux"

import styles from "./ContentMenuStyles.module.css"

const axios = require('axios')


function MusicForm(props) {
    const musicToken = localStorage.getItem("spotifyToken")
    console.log(`need the normal music token ${musicToken}`)
    const musicChoice = useSelector((state) => state.content.musicButtonChoice)

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
                var playlistZeroID = localStorage.getItem(`musicplaylistcode0`)
                console.log("playlist zero preload ID: ", playlistZeroID)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    } else {
        axios.post('/spotify-set', {
            userData: {
                musicKey: `relax ${musicChoice}`,
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
                var playlistZeroID = localStorage.getItem(`musicplaylistcode0`)
                console.log("playlist zero preload ID: ", playlistZeroID)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }



    return (
        <div className={styles.form_container}>
            <h3>Music Choice</h3>
            <h4>{`${musicChoice}`}</h4>
            <div className={styles.choice_container}>
                <div className={styles.form_choice}>
                    <MusicButton musicKeyword="Piano" />
                    <MusicButton musicKeyword="Coffee Shop" />
                    <MusicButton musicKeyword="Acoustic" />
                    <MusicButton musicKeyword="Lofi" />
                    <MusicButton musicKeyword="Yoga" />


                    <MusicButton musicKeyword="Piano" />
                    <MusicButton musicKeyword="Coffee Shop" />
                    <MusicButton musicKeyword="Acoustic" />
                    <MusicButton musicKeyword="Lofi" />
                    <MusicButton musicKeyword="Yoga" />

                    <MusicButton musicKeyword="Piano" />
                    <MusicButton musicKeyword="Coffee Shop" />
                    <MusicButton musicKeyword="Acoustic" />
                    <MusicButton musicKeyword="Lofi" />
                    <MusicButton musicKeyword="Yoga" />
                </div>
            </div>
        </div>
    )
}

export default MusicForm