import { Fragment } from "react";
import MusicContent from "../components/MusicContent";
import VideoContent from "../components/VideoContent";
import AtmosNavbar from "../components/Navbar";
import styles from '../components/MainMenuStyles.module.css'



function Dashboard() {

    return (
        <Fragment>
            <AtmosNavbar />
            <div>
                <div className={styles.containerdiv}>
                    <span >
                        <VideoContent />
                        <MusicContent />
                    </span>
                </div>
            </div>
        </Fragment>
    )
}

export default Dashboard