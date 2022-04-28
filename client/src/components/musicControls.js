import PauseButton from "./pauseButton"
import PlayButton from "./playButton"
import ResumeButton from "./resumeButton"

import { useEffect, useState } from "react"


function MusicControls(props) {


    // next and previous logic for songs
    const [songArrayNum, setSongArrayNumber] = useState(0)

    function nextSongHandler() {
        setSongArrayNumber(songArrayNum + 1)
    }

    function prevSongHandler() {
        setSongArrayNumber(songArrayNum - 1)
    }

    // let currentSong = musicArrayList[songArrayNum]

    const [currentSongInfo, setCurrentSongInfo] = useState(null)


    const [currentSong, setCurrentSong] = useState()


    console.log("print props for music controls")

    console.log(props)

    let musicArrayList = props.songList


    // let currentSong = props.songList[songArrayNum]

    console.log("controls array")
    console.log(musicArrayList)

    // let numSongsAvailable = musicArrayList.length

    // console.log(`current music control list is ${numSongsAvailable} songs long`)



    // const [nowSong, setNowSong] = useState("now song")



    function songMaker(song) {
        console.log("song maker before setting song")
        console.log(song)
        setCurrentSong(
            () => song
        )
        console.log("currentsong after set")
        console.log(currentSong)
    }



    useEffect(
        () => {
            if (!props.songList) return


            songMaker(props.songList[songArrayNum].track)

            // if (!currentSong.track.name) return


        }, [songArrayNum]
    )


    console.log("data from current song in song conrols")


    return (
        <div>
            {currentSong ?
                (
                    <div className="bg-info m-3 p-3">
                        <div>
                            music controls
                            <div>
                                <div>
                                    <div>
                                        now listening to {currentSong.name} {currentSong.uri}
                                    </div>
                                </div>
                                <div>
                                    {songArrayNum > 0 &&
                                        <button className="btn btn-light" onClick={prevSongHandler}>prev track</button>
                                    }

                                    {
                                        songArrayNum < 100 &&
                                        <button className="btn btn-light" onClick={nextSongHandler}>next track</button>
                                    }
                                </div>
                                <PlayButton song={currentSong.uri} />
                                <PauseButton />
                                <ResumeButton />
                            </div>
                        </div>
                    </div>
                ) :
                (<div>Loading...</div>)}
        </div>

    )
}


export default MusicControls