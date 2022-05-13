import { useEffect, useState } from "react"
import YouTube from "react-youtube"
import styles from "./VideoContentStyles.module.css"

var getYouTubeID = require('get-youtube-id')

function VideoContent() {

    let totalVideoAvailable = localStorage.getItem("videocodelength")

    // create the next and prev logic for videos
    const [arrayNum, setArrayNumber] = useState(0)

    function nextHandler() {
        setArrayNumber(arrayNum + 1)
    }

    function prevHandler() {
        setArrayNumber(arrayNum - 1)
    }





    const [youtubeWidth, setYoutubeWidth] = useState((document.documentElement.clientWidth - 200))
    const [youtubeHeight, setYoutubeHeight] = useState((document.documentElement.clientHeight - 200))



    function getWindowsDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        setYoutubeWidth((width - 200))
        setYoutubeHeight((height - 200))
        return {
            width,
            height
        }
    }

    useEffect(() => {
        function handleResize() {
            getWindowsDimensions(getWindowsDimensions())
        }

        window.addEventListener('resize', handleResize)
        console.log(`youtube size ${youtubeWidth} x ${youtubeHeight}`)

        return () => window.removeEventListener('resize', handleResize)
    }, [youtubeWidth, youtubeHeight])





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

    console.log("window size " + document.documentElement.clientWidth)
    console.log("window size " + document.documentElement.clientHeight)

    // var youtubeWidth = document.documentElement.clientWidth - 200
    // var youtubeHeight = document.documentElement.clientHeight - 200

    const opts = {
        height: `${youtubeHeight}`,
        width: `${youtubeWidth}`,
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            setVolume: 50
        },
    }


    return (
        <div className={styles.video_content}>
            {/* <p>current array item: {arrayNum}</p>
            <p>current array length: {youtubeArray.length}</p>
            <p>{youtubeArray[0]}</p> */}
            <div >
                <div >
                    {arrayNum > 0 && <button className={styles.video_button} onClick={prevHandler}>prev video</button>}
                    {arrayNum < totalVideoAvailable - 1 && <button className={styles.video_button} onClick={nextHandler}>next video</button>}
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