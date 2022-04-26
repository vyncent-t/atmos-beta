const axios = require('axios')


function ResumeButton() {

    let token = localStorage.getItem("spotifyToken")



    // **********************

    // console.log("printing from resume button")
    // **********************

    function resumeButtonHandler() {

        console.log("resume music")
        axios.post('/spotify-resume', {
            userData: {
                accessToken: `${token}`,
            }
        }).then(
            (res) => {
                console.log("resume worked")
                console.log(res)
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )

    }

    let words = "resume music"

    return (
        <div>
            <button onClick={resumeButtonHandler} className="btn btn-primary m-3">{words}</button>
        </div>
    )
}




export default ResumeButton