import React, { Fragment, useEffect } from "react";

import { useState } from "react"

const axios = require('axios')



function SpotifySection(props) {

    const [isLoading, setIsLoading] = React.useState(true)

    // use state in order to select a playlist id from local storage
    const [arrayNum, setArrayNumber] = useState(0)

    function nextHandler() {
        setArrayNumber(arrayNum + 1)
    }

    function prevHandler() {
        setArrayNumber(arrayNum - 1)
    }

    if (arrayNum < -1) {
        nextHandler()
    }

    if (arrayNum > 10) {
        prevHandler()
    }

    // let playlist = {
    //     href: "x",
    //     id: "none",
    //     image: "y",
    //     external_url: "z"
    // }



    const [playlistInfo, setPlaylistInfo] = useState({})


    var accessToken = localStorage.getItem("spotifyToken")

    var playlistID = localStorage.getItem(`musicplaylistcode${arrayNum}`)
    console.log(`current spotify playlist`, playlistID)

    const [currentPlaylist, setCurrentPlaylist] = useState(playlistID)
    console.log("CURRENT PLAYLIST", currentPlaylist)


    function updatePlaylistInfo({ href, id, images, external_urls }) {
        setPlaylistInfo(
            () => {
                // const updatedPlaylist = { ...playlist, ...data }
                playlistInfo.href = href
                playlistInfo.id = id
                playlistInfo.image = images[0].url
                playlistInfo.external_url = external_urls.spotify

                // playlistInfo.href = data.href
                // playlistInfo.id = data.id
                // playlistInfo.image = data.image
                // playlistInfo.external_url = data.external_url
                console.log("NEW UPDATE ON PLAYLIST", playlistInfo)
                return playlistInfo
            }
        )

        // cheap work around to force the component to rerender, setting the text on the page to is loading then to loading complete / incoming data
        setIsLoading(true)
        console.log("SET PLAYLIST IS NOW", playlistInfo)
        setIsLoading(false)
    }

    // if the playlist is equal to none we set the attributes we want

    // if (playlist.id === "none") {
    //     axios.post('/spotify-playlist', {
    //         userData: {
    //             playlistID: `${playlistID}`,
    //             accessToken: `${accessToken}`
    //         }
    //     }).then(
    //         (res) => {
    //             console.log(`music playlist res ID ${playlistID}`, res)
    //             // the following is printed on the browser console
    //             console.log(`below is the whole res`)
    //             // response print from the spotify custom you need to expand in browser console
    //             console.log(res)
    //             console.log("THE LINE ABOVE IS THE RES FROM THE SPOTIFY CUSTOM YOU NEED TO EXPAND IT INTO DATA THEN PLAYLISTS")
    //             // NEED TO FORMAT AS STRING COMMA OBJECT FOR IT TO READ IN CONSOLE
    //             console.log(`reading music 0 placement playlist res: `, res.data)

    //             // now we will need a way to use the tracks within the playlist located as res.data.tracks.items

    //             let playlistZero = {
    //                 href: res.data.href,
    //                 id: res.data.id,
    //                 image: res.data.images[0].url,
    //                 external_url: res.data.external_urls.spotify,
    //             }

    //             return playlistZero
    //         })
    // }


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

                    updatePlaylistInfo(res.data)

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




    const content = isLoading ?
        (<div>...is Loading</div>)
        :
        (<div> Loading Complete {playlistInfo.href} </div>)



    return (
        <Fragment>
            <div className="d-flex flex-column justify-content-center">
                <div className="align-self-center mb-4 btn-group">
                    {arrayNum > 0 && <button className="btn btn-outline-light" onClick={prevHandler}>back</button>}
                    {arrayNum < 10 && <button className="btn btn-outline-light" onClick={nextHandler}>next playlist</button>}
                </div>




                <div>

                    {/* create a fetch request / axios request to our custom api point to search for and pull playlist data whenever the page renders or the playlist slot on line 25 is changed by hitting next playlist */}

                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">
                                <div>
                                    {content}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>

                        {/* create a list of songs component under the album component */}

                    </div>


                </div>
            </div>
        </Fragment>
    )
}

export default SpotifySection