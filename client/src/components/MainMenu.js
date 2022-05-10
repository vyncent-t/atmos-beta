import { Link } from "react-router-dom";
import MusicForm from './MusicForm';
import VideoForm from './VideoForm';
import { useSelector } from "react-redux";
import styles from './MainMenuStyles.module.css'


function MainMenu(props) {
    const videoChoice = useSelector((state) => state.youtube.currentChoice)
    const musicChoice = useSelector((state) => state.content.musicButtonChoice)

    return (
        <div className={styles.main}>
            <div>
                <h2>Please select your content</h2>
            </div>
            <div className={styles.menu_container}>
                <MusicForm />
                <VideoForm />
            </div>
            <div className={styles.create_button_box}>
                {(videoChoice !== null && musicChoice !== "none") && <div>
                    <Link className={styles.create_button} to="/dashboard" >Create Atmos
                    </Link>
                </div>}
            </div>
        </div>
    )
}

export default MainMenu;