import MainMenu from '../components/MainMenu'
// import content from '../images/tvlogo.png';
import styles from '../components/MainMenuStyles.module.css'
import { Fragment } from 'react';
import AtmosNavbar from '../components/Navbar';


function MainMenuPage() {
    return (
        <Fragment>
            <AtmosNavbar />
            <div className={styles.containerdiv}>
                <MainMenu />
            </div>
        </Fragment>
    )
}

export default MainMenuPage