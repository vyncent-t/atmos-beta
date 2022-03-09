

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { useParams } from "react-router"
import { spotifyActions } from "../store/SpotifyState"
import { useLocation } from "react-router-dom"
import Welcome from "../components/Welcome"
import WelcomeBack from "../components/WelcomeBack"
import styles from '../components/welcomeStyles.module.css'




//url used to authorize the spotify api and retrieve an access token along with the scope of parameters that we are asking permission for.
// const AUTHORIZE = 'https://accounts.spotify.com/authorize?client_id=50885eb87ce14757bdde10e7fb01f91a&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'



function Intropage() {
    const location = useLocation()
    console.log(location)
    // the slice needs to be at 6 in order for the api call to work DO NOT TOUCH
    const locationCode = location.search.slice(6)
    console.log(`current location code from slice: ${locationCode}`)
    console.log(`current location CODE SLICE from slice: ${location.search.slice(0, 6)}`)

    const params = useParams()
    console.log(`current code from params ${params.musicAuthCode}`)

    const authlink = useSelector((state) => state.spotify.spotifyAuthLink)
    const isAuth = useSelector((state) => state.spotify.isSpotifyAuth)
    const musicPassword = useSelector((state) => state.spotify.authcode)
    const musicToken = useSelector((state) => state.spotify.accesstoken)
    const musicRefresh = useSelector((state) => state.spotify.refreshtoken)
    const musicEx = useSelector((state) => state.spotify.expiresin)



    const dispatch = useDispatch()

    function spotifyAuthToggler() {
        dispatch(spotifyActions.updateSpotifyAuth())
    }

    function userSpotifyAuthHandler() {
        // dispatch(spotifyActions.updateSpotifyCode(locationCode))
        window.location.href = authlink
        // requestSpotifyAuth()
        console.log(`current code from redirect button: ${musicPassword}`)
    }


    // const client_id = useSelector((state) => state.spotify.clientid)
    // const client_secret = useSelector((state) => state.spotify.clientsecret)

    // function requestSpotifyAuth() {
    // const redirect_uri = "http://localhost:3000"
    // const authlink = "https://accounts.spotify.com/authorize"
    // var url = authlink;
    // url += "?client_id=" + client_id;
    // url += "&response_type=code";
    // url += "&redirect_uri=" + encodeURI(redirect_uri);
    // // url += "&show_dialog=true";
    // // url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    // window.location.href = url
    // }

    // first page load should fail, passes nothing into locationCode, should work on return


    //console logging all state
    console.log(`current token: ${musicToken}`)
    console.log(`current code: ${musicPassword}`)
    console.log(`current refresh: ${musicRefresh}`)
    console.log(`current expire: ${musicEx}`)

    console.log(`page loaded is auth ${isAuth}`)

    // if (locationCode.length > 10) {
    //     
    // }



    if (locationCode.length > 20 & location.search.slice(0, 6) === "?code=") {
        dispatch(spotifyActions.updateSpotifyCode(locationCode))
        return (
            <div className={styles.bg}>
                <WelcomeBack newCode={locationCode} />
            </div>
        )
    } else {
        return (
            <div className={styles.bg}>
                <Welcome userWelcome={spotifyAuthToggler} onRedirect={userSpotifyAuthHandler} />
            </div>
        )
    }

}

export default Intropage