import React, { Fragment, useEffect } from "react";
import { useState } from "react"
import MusicControls from "./musicControls";

import SongCard from "./songCard"



function SongSection(props) {


    // init the props object entirely
    let musicInfo = props
    console.log("props from song section")
    console.log(musicInfo)

    // asign a piece from the object
    let musicArray = props.trackList
    console.log("props from track list section array")
    console.log(musicArray)

    // console.log(musicArray.length)

    // let arrayTracks = []

    // const [musicTracks, setMusicTracks] = useState([])


    // if the prop exists, loop through each prop and move it into the tracksArray array

    // if (musicArray) {

    //     setMusicTracks(musicArray.forEach(
    //         el => setMusicTracks([...musicTracks, el])
    //     ))


    //     console.log("musicTracks")
    //     console.log(musicTracks)
    // }


    let content = "songList"

    // if (newArray.length > 5) {
    //     content = "song section okay"
    // } else {
    //     content = "song section not broken"
    // }
    // console.log("new tracks data from playlist", newArray)


    // const content = songsLoading ?
    //     (<div>...is Loading</div>)
    //     :
    //     (<div> Loading Complete
    //     </div>)



    return (
        <div>
            <div>
                {content}
            </div>
            {/* <MusicControls songList={musicArray} /> */}
            {props.trackList &&
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
            }
        </div>
    )
}

export default SongSection