import styles from "./SoundCardStyles.module.css"


function SongCard(props) {

    // const [songArrayNum, setSongArrayNumber] = useState(props.arrayNum)

    // function songArrayHandle(event) {
    //     console.log(props)
    //     console.log(`now printing for array placement ${event.target.value
    //         }`)
    //     setSongArrayNumber(event.target.value)
    //     console.log(songArrayNum)
    // }


    // function keyPrint(event) {
    //     console.log(props)
    //     console.log(`now printing for array placement ${event.target.value
    //         }`)
    // }

    return (
        <div className={styles.sound_card} key={props.id}>
            <div>
                <p>{props.name}</p>
            </div>
            <div className={styles.song_artist}>
                <div>
                    <p>artist: </p>
                </div>
                <div>
                    <p>{props.artist}</p>
                </div>

            </div>
        </div>

    )
}


export default SongCard