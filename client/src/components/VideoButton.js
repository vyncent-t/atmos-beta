import { useDispatch } from "react-redux"
import { youtubeActions } from "../store/YouTubeState"
import { Fragment } from "react"

function VideoButton(props) {
    const keyword = props.videoKeyword
    const dispatch = useDispatch()

    const setVideoGenre = () => {
        dispatch(youtubeActions.updateChosen(keyword))
        console.log(`user chose ${keyword} as their video choice via button`)
    }
    return (
        <Fragment>
            <button className="btn btn-secondary" onClick={setVideoGenre}>{keyword}</button>
            &nbsp;
        </Fragment >
    )
}

export default VideoButton