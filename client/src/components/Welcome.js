import { useSelector } from "react-redux"
import title from '../images/title.png';
import tv from '../images/tvlogo.png';
import styles from './MainMenuStyles.module.css'

//styling


function Welcome(props) {

    const isAuth = useSelector((state) => state.spotify.isSpotifyAuth)
    console.log(`welcome comp loaded is auth ${isAuth}`)

    return (
        <div className={styles.main}>
            <img alt="" className="img-fluid" src={title}></img>
            <div className={styles.drop}>
                <img className="img-fluid mb-3" alt="" src={tv}></img>
            </div>
            <div className={styles.containerdivintro}>
                <p className={styles.text} >A Visual Auditory Experience</p>
            </div>
            {!isAuth && (
                <div className={styles.landing_about}>
                    <div>
                        <p className={styles.texts} >*NOTE* For this app to work we need to use some of your data from a Premium Spotify account! Please note we do note keep any of the data you lend, it is only to grant access to spotify features.</p>
                    </div>
                    <div>
                        <button className={styles.create_button} onClick={props.userWelcome}>Agree</button>
                    </div>
                </div>)}
            {isAuth && (<div className={styles.landing_about}>
                <div>
                    <p className={styles.texts} >*NOTE* Thank you! You will need to be redirected to the spotify website in order to obtain your credentials, you will be redirected back once you're done!</p>
                </div>
                <div>
                    <button className={styles.create_button} onClick={props.onRedirect}>Authorize on Spotify</button>
                </div>
            </div>)}
        </div>
    )
}

export default Welcome