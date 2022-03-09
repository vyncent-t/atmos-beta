import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveSpotify } from '../store/SpotifyState';
import axios from 'axios';


function useAuth(code) {
    // const [useAccess, setAccess] = useState()
    // const [useRefresh, setRefresh] = useState()
    // const [useExpire, setExpire] = useState()

    // var code = useSelector((state) => state.spotify.code)
    var accesstoken = useSelector((state) => state.spotify.accesstoken)
    // var refreshtoken = useSelector((state) => state.spotify.refreshtoken)
    // var expiresin = useSelector((state) => state.spotify.expiresin)
    // var isAuth = useSelector((state) => state.spotify.isSpotifyAuth)

    const dispatch = useDispatch()

    useEffect(() => {

        axios
            .post('https://atmos-project.herokuapp.com/login', {
                code,
            }).then(res => {
                console.log(res.data)

                dispatch(saveSpotify(res))
                // setAccess(res.data.accessToken)
                // setRefresh(res.data.refreshToken)
                // setExpire(res.data.expiresIn)


                // console.log(res.data.accessToken)
                // console.log(res.data.refreshToken)
                // console.log(res.data.expiresIn)

                // console.log("access token after")

                // console.log(expiresin)
                // dispatch(spotifyActions.updateSpotifyCode(code))

                // dispatch(spotifyActions.updateSpotifyAccess(res.data.accessToken))

                // dispatch(spotifyActions.updateSpotifyRefresh(res.data.refreshToken))

                // dispatch(spotifyActions.updateSpotifyExpire(res.data.expiresIn))


                //removes data from url and sets it back to root


                // window.history.pushState({}, null, "/")


                // let codePocket = "http://localhost:3000/menu"
                // window.location.href = codePocket
                // console.log(useAccess)
                // console.log(useRefresh)
                // console.log(useExpire)
            })
            .catch((err) => {
                console.log("auth util error")
                console.log(err)
            })
    }, [code, dispatch])



    return accesstoken

}

export default useAuth