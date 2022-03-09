import VideoButton from "./VideoButton"
import { useSelector } from "react-redux"


function VideoForm() {

    const videoChoice = useSelector((state) => state.youtube.currentChoice)
    const videoOptions = useSelector((state) => state.youtube.youtubechoices)
    let videoContent = []

    function RetrieveVideoCodes(arrayCodes) {
        let videoCodesLength = arrayCodes.length
        localStorage.setItem("videocodelength", videoCodesLength)
        console.log(`length of array for youtube ${videoCodesLength}`)

        for (let i = 0; i < videoCodesLength; i++) {
            localStorage.setItem(`videocontentcode${i}`, `${arrayCodes[i]}`)
            console.log("updated video content", `${arrayCodes[i]}`)
        }

    }


    if (videoChoice === "Beach") {
        videoContent = videoOptions.Beach
        RetrieveVideoCodes(videoContent)
    }
    if (videoChoice === "Waterfall") {
        videoContent = videoOptions.Waterfall
        RetrieveVideoCodes(videoContent)
    }
    if (videoChoice === "City") {
        videoContent = videoOptions.City
        RetrieveVideoCodes(videoContent)
    }
    if (videoChoice === "Forest") {
        videoContent = videoOptions.Forest
        RetrieveVideoCodes(videoContent)
    }
    if (videoChoice === "Travel") {
        videoContent = videoOptions.Travel
        RetrieveVideoCodes(videoContent)
    } if (videoChoice === "no video") {
        localStorage.setItem("videoCodes", [])
        console.log(`current video: ${videoChoice}`)
    }



    return (

        <div className="card bg-dark m-4">
            <div className="card-body">
                <div className="d-flex flex-column justify-content-center">
                    <div className="card-title">
                        <h2>Visual Choices</h2>
                    </div>
                    <div className="card-text">
                        <p>{`Your current video genre: ${videoChoice}`}</p>
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                        <VideoButton videoKeyword="Beach" />
                        <VideoButton videoKeyword="Waterfall" />
                        <VideoButton videoKeyword="City" />
                        <VideoButton videoKeyword="Forest" />
                        <VideoButton videoKeyword="Travel" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoForm