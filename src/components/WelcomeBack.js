import useAuth from "../server/spotifyAuth"
import { useSelector } from "react-redux"
import { AnimationWrapper } from 'react-hover-animation'
import title from '../images/title.png';
import welcome from '../images/welcome.png';
import styles from './welcomeStyles.module.css'
import { Link } from 'react-router-dom';



function WelcomeBack(props) {

    var authCode = props.newCode
    console.log(authCode)


    localStorage.setItem("spotifyCode", `${authCode}`)

    useAuth(authCode)


    const isAuth = useSelector((state) => state.spotify.isSpotifyAuth)
    var accesstoken = useSelector((state) => state.spotify.accesstoken)
    console.log(`welcome back comp loaded is auth ${isAuth}`)
    console.log(`welcome back comp loaded is current access token ${accesstoken}`)
    localStorage.setItem("spotifyToken", `${accesstoken}`)


    return (
        <div className={styles.bg}>
            <div className={styles.containerdiv}>
                <div className={styles.drop}>
                    <img className="img-fluid" alt="" src={welcome}></img>
                </div>
                <div className="card text-center">
                    <div className="card-body">
                        <h5 className="card-title">Welcome to atmos! </h5>
                        <p className="card-text">While using the app we combine youtube and spotify to allow you to both listen and watch anything of your choosing! Click whichever genre you would like to enjoy and relax!</p>
                        <div>
                            <AnimationWrapper>
                                <Link to="/menu" className="m-3 btn btn-success">Continue</Link>
                            </AnimationWrapper>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default WelcomeBack