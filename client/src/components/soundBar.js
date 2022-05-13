import { useEffect, useState } from "react"


import styles from "./SoundBarStyles.module.css"
import MusicOffIcon from '@mui/icons-material/MusicOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import { style } from "@mui/system";

const axios = require('axios')



function Soundbar() {
    let token = localStorage.getItem("spotifyToken")


    const [songAudioLevel, setAudioLevel] = useState(70)

    const [isMute, setIsMute] = useState(false)

    function volumeControl(e) {
        console.log(`setting audio level ${e.target.value}`)
        setAudioLevel(e.target.value)
    }

    function muteOnHandler(muteAudio) {
        setIsMute(true)
        setAudioLevel(songAudioLevel - songAudioLevel)
    }


    function muteOffHandler(muteAudio) {
        setIsMute(false)
        setAudioLevel(songAudioLevel + 50)
    }



    useEffect(
        () => {
            try {
                axios.post('/spotify-control-audio', {
                    userData: {
                        accessToken: `${token}`,
                        level: songAudioLevel
                    }
                }).then(
                    (res) => {
                        console.log(`volume set ${songAudioLevel}`)
                        console.log(res)
                    }
                ).catch(
                    (err) => {
                        console.log(err)
                    }
                )
            } catch (error) {
                console.log(error)
            }
        }, [songAudioLevel, token]
    )

    return (
        <div className={style.audio_container}>
            <div className={styles.audio_button_box}>

                {!isMute ? (<div>
                    <button className={styles.audio_button} onClick={() => { muteOnHandler() }}><MusicOffIcon /></button>
                </div>) : <div>
                    <button className={styles.audio_button} onClick={() => { muteOffHandler() }}><MusicNoteIcon /></button>
                </div>}


                {(songAudioLevel > 0) ? (<button className={styles.audio_button} onClick={() => { setAudioLevel(songAudioLevel - 10) }}><VolumeDownIcon /></button >) : (<button className={styles.disabled_button} onClick={() => { setAudioLevel(songAudioLevel - 10) }}><VolumeDownIcon /></button >)}

                {(songAudioLevel < 100) ? (<button className={styles.audio_button} onClick={() => { setAudioLevel(songAudioLevel + 10) }}><VolumeUpIcon /></button>) : (<button className={styles.disabled_button} onClick={() => { setAudioLevel(songAudioLevel + 10) }}><VolumeUpIcon /></button>)}
            </div >
            <div className={styles.audio_slider}>
                <label for="musicAudio" >Volume {songAudioLevel}</label>
                <input
                    type="range"
                    className="form-range"
                    onChange={volumeControl}
                    id="musicAudio"
                    value={songAudioLevel}
                    min="0"
                    max="100"
                    step="10"
                />
            </div>
        </div>
    )
}

export default Soundbar