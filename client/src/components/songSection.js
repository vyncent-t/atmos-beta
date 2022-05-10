import MusicControls from "./MusicControls";
import styles from "./SongSectionStyles.module.css"


function SongSection(props) {


    // init the props object entirely
    let musicInfo = props
    console.log("props from song section")
    console.log(musicInfo)

    // asign a piece from the object
    let musicArray = props.trackList
    console.log("props from track list section array")
    console.log(musicArray)



    return (
        <div className={styles.song_section}>
            <div>

            </div>
            <MusicControls songList={musicArray} />
            {/* {props.trackList &&
                <div>
                    {props.trackList.map(
                        (song, index) => (
                            <SongCard
                                uri={song.track.uri}
                                name={song.track.name}
                                // album={song.track.album.name}
                                artist={song.track.artists[0].name}
                                id={song.track.id}
                                href={song.track.href}
                            />
                        )
                    )}
                </div>
            } */}
        </div>
    )
}

export default SongSection