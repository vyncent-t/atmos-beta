import { useDispatch } from "react-redux"
import { contentActions } from "../store/Content"
import { Fragment } from "react";

function MusicButton(props) {
    const keyword = props.musicKeyword
    const dispatch = useDispatch()

    const setMusicGenre = () => {
        dispatch(contentActions.updateMusicContent(keyword))
        console.log(`user chose ${keyword} as their music choice via button`)
    }
    return (
        <Fragment>
            <button className="btn btn-secondary" onClick={setMusicGenre}>{keyword}</button>
            &nbsp;
        </Fragment>
    )
}

export default MusicButton