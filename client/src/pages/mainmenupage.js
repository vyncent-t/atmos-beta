import MainMenu from '../components/MainMenu'
import styles from '../components/MainMenuStyles.module.css'

import AtmosNavbar from '../components/Navbar';


function MainMenuPage() {
    return (
        <div>
            <AtmosNavbar />
            <MainMenu />
        </div>
    )
}

export default MainMenuPage