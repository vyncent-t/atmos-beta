import { useDispatch } from "react-redux"
import { youtubeActions } from "../store/YouTubeState"
import { Fragment } from "react"
import styles from "./ContentMenuStyles.module.css"


function VideoButton(props) {
    const keyword = props.videoKeyword
    const dispatch = useDispatch()

    const setVideoGenre = () => {
        dispatch(youtubeActions.updateChosen(keyword))
        console.log(`user chose ${keyword} as their video choice via button`)
    }
    return (
        <div className={styles.choice_button_box}>
            <button className={styles.choice_button} onClick={setVideoGenre}>{keyword}</button>
        </div >
    )
}

export default VideoButton