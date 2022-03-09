import { Link } from "react-router-dom";
import MusicForm from './MusicForm';
import VideoForm from './VideoForm';
import { useSelector } from "react-redux";
import styles from './MainMenuStyles.module.css'


function MainMenu(props) {
    const videoChoice = useSelector((state) => state.youtube.currentChoice)
    const musicChoice = useSelector((state) => state.content.musicButtonChoice)

    return (
        <div className={styles.mainMenu}>
            <h2>Please select your content</h2>
            <div className={styles.formContainer}>
                <MusicForm />
                <VideoForm />
            </div>
            {(videoChoice !== "none" && musicChoice !== "none") && <div>
                <div>
                    <Link to="/dashboard" className="m-3 btn btn-success">Create Atmos
                    </Link>
                </div>
            </div>}
        </div>
    )
}

export default MainMenu;