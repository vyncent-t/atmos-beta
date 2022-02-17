// import { useEffect } from "react"
// import { useSelector } from "react-redux"

import SpotifyMusicPlayer from "./SpotifyPlayer"
// import SpotifyWebApi from "spotify-web-api-node"



function MusicContent() {
    // var musicid = useSelector((state) => state.spotify.clientid)
    // const showContent = useSelector((state) => state.controls.showContentBox)
    // const musicToken = useSelector((state) => state.spotify.accesstoken)
    // const userMusic = useSelector((state) => state.content.musicButtonChoice)


    // console.log(`spotify current search keyword from button is: ${userMusic}`)
    // console.log(`spotify current token is: ${musicToken}`)

    // const spotifyApi = new SpotifyWebApi({
    //     clientId: `${musicid}`,
    // })

    // spotifyApi.setAccessToken(`${musicToken}`)

    // useEffect(() => {
    //     if (musicToken === "none token") return
    //     spotifyApi.setAccessToken(musicToken)
    // }, [musicToken])

    // const musicDummyID = `1DFixLWuPkv3KT3TnV35m3`

    // var userMusicContent = `pending`

    // spotifyApi.searchPlaylists(`${userMusic}`).then(
    //     (res) => {
    //         //save to an array?
    //         console.log(`playlist res:`, res.body)
    //         var playlistMusic = res.body.playlists.items
    //         var playlistCodes = playlistMusic.map(playlist => {
    //             return playlist.id
    //         })
    //         userMusicContent = playlistCodes
    //         console.log("current content list", userMusicContent)
    //     }
    // ).catch((err) => {
    //     console.log('Something went wrong!', err);
    // })

    // console.log(userMusicContent)



    return (
        <div className="card bg-success rounded ">
            <div className="card-body">
                <SpotifyMusicPlayer />
                {/* <iframe title="playlist" src={`https://open.spotify.com/embed/playlist/${musicPlaylist[(currentPlaylist)]}`} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> */}
            </div>
        </div>
    )
}

export default MusicContent
