import useAuth from "../util/spotifyAuth"
import { useSelector } from "react-redux"
import welcome from '../images/welcome.png';
import styles from './welcomeStyles.module.css'
import { useLocation } from "react-router-dom"

import { Link } from 'react-router-dom';

const axios = require('axios')


// the authCode is coming from the intro page, on redirect we trim the parameter that is the access code from spotify, then we pass it into the useAuth function that connects to server
function WelcomeBack() {

    const location = useLocation()
    console.log(location)
    let authCode = location.search.slice(6)
    console.log("new code")
    console.log(authCode)
    var accesstoken = "no token right now"



    console.log(authCode)


    localStorage.setItem("spotifyCode", `${authCode}`)

    // takes useAuth from utility, which runs the saveSpotify func from dispatch on store file, allows the user to be considered logged in, sets the exp, token, and other

    // useAuth(authCode)

    axios.post('/spotify-connect', {
        code: `${authCode}`
    }).then(
        (res) => {
            console.log("new access token")
            console.log(res.data.access_token)
            accesstoken = res.data.access_token
            localStorage.setItem("spotifyToken", `${accesstoken}`)

        }
    ).catch(
        (error) => {
            console.log(error)
        }
    )

    // var accesstoken = useSelector((state) => state.spotify.accesstoken)
    console.log(`welcome back comp loaded is current access token ${accesstoken}`)


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
                            <div>
                                <Link to="/menu" className="m-3 btn btn-success">Continue</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default WelcomeBack