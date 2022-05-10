import React, { Fragment, useEffect } from "react";
import { useState } from "react"
import MusicControls from "./MusicControls";

import SongCard from "./SongCard"



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



    return (
        <div className="bg-success m-2 p-2 rounded">
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