import React, { Fragment, useEffect } from "react";

import { useState } from "react"
import SongSection from "./SongSection";

import styles from "./PlaylistSectionStyles.module.css"

const axios = require('axios')



function PlaylistSection(props) {

    const [isLoading, setIsLoading] = useState(true)

    // use state in order to select a playlist id from local storage
    const [playlistArrayNum, setPlaylistArrayNumber] = useState(0)

    function nextPlaylistHandler() {
        setPlaylistArrayNumber(playlistArrayNum + 1)
    }

    function prevPlaylistHandler() {
        setPlaylistArrayNumber(playlistArrayNum - 1)
    }

    // if (playlistArrayNum < -1) {
    //     nextPlaylistHandler()
    // }

    // if (playlistArrayNum > 10) {
    //     prevPlaylistHandler()
    // }


    const [playlistInfo, setPlaylistInfo] = useState({})


    let songList = []


    var accessToken = localStorage.getItem("spotifyToken")

    var playlistID = localStorage.getItem(`musicplaylistcode${playlistArrayNum}`)
    console.log(`current spotify playlist`, playlistID)

    const [currentPlaylist, setCurrentPlaylist] = useState(playlistID)
    console.log("CURRENT PLAYLIST", currentPlaylist)


    function updateSongList(array) {
        let songList = array
        console.log("song array")
        console.log(songList)
        return songList
    }


    useEffect(
        () => {
            setCurrentPlaylist(playlistID)
            console.log("playlist ID taken from local storage", playlistID)
            // function updatePlaylistCode(ID){
            //     setCurrentPlaylist(playlistID)
            //     return playlistID
            // }

            // updatePlaylistInfo()
            // axios calls whenever the playlistID changes
            axios.post('/spotify-playlist', {
                userData: {
                    playlistID: `${playlistID}`,
                    accessToken: `${accessToken}`
                }
            }).then(
                (res) => {
                    console.log("setting is loading to false")
                    setIsLoading(false)
                    console.log(`music playlist res ID ${playlistID}`, res)
                    // the following is printed on the browser console
                    console.log(`below is the whole res`)
                    // response print from the spotify custom you need to expand in browser console
                    console.log(res)
                    console.log("THE LINE ABOVE IS THE RES FROM THE SPOTIFY CUSTOM YOU NEED TO EXPAND IT INTO DATA THEN PLAYLISTS")
                    // NEED TO FORMAT AS STRING COMMA OBJECT FOR IT TO READ IN CONSOLE
                    console.log(`reading music playlist res: `, res.data)

                    // now we will need a way to use the tracks within the playlist located as res.data.tracks.items

                    // var playlistMusicItems = res.data
                    // var playlistCodes = playlistMusicItems.map(playlistCode => {
                    //     return playlistCode.id
                    // })
                    // updateMusicContent(playlistCodes)

                    // updatePlaylistInfo(res.data)

                    setPlaylistInfo(
                        () => {
                            playlistInfo.name = res.data.name
                            playlistInfo.uri = res.data.uri
                            playlistInfo.description = res.data.description
                            playlistInfo.href = res.data.href
                            playlistInfo.id = res.data.id
                            playlistInfo.image = res.data.images[0].url
                            playlistInfo.external_url = res.data.external_urls
                            playlistInfo.tracks = res.data.tracks.items

                            console.log("NEW UPDATE ON PLAYLIST", playlistInfo)
                            return playlistInfo
                        }
                    )
                    updateSongList(res.data.tracks.items)

                    // cheap work around to force the component to rerender, setting the text on the page to is loading then to loading complete / incoming data
                    setIsLoading(true)
                    console.log("SET PLAYLIST IS NOW", playlistInfo)
                    setIsLoading(false)

                }
            ).catch(
                (error) => {
                    console.log("setting is loading to false")
                    setIsLoading(false)
                    console.log(error)
                }
            )
        }, [playlistID]
    )




    return (
        <Fragment>
            {isLoading && <div>Loading...</div>}
            {!isLoading &&
                <div className={styles.playlist_section}>
                    <div className={styles.playlist_card}>
                        <div className={styles.playlist_info}>
                            <div className={styles.playlist_button_box}>
                                {(playlistArrayNum > 0) && <button className={styles.playlist_button} onClick={prevPlaylistHandler}>prev playlist</button>}
                                {(playlistArrayNum < 9) && <button className={styles.playlist_button} onClick={nextPlaylistHandler}>next playlist</button>}
                            </div>
                            <div>
                                <h2 className={styles.playlist_title}>Current Playlist {playlistArrayNum}</h2>
                                <h3>{playlistInfo.name}</h3>
                            </div>
                            <img className={styles.playlist_image} src={playlistInfo.image} alt="playlist graphic" />
                        </div>
                    </div>
                    <div className={styles.playlist_song_section}>
                        {!isLoading && <SongSection trackList={playlistInfo.tracks} />}
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default PlaylistSection