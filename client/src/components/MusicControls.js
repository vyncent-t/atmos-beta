import { useEffect } from "react"
import { useState } from "react"
import SongCard from "./SongCard"
import Soundbar from "./SoundBar"
import styles from './MusicControlStyles.module.css'

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const axios = require('axios')

function MusicControls(props) {

    let token = localStorage.getItem("spotifyToken")

    // next and previous logic for songs
    const [songArrayNum, setSongArrayNumber] = useState(0)
    const [songDuration, setSongDuration] = useState(0)
    const [musicPlaying, setMusicPlaying] = useState(null)
    const [musicPlayTime, setMusicPlayTime] = useState(0)
    const [autoPlayOn, setAutoPlayOn] = useState(true)
    const [randomOn, setRandomOn] = useState(false)
    const [repeatOn, setRepeatOn] = useState(false)

    function nextSongHandler() {
        let nextSong = parseInt(songArrayNum) + 1
        setSongArrayNumber(nextSong)
    }

    function prevSongHandler() {
        let lastSong = parseInt(songArrayNum) - 1

        setSongArrayNumber(lastSong)
    }


    function randomToggler() {
        setRandomOn(!randomOn)
    }


    function repeatToggler() {
        setRepeatOn(!repeatOn)
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
            // reset the playtime to 0 for new song
            setMusicPlayTime(0)
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
                    setMusicPlayTime(musicPlayTime + 1000)
                }, 1000)

                if ((musicPlayTime >= songDuration) && autoPlayOn) {
                    // reset the playtime to 0 for new song
                    setMusicPlayTime(0)

                    console.log("next song playing from auto play")
                    let nextSong = parseInt(songArrayNum) + 1
                    setSongArrayNumber(nextSong)
                }

                if ((musicPlayTime > songDuration) && !autoPlayOn) {
                    // set song to complete time
                    setMusicPlayTime(songDuration)
                }
            } else {
                console.log("no music playing")
            }
            return () => { clearInterval(interval) }
        }, [musicPlayTime, musicPlaying, songDuration, autoPlayOn, songArrayNum]
    )


    useEffect(
        () => {
            if (repeatOn) {
                if (musicPlayTime > songDuration) {
                    playSong(currentSong.uri)
                    setSongDuration((parseInt(currentSong.duration_ms)))
                    // reset the playtime to 0 for new song
                    setMusicPlayTime(0)
                }
            }
        }, [currentSong, repeatOn, musicPlayTime, songDuration]
    )

    function millisToMinutes(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0)
        return `${minutes} : ${seconds}`
    }

    return (
        <div>
            {currentSong ?
                (
                    <div >
                        <div>
                            <div className={styles.music_controls}>
                                <div className={styles.track_controls}>
                                    {
                                        autoPlayOn ? (
                                            <div>

                                                <button className={styles.control_button} onClick={
                                                    autoPlayOffHandler} >Disable Auto Play</button>
                                            </div>
                                        ) : <div>
                                            <button className={styles.control_button} onClick={
                                                () => { autoPlayOnHandler(currentSong.uri) }
                                            }>Enable Auto Play</button>
                                        </div>
                                    }
                                    {songArrayNum > 0 &&
                                        <div>
                                            <button className={styles.control_button} onClick={prevSongHandler}>prev track</button>
                                        </div>
                                    }

                                    {
                                        songArrayNum < 100 &&
                                        <div>
                                            <button className={styles.control_button} onClick={nextSongHandler}>next track</button>
                                        </div>
                                    }
                                </div>

                                <div className={styles.track_info}>
                                    {/* <div>
                                        now listening to {currentSong.name} {currentSong.uri}
                                    </div> */}
                                    <div className={styles.track_name}>
                                        <div>Now listening to</div>
                                        <div>{currentSong.name}</div>
                                    </div>

                                    <div className={styles.track_time}>
                                        <div>
                                            {millisToMinutes(musicPlayTime)} / {millisToMinutes(songDuration)}
                                        </div>
                                        {/* <div>
                                            current place in array {songArrayNum}
                                        </div> */}
                                        {/* <div>
                                            current song duration {songDuration}
                                        </div> */}
                                        {/* <div>
                                            current song play time {musicPlayTime}
                                        </div> */}
                                    </div>


                                    <div className={styles.audio_controls}>
                                        {musicPlaying && <div>
                                            <button className={styles.control_button} onClick={() => { pauseSong() }}>
                                                <PauseIcon />
                                            </button>
                                        </div>}

                                        {!musicPlaying && <div>
                                            <button className={styles.control_button} onClick={() => { resumeSong() }}><PlayArrowIcon /></button>
                                        </div>}
                                        <Soundbar />
                                    </div>
                                </div>



                            </div>
                        </div>

                        <div className={styles.song_section}>
                            <div className={styles.song_container}>
                                <h3>Tracks</h3>
                                {musicArrayList &&
                                    <div className={styles.song_list}>
                                        {musicArrayList.map(
                                            (song, index) => (
                                                <div className={styles.song_item}>
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
                                                    <div>
                                                        <button className={styles.control_button} value={index} onClick={songArrayHandle}>Play</button>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                }
                            </div>
                        </div>

                    </div>
                ) :
                (<div>Loading...</div>)}
        </div>

    )
}


export default MusicControls