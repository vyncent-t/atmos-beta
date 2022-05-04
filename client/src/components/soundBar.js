import { useEffect, useState } from "react"
const axios = require('axios')



function Soundbar() {
    let token = localStorage.getItem("spotifyToken")


    const [songAudioLevel, setAudioLevel] = useState(70)

    function volumeControl(e) {
        console.log(`setting audio level ${e.target.value}`)
        setAudioLevel(e.target.value)
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
        <div>
            <div >
                <button className="m-1 btn btn-light" onClick={() => { setAudioLevel(songAudioLevel - songAudioLevel) }}>mute</button>

                {(songAudioLevel > 0) ? (<button className="m-1 btn btn-light" onClick={() => { setAudioLevel(songAudioLevel - 10) }}>-</button >) : (<button className="m-1 btn btn-light disabled" onClick={() => { setAudioLevel(songAudioLevel - 10) }}>-</button >)}

                {(songAudioLevel < 100) ? (<button className="m-1 btn btn-light" onClick={() => { setAudioLevel(songAudioLevel + 10) }}>+</button>) : (<button className="m-1 btn btn-light disabled" onClick={() => { setAudioLevel(songAudioLevel + 10) }}>+</button>)}
            </div >
            <div className="w-25">
                <label for="musicAudio" className="form-label">Speaker {songAudioLevel}</label>
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