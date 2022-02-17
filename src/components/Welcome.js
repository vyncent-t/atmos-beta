import { useSelector } from "react-redux"
import title from '../images/title.png';
import tv from '../images/tvlogo.png';
import { AnimationWrapper } from 'react-hover-animation'
import styles from './welcomeStyles.module.css'

//styling


function Welcome(props) {

    const isAuth = useSelector((state) => state.spotify.isSpotifyAuth)
    console.log(`welcome comp loaded is auth ${isAuth}`)

    return (
        <div className={styles.bg}>
            <div className={styles.containerdiv}>
                <img alt="" className="img-fluid" src={title}></img>
                <div className={styles.drop}>
                    <img className="img-fluid mb-3" alt="" src={tv}></img>
                </div>
                <div className={styles.containerdivintro}>
                    <p className={styles.text} >A Visual Auditory Experience</p>
                    <AnimationWrapper>
                        {!isAuth && (
                            <div className={styles.containerdiv}>
                                <p className={styles.texts} >*NOTE* For this app to work we need to use some of your data from a Premium Spotify account! Please note we do note keep any of the data you lend, it is only to grant access to spotify features.</p>
                                <button className="m-3 btn btn-success" onClick={props.userWelcome}>Agree</button>
                            </div>)}
                        {isAuth && (<div className={styles.containerdiv}>
                            <p className={styles.texts} >*NOTE* Thank you! You will need to be redirected to the spotify website in order to obtain your credentials, you will be redirected back once you're done!</p>
                            <button className="m-3 btn btn-success" onClick={props.onRedirect}>Authorize on Spotify</button>
                        </div>)}
                    </AnimationWrapper>
                </div>
            </div >
        </div>
    )
}

export default Welcome