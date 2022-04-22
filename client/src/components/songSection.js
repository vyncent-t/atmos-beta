import React, { Fragment, useEffect } from "react";
import { useState } from "react"

import SongCard from "./songCard"



function SongSection(props) {



    // const [songsLoading, setSongsLoading] = useState(true)


    // replace props.whatever.we to correct data format
    // replace this too
    let musicList = props.playlistInfo.tracks

    console.log("printing array of tracks in song section")
    console.log(musicList)

    let tracksArray = []

    if (musicList) {
        musicList.forEach(
            el => tracksArray.push(el)
        )
        console.log("tracks array")
        console.log(tracksArray)
    }



    // const songList = tracksArray.Map(
    //     (song) => {
    //         return (
    //             <div>
    //                 <SongCard />
    //             </div>
    //         )
    //     }
    // )


    // cheap work around to force the component to rerender, setting the text on the page to is loading then to loading complete / incoming data
    // if (musicList.length > 5) {
    //     setSongsLoading(true)
    // } else {
    //     setSongsLoading(false)
    // }
    console.log("tracks data from playlist", musicList)


    const content = "songList"
    // const content = songsLoading ?
    //     (<div>...is Loading</div>)
    //     :
    //     (<div> Loading Complete
    //     </div>)



    return (
        <div>
            {
                tracksArray.map(
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
                )
            }
        </div>
    )
}

export default SongSection