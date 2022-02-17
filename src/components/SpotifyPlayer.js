import React, { Fragment } from "react";
import SpotifyPlayer from 'react-spotify-web-playback';
import { useState } from "react"

function SpotifyMusicPlayer(props) {
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

    var accessToken = localStorage.getItem("spotifyToken")
    var playlistCode = localStorage.getItem(`musicplaylistcode${arrayNum}`)
    console.log(`current spotify playlist`, playlistCode)

    return (
        <Fragment>
            <div className="d-flex flex-column justify-content-center">
                <div className="align-self-center mb-4 btn-group">
                    {arrayNum > 0 && <button className="btn btn-outline-light" onClick={prevHandler}>back</button>}
                    {arrayNum < 10 && <button className="btn btn-outline-light" onClick={nextHandler}>next playlist</button>}
                </div>
                <div>
                    <SpotifyPlayer
                        initialVolume={0.15}
                        uris={[`${playlistCode}`]}
                        autoPlay={true}
                        token={`${accessToken}`}
                        showSaveIcon={true}
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default SpotifyMusicPlayer