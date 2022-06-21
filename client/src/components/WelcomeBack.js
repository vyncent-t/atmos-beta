import welcome from '../images/welcome.png';
import { useLocation } from "react-router-dom"
import { Link } from 'react-router-dom';
import styles from './IntroStyles.module.css'

const axios = require('axios')


// the authCode is coming from the intro page, on redirect we trim the parameter that is the access code from spotify, then we pass it into the useAuth function that connects to server
function WelcomeBack() {

    const location = useLocation()
    console.log(location)
    let authCode = location.search.slice(6)
    console.log("new code")
    console.log(authCode)
    let accesstoken = "no token right now"



    console.log(authCode)


    localStorage.setItem("spotifyCode", `${authCode}`)

    // takes useAuth from utility, which runs the saveSpotify func from dispatch on store file, allows the user to be considered logged in, sets the exp, token, and other

    // useAuth(authCode)

    axios.post('/spotify-connect', {
        code: `${authCode}`
    }).then(
        (res) => {
            // the following is printed on the browser console
            console.log("new access token")
            console.log(res)
            console.log(`reading res data ${res.data}`)
            // accesstoken = res.data.access_token
            localStorage.setItem("spotifyToken", `${res.data}`)
        }
    ).catch(
        (error) => {
            console.log(error)
        }
    )

    // var accesstoken = useSelector((state) => state.spotify.accesstoken)
    console.log(`welcome back comp loaded is current access token ${accesstoken}`)


    return (
        <div className={styles.intro_main}>

            <div className={styles.intro_about}>
                <div>
                    <h5>Instructions</h5>
                </div>
                <div>
                    <div className={styles.intro_tutorial}>
                        <div className={styles.intro_card}>
                            <h3>1. Prepare</h3>
                            <div>
                                <p>The first and most important step is to ready your listening device!</p>
                            </div>
                            <div>
                                <p>
                                    Open spotify on any platform (mobile app / desktop app / web browser) and play any track to test your connection to the spotify server.
                                </p>
                            </div>
                            <div>
                                <p>
                                    You will be controlling your music from the dashboard later!
                                </p>
                            </div>
                        </div>
                        <div className={styles.intro_card}>
                            <h3>2. Choose</h3>
                            <div>
                                <p>Once you establish a connection to spotify on your device, continue to the menu.</p>
                            </div>
                            <div>
                                <p>
                                    At the menu, select the music genre you would like to listen to and the style of scenery you would like to watch.
                                </p>
                            </div>
                            <div>
                                <p>
                                    You can return to the menu and change your content at anytime!
                                </p>
                            </div>
                        </div>
                        <div className={styles.intro_card}>
                            <h3>3. Relax</h3>
                            <div>
                                <p>Once you chose your music and scenery options you will be taken to the dashboard where your content will be loaded and play automatically.</p>
                            </div>
                            <div>
                                <p>Below the video are the controls for the music, feel free to adjust the volume, change the playlist, change a song!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.intro_button_box}>
                    <Link to="/menu" className={styles.intro_button}>Continue to menu</Link>
                </div>
            </div>
        </div >
    )
}

export default WelcomeBack