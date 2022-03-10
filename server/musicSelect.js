import SpotifyWebApi from "spotify-web-api-node"
import axios from 'axios';
require('dotenv').config({ path: `${__dirname}/../.env` })

// export function musicConnect(key) {
//     const spotifyApi = new SpotifyWebApi({
//         clientId: musicid
//     })
// }


export function musicSelector(keyword) {


    let spotifyClient = process.env.spotify_clientid
    let spotifySecret = process.env.spotify_secret
    console.log("export")
    console.log(spotifyClient)
    console.log(spotifySecret)



}

