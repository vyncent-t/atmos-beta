import PauseButton from "./pauseButton"
import PlayButton from "./playButton"
import ResumeButton from "./resumeButton"



function SongCard(props) {




    return (
        <div className="card" key={props.id}>
            <div className="card-body">
                <p className="card-text">name: {props.name}</p>
                {/* <p className="card-text">album: {props.album}</p> */}
                <p className="card-text">artist: {props.artist}</p>
            </div>
            <div>
                <PlayButton songURI={props.uri} />
                <PauseButton />
                <ResumeButton />
            </div>
        </div>

    )
}


export default SongCard