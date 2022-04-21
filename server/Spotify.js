require('dotenv').config({ path: `${__dirname}/../.env` })

var SpotifyWebApi = require("spotify-web-api-node")
const axios = require('axios');
const qs = require('qs')


const spotifyClient = process.env.spotify_clientid
const spotifySecret = process.env.spotify_secret

let auth_token = Buffer.from(`${spotifyClient}:${spotifySecret}`, 'utf-8').toString('base64');


var scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
],
    redirectUri = 'http://localhost:3000/welcome/'



const spotifyApi = new SpotifyWebApi({
    clientId: `${spotifyClient}`,
    clientSecret: `${spotifySecret}`,
    redirect_uri: redirectUri,
})


console.log(`READING FOR SERVER - ${spotifyClient}`)
console.log(`READING FOR SERVER - ${spotifySecret}`)


// this function will return the link to the page which will execute a window.change function to redirect the user once the button is clicked
async function spotifyRedirect(spotifyCode) {

    try {
        let authrorizeURL = `https://accounts.spotify.com/authorize?client_id=3a89823c52cd490496fa7bc8e88133bd&response_type=code&redirect_uri=${redirectUri}&scope=user-read-email%20playlist-read-private%20playlist-read-collaborative%20user-read-private%20user-library-read%20user-top-read%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-read-recently-played`
        console.log("printing the auth url")
        console.log(authrorizeURL)

        return authrorizeURL

    } catch (error) {
        console.log(error)
        console.log("spotify error from custom tool")
    }
}


// mainly followed the documentation for the spotify web api - needs to be async
async function spotifyAuth(code) {

    var credentials = {
        clientId: `${spotifyClient}`,
        clientSecret: `${spotifySecret}`,
        redirectUri: `${redirectUri}`,
    }

    var spotifyApi = new SpotifyWebApi(credentials)

    let musicToken = "waiting token"
    // let code = `${code}`
    console.log("printing code from spotifyAuth")
    console.log(code)
    await spotifyApi.authorizationCodeGrant(code).then(
        function (data) {
            console.log(data.body)
            console.log('access token  in' + data.body['access_token']);
            console.log('access token expires in ' + data.body['expires_in']);
            console.log('access token refresh is ' + data.body['refresh_token']);


            spotifyApi.setAccessToken(data.body['access_token']);
            console.log("access token set")
            spotifyApi.setRefreshToken(data.body['refresh_token'])
            console.log("access token refresh set")

            musicToken = data.body.access_token

        },
        function (err) {
            console.log("error in spotifyAuth connection")
            console.log(err)
        }
    )


    console.log("printing new access token")
    console.log(musicToken)
    return musicToken
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
        console.log(`READING SPECIFIC PLAYLIST DATA BY ID WITHIN THE CUSTOM TOOL SELECTPLAYLISTS ${userData.playlistID}`)
        console.log(response)
        return response.body
    } catch (error) {
        console.log(error)
        console.log("spotify error from custom tool - GET")
    }

}

async function pauseMusic(userData) {
    spotifyApi.setAccessToken(userData.accessToken)

    try {
        spotifyApi.pause()
    } catch (error) {
        console.log(error)
        console.log("spotify error on pause request")
    }
}



// only to be used on a mapped list of songs with the id being the spotify uri so that it can be passed in as user Data and placed into the spotify api play object
async function playMusic(userData) {
    spotifyApi.setAccessToken(userData.accessToken)
    console.log(userData.MusicURI)


    try {
        await spotifyApi.play({
            uris: [userData.musicURI]
        })
    } catch (error) {
        console.log(error)
        console.log("spotify error on play request")
    }
}




const spotifyCustom = {

    speak: function (num) {
        let a = num
        let b = 5
        return console.log(a + b)
    },
    redirect: async function () {
        return await spotifyRedirect()
    },
    connect: async function (userData) {
        return await spotifyAuth(userData)
    },
    playlistRead: async function (userData) {
        return await searchPlaylists(userData)
    },
    playlistSelect: async function (userData) {
        return await selectPlaylists(userData)
    },
    pause: async function (userData) {
        return await pauseMusic(userData)
    },
    play: async function (userData) {
        return await playMusic(userData)
    },



}

module.exports = spotifyCustom