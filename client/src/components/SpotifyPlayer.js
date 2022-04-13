import React, { Fragment } from "react";

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




    function searchPlaylist(code) {

        console.log(`reading playlist code for ${code}`)
    }




    // var accessToken = localStorage.getItem("spotifyToken")
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

                    {/* create a fetch request / axios request to our custom api point to search for and pull playlist data whenever the page renders or the playlist slot on line 25 is changed by hitting next playlist */}

                    {searchPlaylist(playlistCode)}

                    <div>

                        {/* create a list of songs component under the album component */}

                    </div>


                </div>
            </div>
        </Fragment>
    )
}

export default SpotifyMusicPlayer