

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { useParams } from "react-router"
import { spotifyActions } from "../store/SpotifyState"
import { useLocation } from "react-router-dom"
import Welcome from "../components/Welcome"
import WelcomeBack from "../components/WelcomeBack"
import styles from '../components/welcomeStyles.module.css'

const axios = require('axios')

function Intropage() {
    const location = useLocation()
    console.log(location)
    // the slice needs to be at 6 in order for the api call to work DO NOT TOUCH
    let locationCode = location.search.slice(6)
    console.log(`current location code from slice: ${locationCode}`)
    console.log(`current location CODE SLICE from slice: ${location.search.slice(0, 6)}`)

    // locationCode = location.search.slice(0, 6)

    const params = useParams()
    console.log(`current code from params ${params.musicAuthCode}`)

    const musicPassword = useSelector((state) => state.spotify.authcode)
    const musicToken = useSelector((state) => state.spotify.accesstoken)
    const musicRefresh = useSelector((state) => state.spotify.refreshtoken)
    const musicEx = useSelector((state) => state.spotify.expiresin)


    const dispatch = useDispatch()

    function spotifyAuthToggler() {
        dispatch(spotifyActions.updateSpotifyAuth())
    }

    function userSpotifyAuthHandler() {

        axios.get('/spotify-redirect').then(response => {
            console.log(response.data)
            window.location.href = `${response.data}`
        }).catch(error => {
            console.log(error)
        })

        // dispatch(spotifyActions.updateSpotifyCode(locationCode))
        // window.location.href = authlink
        // requestSpotifyAuth()
        // console.log(`current code from redirect button: ${musicPassword}`)
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


    // if (locationCode.length > 10) {
    //     
    // }


    axios.get('/fruits').then(
        (res) => {
            console.log(res.data)
        }
    ).catch((error) => {
        console.log(error)
    })



    if (locationCode.length > 20) {
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