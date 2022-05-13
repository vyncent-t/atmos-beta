

import { useNavigate } from "react-router"
import { useParams } from "react-router"
import { useLocation } from "react-router-dom"
import WelcomeBack from "../components/WelcomeBack"

const axios = require('axios')

function WelcomePage() {
    const location = useLocation()
    console.log(location)
    // the slice needs to be at 6 in order for the api call to work DO NOT TOUCH
    let locationCode = location.search.slice(6)
    console.log(`current location code from slice: ${locationCode}`)
    console.log(`current location CODE SLICE from slice: ${location.search.slice(0, 6)}`)

    // locationCode = location.search.slice(0, 6)

    const params = useParams()
    console.log(`current code from params ${params.musicAuthCode}`)


    // first page load should fail, passes nothing into locationCode, should work on return

    axios.get('/fruits').then(
        (res) => {
            console.log(res.data)
        }
    ).catch((error) => {
        console.log(error)
    })


    return (
        <div>
            <WelcomeBack newCode={locationCode} />
        </div>
    )

}

export default WelcomePage