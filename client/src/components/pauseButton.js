const axios = require('axios')


function PauseButton() {

    // takes the token from local storage and saves it
    let token = localStorage.getItem("spotifyToken")

    function pauseButtonHandler() {
        // when the button is pressed, statement prints, token is set to a property on the userData object to be passed in to the proper route
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
            <button onClick={pauseButtonHandler} className="btn btn-info m-3">{words}</button>
        </div>

    )
}




export default PauseButton