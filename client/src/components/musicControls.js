import PauseButton from "./pauseButton"
import PlayButton from "./playButton"
import ResumeButton from "./resumeButton"

import { useState } from "react"


function MusicControls(props) {



    console.log("print props for music controls")

    console.log(props)
    let musicArrayList = props.songList
    let numSongsAvailable = musicArrayList.length

    console.log(`current music control list is ${numSongsAvailable} songs long`)

    // next and previous logic for songs
    const [songArrayNum, setSongArrayNumber] = useState(0)

    function nextSongHandler() {
        setSongArrayNumber(songArrayNum + 1)
    }

    function prevSongHandler() {
        setSongArrayNumber(songArrayNum - 1)
    }

    let currentSong = musicArrayList[songArrayNum]


    // const [nowSong, setNowSong] = useState(currentSong)

    console.log("data from current song in song conrols")
    console.log(currentSong)
    // console.log(`name of song playing is ${currentSong.track.name}`)

    let content = "none"

    if (!currentSong) {
        content = "song name broken????"
    } else {
        content = "song name not broken"
    }


    return (
        <div className="bg-info m-3 p-3">
            <div>
                music controls
                <div>
                    <div>
                    </div>
                    <div>
                        {songArrayNum > 0 &&
                            <button className="btn btn-outline-light" onClick={prevSongHandler}>prev track</button>
                        }

                        {
                            songArrayNum < numSongsAvailable - 1 &&
                            <button className="btn btn-outline-light" onClick={nextSongHandler}>next track</button>
                        }
                    </div>
                    <PlayButton currentSongCode={"song"} />
                    <PauseButton />
                    <ResumeButton />
                </div>
            </div>
        </div>
    )
}


export default MusicControls