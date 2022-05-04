import PauseButton from "./pauseButton"
import PlayButton from "./playButton"
import ResumeButton from "./resumeButton"

import { useEffect, useState } from "react"
import SongCard from "./songCard"



const axios = require('axios')

function MusicControls(props) {

    let token = localStorage.getItem("spotifyToken")

    // next and previous logic for songs
    const [songArrayNum, setSongArrayNumber] = useState(0)
    const [songDuration, setSongDuration] = useState(0)
    const [musicPlaying, setMusicPlaying] = useState(null)
    const [musicPlayTime, setMusicPlayTime] = useState(0)
    const [autoPlayOn, setAutoPlayOn] = useState(true)

    function nextSongHandler() {
        let nextSong = parseInt(songArrayNum) + 1
        setSongArrayNumber(nextSong)
    }

    function prevSongHandler() {
        let lastSong = parseInt(songArrayNum) - 1

        setSongArrayNumber(lastSong)
    }

    const [currentSongInfo, setCurrentSongInfo] = useState(null)


    const [currentSong, setCurrentSong] = useState()


    console.log("print props for music controls")

    console.log(props)

    let musicArrayList = props.songList


    console.log("controls array")
    console.log(musicArrayList)



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
        }, [songArrayNum]
    )

    useEffect(
        () => {
            if (!currentSong) return


            playSong(currentSong.uri)
            setSongDuration((parseInt(currentSong.duration_ms)))
        }, [currentSong]
    )


    console.log("data from current song in song conrols")


    function playSong(songCode) {
        setMusicPlaying(true)
        axios.post('/spotify-play-music', {
            userData: {
                accessToken: `${token}`,
                musicURI: songCode
            }
        }).then(
            (res) => {
                console.log("play worked")
                console.log(res)
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
    }

    function pauseSong() {
        setMusicPlaying(false)
        // when the button is pressed, statement prints, token is set to a property on the userData object to be passed in to the proper route
        console.log("pausing music")
        axios.post('/spotify-pause', {
            userData: {
                accessToken: `${token}`
            }
        }).then(
            (res) => {
                console.log("pause worked")
                console.log(res)
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
    }

    function resumeSong() {
        setMusicPlaying(true)
        console.log("resume music")
        axios.post('/spotify-resume', {
            userData: {
                accessToken: `${token}`,
            }
        }).then(
            (res) => {
                console.log("resume worked")
                console.log(res)
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
    }


    function autoPlayOnHandler(song) {
        console.log("auto play now on")
        setAutoPlayOn(true)
        playSong(song)
    }

    function autoPlayOffHandler(song) {
        console.log("auto play now off")
        setAutoPlayOn(false)
        // playSong(song)
    }

    function songArrayHandle(event) {
        console.log(`now printing for array placement ${event.target.value
            }`)

        setSongArrayNumber(event.target.value)
        console.log(songArrayNum)
    }


    useEffect(
        () => {
            let interval = null
            if (musicPlaying) {
                interval = setInterval(() => {
                    setMusicPlayTime(musicPlayTime + 5000)
                }, 5000)

                if ((musicPlayTime > songDuration) && autoPlayOn) {
                    // reset the playtime to 0 for new song
                    setMusicPlayTime(0)

                    console.log("next song playing from auto play")
                    let nextSong = parseInt(songArrayNum) + 1
                    setSongArrayNumber(nextSong)
                }
            } else {
                console.log("no music playing")
            }

            return () => { clearInterval(interval) }
        }, [musicPlayTime, musicPlaying, songDuration, autoPlayOn, songArrayNum]
    )




    return (
        <div>
            {currentSong ?
                (
                    <div className="bg-info m-3 p-3">
                        <div>
                            music controls
                            <div>
                                <div>
                                    {
                                        autoPlayOn ? (
                                            <div>
                                                <button className="btn btn-success" onClick={
                                                    autoPlayOffHandler} >Disable Auto Play</button>
                                            </div>
                                        ) : <div>
                                            <button className="btn btn-success" onClick={
                                                () => { autoPlayOnHandler(currentSong.uri) }
                                            }>Enable Auto Play</button>
                                        </div>
                                    }
                                    <div>
                                        now listening to {currentSong.name} {currentSong.uri}
                                    </div>
                                </div>
                                <div>
                                    {songArrayNum > 0 &&
                                        <button className="btn btn-light m-1" onClick={prevSongHandler}>prev track</button>
                                    }

                                    {
                                        songArrayNum < 100 &&
                                        <button className="btn btn-light m-1" onClick={nextSongHandler}>next track</button>
                                    }
                                </div>

                                {musicPlaying && <div>PLAYING MUSIC</div>}
                                {!musicPlaying && <div>NO MUSIC</div>}

                                <div>
                                    current place in array {songArrayNum}
                                </div>
                                <div>
                                    current song duration {songDuration}
                                </div>
                                <div>
                                    current song play time {musicPlayTime}
                                </div>

                                <div>
                                    <button className="m-1 btn btn-light" onClick={() => { pauseSong() }}>Pause</button>
                                </div>
                                <div>
                                    <button className="m-1 btn btn-light" onClick={() => { resumeSong() }}>Resume</button>
                                </div>
                                {/* <PlayButton song={currentSong.uri} /> */}
                                {/* <PauseButton /> */}
                                {/* <ResumeButton /> */}
                            </div>
                        </div>
                        {musicArrayList &&
                            <div>
                                {musicArrayList.map(
                                    (song, index) => (
                                        <div>
                                            <SongCard
                                                place={index}
                                                arrayNum={songArrayNum}
                                                uri={song.track.uri}
                                                name={song.track.name}
                                                // album={song.track.album.name}
                                                artist={song.track.artists[0].name}
                                                id={song.track.id}
                                                href={song.track.href}
                                            />
                                            <span>
                                                <button className="btn btn-primary" value={index} onClick={songArrayHandle}>Play</button>
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        }
                    </div>
                ) :
                (<div>Loading...</div>)}
        </div>

    )
}


export default MusicControls