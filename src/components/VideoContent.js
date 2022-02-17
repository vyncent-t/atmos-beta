import { useState } from "react"
import YouTube from "react-youtube"
import styles from '../components/MainMenuStyles.module.css'

var getYouTubeID = require('get-youtube-id')

function VideoContent() {

    let totalVideoAvailable = localStorage.getItem("videocodelength")
    const [arrayNum, setArrayNumber] = useState(0)

    function nextHandler() {
        setArrayNumber(arrayNum + 1)
    }

    function prevHandler() {
        setArrayNumber(arrayNum - 1)
    }

    function onReady(e) {
        // access to player in all event handlers via event.target
        e.target.playVideo();
        e.target.setVolume(40)
    }

    let youtubeFullCode = localStorage.getItem(`videocontentcode${arrayNum}`)
    let currentVideo = youtubeFullCode

    var youtubeCode = getYouTubeID(currentVideo)

    if (arrayNum < -1) {
        nextHandler()
    }

    const opts = {
        height: '520',
        width: '1080',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            setVolume: 50
        },
    }

    return (
        <div className="card bg-dark m-4 rounded ">
            {/* <p>current array item: {arrayNum}</p>
            <p>current array length: {youtubeArray.length}</p>
            <p>{youtubeArray[0]}</p> */}
            <div className="card-body bg-dark mx-5 d-flex justify-content-center btn-group">
                <div >
                    {arrayNum > 0 && <button className="btn btn-outline-light" onClick={prevHandler}>back</button>}
                    {arrayNum < totalVideoAvailable - 1 && <button className="btn btn-outline-light" onClick={nextHandler}>next video</button>}
                </div>
            </div>
            <div>
                <YouTube videoId={youtubeCode} opts={opts} onReady={onReady} />
                {/* <iframe width="560" height="315"
                    src={currentVideo} title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                </iframe> */}
            </div>
        </div>

    )
}

export default VideoContent