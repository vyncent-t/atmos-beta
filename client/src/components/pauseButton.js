const axios = require('axios')


function PauseButton() {

    let token = localStorage.getItem("spotifyToken")

    function pauseButtonHandler() {

        console.log("pausing music")
        axios.post('/spotify-pause', {
            userData: {
                accessToken: `${token}`
            }
        }).then(
            (res) => {
                console.log("pause worked")
                console.log(res)
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )

    }

    let words = "pause music"


    return (

        <div>
            <button onClick={pauseButtonHandler}>{words}</button>
        </div>

    )
}




export default PauseButton