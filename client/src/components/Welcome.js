import { useSelector } from "react-redux"
import title from '../images/title.png';
import tv from '../images/tvlogo.png';
import styles from './IntroStyles.module.css'

//styling


function Welcome(props) {

    const isAuth = useSelector((state) => state.spotify.isSpotifyAuth)
    console.log(`welcome comp loaded is auth ${isAuth}`)

    return (
        <div className={styles.intro_main}>
            <div className={styles.intro_about}>
                <div>
                    <h1>Welcome to Atmos</h1>
                </div>
                <div>
                    <p>Come experience a new to unwind</p>
                </div>
                {!isAuth && (
                    <div className={styles.intro_desc}>
                        <div>
                            <p>The Atmos project is a platform that allows you to enjoy both audio and visual media simultaneously to curate a relaxing environment tailored to you.</p>
                        </div>
                        <div>
                            <p>The is achieved by using the Spotify API and Youtube API in order to provide you with a set of playlists curated by your choice of the music and scenery genre.</p>
                        </div>

                        <div className={styles.intro_attention}>
                            <p>*PLEASE NOTE* The music component of this platform requires a Premium Spotify account! The Atmos Project will ask Spotify for authorization only to grant access to Spotify features.</p>
                        </div>
                        <div className={styles.intro_attention}>
                            <p>ATMOS DOES NOT KEEP ANY DATA PROVIDED</p>
                        </div>

                        <div>
                            <button className={styles.intro_button} onClick={props.userWelcome}>Agree</button>
                        </div>
                    </div>
                )}
                {isAuth && (
                    <div className={styles.intro_desc}>
                        <div className={styles.intro_attention}>
                            <p>Thank you!</p>
                        </div>
                        <div>
                            <p>Before we continue you will need to be redirected to the official Spotify website to authorize your music session.</p>
                        </div>
                        <div>
                            <p>You will be redirected back once you're done!</p>
                        </div>
                        <div>
                            <button className={styles.intro_button} onClick={props.onRedirect}>Authorize on Spotify</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Welcome