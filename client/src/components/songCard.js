import PauseButton from "./pauseButton"
import PlayButton from "./playButton"
import ResumeButton from "./resumeButton"

import { useEffect, useState } from "react"


function SongCard(props) {

    const [songArrayNum, setSongArrayNumber] = useState(props.arrayNum)

    // function songArrayHandle(event) {
    //     console.log(props)
    //     console.log(`now printing for array placement ${event.target.value
    //         }`)
    //     setSongArrayNumber(event.target.value)
    //     console.log(songArrayNum)
    // }


    // function keyPrint(event) {
    //     console.log(props)
    //     console.log(`now printing for array placement ${event.target.value
    //         }`)
    // }

    return (
        <div className="card" key={props.id}>
            <div className="card-body">
                <p className="card-text">name: {props.name}</p>
                {/* <p className="card-text">album: {props.album}</p> */}
                <p className="card-text">artist: {props.artist}</p>
            </div>
            <div>
                {/* <button className="btn btn-primary" value={props.place} onClick={songArrayHandle}>Play</button> */}

                {/* <PlayButton song={props.uri} /> */}

                {/* 
                <PauseButton />
                <ResumeButton /> */}
            </div>
        </div>

    )
}


export default SongCard