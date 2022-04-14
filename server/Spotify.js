require('dotenv').config({ path: `${__dirname}/../.env` })

var SpotifyWebApi = require("spotify-web-api-node")
const axios = require('axios');
const qs = require('qs')


const spotifyClient = process.env.spotify_clientid
const spotifySecret = process.env.spotify_secret

let auth_token = Buffer.from(`${spotifyClient}:${spotifySecret}`, 'utf-8').toString('base64');

const spotifyApi = new SpotifyWebApi({
    clientId: `${spotifyClient}`,
    clientSecret: `${spotifySecret}`,
    redirect_uri: 'http://localhost:3000/welcome/'
})



console.log(`READING FOR SERVER - ${spotifyClient}`)
console.log(`READING FOR SERVER - ${spotifySecret}`)



async function spotifyAuth(spotifyCode) {
    try {
        const data = qs.stringify(
            {
                grant_type: "client_credentials",
                code: spotifyCode,
                redirect_uri: 'http://localhost:3000/welcome/',
            }
        )

        const response = await axios.post('https://accounts.spotify.com/api/token',
            data, {
            headers: {
                'Authorization': `Basic ${auth_token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        // console log the response and send response as json back to client to keep in local storage


        // print the access token from the server req and set the access token in the same run
        console.log("PRINTING SPOTIFY TOKEN")
        console.log(response.data.access_token)
        spotifyApi.setAccessToken(response.data.access_token)


        // send response in json format of the object {token: exampleresponsetoken}


        // returning the access token to the client so it can be saved in local storage
        return response.data.access_token


    } catch (error) {
        console.log(error)
        console.log("spotify error from custom tool")
    }
}

// the function that will run the api to grab a set of playlist data based off of the keyword selected from the menu

// we toss in the userData object that contains both the token and key word
async function searchPlaylists(userData) {
    spotifyApi.setAccessToken(userData.accessToken)


    // this returns as a response.body to the axios call on the client component
    try {
        let response = await spotifyApi.searchPlaylists(`${userData.musicKey}`)
        console.log("READING DATA FROM PLAYLIST REQ")
        console.log(response)
        return response.body
    } catch (error) {
        console.log(error)
        console.log("spotify error from custom tool - SEARCH PLAYLISTS")
    }

}

// the function that will run to grab a specific playlist within the local storage and return its data
async function selectPlaylists(userData) {
    spotifyApi.setAccessToken(userData.accessToken)

    try {
        let response = await spotifyApi.getPlaylist(`${userData.playlistID}`)
        console.log(`READING SPECIFIC PLAYLIST DATA ID ${userData.playlistID}`)
        console.log(response)
        return response.body
    } catch (error) {
        console.log(error)
        console.log("spotify error from custom tool - GET")
    }

}






const spotifyCustom = {

    speak: function (num) {
        let a = num
        let b = 5
        return console.log(a + b)
    },
    connect: function (code) {
        return spotifyAuth(code)
    },
    playlistRead: async function (userData) {
        return await searchPlaylists(userData)
    },
    playlistSelect: async function (userData) {
        return await selectPlaylists(userData)
    },


}

module.exports = spotifyCustom