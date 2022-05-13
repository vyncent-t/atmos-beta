import { useDispatch } from "react-redux"
import { contentActions } from "../store/Content"
import styles from "./ContentMenuStyles.module.css"


function MusicButton(props) {
    const keyword = props.musicKeyword
    const dispatch = useDispatch()

    const setMusicGenre = () => {
        dispatch(contentActions.updateMusicContent(keyword))
        console.log(`user chose ${keyword} as their music choice via button`)
    }
    return (
        <div className={styles.choice_button_box}>
            <button className={styles.choice_button} onClick={setMusicGenre}>{keyword}</button>
        </div>
    )
}

export default MusicButton