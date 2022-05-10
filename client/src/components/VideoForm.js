import VideoButton from "./VideoButton"
import { useSelector } from "react-redux"
import styles from "./ContentMenuStyles.module.css"


function VideoForm() {

    const videoChoice = useSelector((state) => state.youtube.currentChoice)
    const videoOptions = useSelector((state) => state.youtube.youtubeChoices)
    let videoContent = []

    function retrieveVideoCodes(arrayCodes) {
        let videoCodesLength = arrayCodes.length
        localStorage.setItem("videocodelength", videoCodesLength)
        console.log(`length of array for youtube ${videoCodesLength}`)

        for (let i = 0; i < videoCodesLength; i++) {
            localStorage.setItem(`videocontentcode${i}`, `${arrayCodes[i]}`)
            console.log("updated video content", `${arrayCodes[i]}`)
        }

    }


    if (videoChoice) {
        videoContent = videoOptions[videoChoice]
        retrieveVideoCodes(videoContent)
    }

    // if (videoChoice === "none") {
    //     localStorage.setItem("videoCodes", [])
    //     console.log(`current video: ${videoChoice}`)
    // }

    // if (videoChoice === "Beach") {
    //     videoContent = videoOptions.Beach
    //     retrieveVideoCodes(videoContent)
    // }
    // if (videoChoice === "Waterfall") {
    //     videoContent = videoOptions.Waterfall
    //     retrieveVideoCodes(videoContent)
    // }
    // if (videoChoice === "City") {
    //     videoContent = videoOptions.City
    //     retrieveVideoCodes(videoContent)
    // }
    // if (videoChoice === "Forest") {
    //     videoContent = videoOptions.Forest
    //     retrieveVideoCodes(videoContent)
    // }
    // if (videoChoice === "Travel") {
    //     videoContent = videoOptions.Travel
    //     retrieveVideoCodes(videoContent)
    // } if (videoChoice === "no video") {
    //     localStorage.setItem("videoCodes", [])
    //     console.log(`current video: ${videoChoice}`)
    // }



    return (

        <div className={styles.form_container}>
            <h3>Video Choice</h3>
            {videoChoice && <h4>{videoChoice}</h4>}
            {!videoChoice && <h4>No video chosen</h4>}
            <div className={styles.choice_container}>
                <div className={styles.form_choice}>
                    <VideoButton videoKeyword="Beach" />
                    <VideoButton videoKeyword="Waterfall" />
                    <VideoButton videoKeyword="City" />
                    <VideoButton videoKeyword="Forest" />

                    <VideoButton videoKeyword="Cars" />
                    <VideoButton videoKeyword="Planes" />
                    <VideoButton videoKeyword="Trains" />
                    <VideoButton videoKeyword="Camping" />
                    <VideoButton videoKeyword="Aquarium" />

                    <VideoButton videoKeyword="Travel" />

                    <VideoButton videoKeyword="Fantasy" />
                    <VideoButton videoKeyword="Space" />
                    <VideoButton videoKeyword="Christmas" />
                    <VideoButton videoKeyword="Dungeons and dragons" />
                    <VideoButton videoKeyword="Focus" />


                </div>
            </div>
        </div>
    )
}

export default VideoForm