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
]


// comment out deploy link when working
// var redirectUri = 'http://localhost:3000/welcome/'

var redirectUri = 'https://the-atmos-project.herokuapp.com/welcome/'



const spotifyApi = new SpotifyWebApi({
    clientId: `${spotifyClient}`,
    clientSecret: `${spotifySecret}`,
    redirect_uri: redirectUri,
})


console.log(`READING FROM SPOTIFY JS - ${spotifyClient}`)
console.log(`READING FROM SPOTIFY JS - ${spotifySecret}`)




//              ***************NOTE************
//          THIS API TOOL IS USED WITH THE SPOTIFY WEB API NODE PACKAGE
//          REFER TO THE NPM AND SPOTIFY DOCUMENTATION
//          ALL OF THE FUNCTIONS MUST BE ASYNC IN ORDER TO WORK WHEN CALLED ON CLIENT
//          WE USE A DEFAULT userData OBJECT FROM THE CLIENT TO PASS IN ANY NEEDED DATA
//              EX. TOKENS, SONG INFO, ETC.
//          ALWAYS REMEMBER TO SET THE ACCESS TOKEN BEFORE RUNNING THE TRY BLOCK

// this function will return the link to the client as a response - which will be needed to execute a window.change function to redirect the user once the button is clicked

// replace


// async function spotifyRedirect(spotifyCode) {
//     try {
//         let authrorizeURL = `https://accounts.spotify.com/authorize?client_id=3a89823c52cd490496fa7bc8e88133bd&response_type=code&redirect_uri=${redirectUri}&scope=user-read-email%20playlist-read-private%20playlist-read-collaborative%20user-read-private%20user-library-read%20user-top-read%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-read-recently-played`
//         console.log("printing the auth url")
//         console.log(authrorizeURL)

//         return authrorizeURL

//     } catch (error) {
//         console.log(error)
//         console.log("spotify error from custom tool")
//     }
// }

async function spotifyRedirect(spotifyCode) {
    try {
        let authrorizeURL = `https://accounts.spotify.com/authorize?client_id=${spotifyClient}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-email%20playlist-read-private%20playlist-read-collaborative%20user-read-private%20user-library-read%20user-top-read%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20user-read-recently-played`
        console.log("printing the auth url")
        console.log(authrorizeURL)

        return authrorizeURL

    } catch (error) {
        console.log(error)
        console.log("spotify error from custom tool")
    }
}


// mainly followed the documentation for the spotify web api - NEEDS TO BE ASYNC
async function spotifyAuth(code) {

    // sets the credentials for use
    var credentials = {
        clientId: `${spotifyClient}`,
        clientSecret: `${spotifySecret}`,
        redirectUri: `${redirectUri}`,
    }

    // initalizes new instance of spotify
    var spotifyApi = new SpotifyWebApi(credentials)

    // setting a temp variable for the token
    let musicToken = "waiting token"

    // printing the spotify auth code from the redirect params
    console.log("printing code from spotifyAuth")
    console.log(code)

    // awaits the spotifyAPI response to grant user auth
    await spotifyApi.authorizationCodeGrant(code).then(
        function (data) {
            // console log the data body
            console.log(data.body)

            // prints the data response according to index/property 
            // "for example this is done the same as array[0] except data.body the object is parsed by matching where the key property field of the data.body object is 'access_token' and pulls its value pair"
            console.log('access token  in' + data.body['access_token']);
            console.log('access token expires in ' + data.body['expires_in']);
            console.log('access token refresh is ' + data.body['refresh_token']);

            // set the access token using the spotifyAPI
            spotifyApi.setAccessToken(data.body['access_token']);
            console.log("access token set")

            // set the refresh for the access token using the spotifyAPI
            spotifyApi.setRefreshToken(data.body['refresh_token'])
            console.log("access token refresh set")

            // update the music token from the temperary words to the actual data response
            // this will be returned at the end of this function IF the spotify auth is successful
            musicToken = data.body.access_token

        },
        function (err) {
            console.log("error in spotifyAuth connection")
            console.log(err)
        }
    )

    // printing the new access token to read if it has been changed
    console.log("printing new access token")
    console.log(musicToken)
    // returning updated token as a response to the client
    return musicToken
}



// the function that will run req the spotify web api to grab a set of playlist data based off of the keyword selected from the menu input

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

// basic pause feature
async function pauseMusic(userData) {
    spotifyApi.setAccessToken(userData.accessToken)

    try {
        spotifyApi.pause()
    } catch (error) {
        console.log(error)
        console.log("spotify error on pause request")
    }
}


// basic resume feature
async function resumeMusic(userData) {
    spotifyApi.setAccessToken(userData.accessToken)


    try {
        // console.log(userData)
        await spotifyApi.play()
    } catch (error) {
        console.log(error)
        console.log("spotify error on play request")
    }
}



// this function requires the exact uri for a song, you will need to drill into the song data from any playlists by following tracks.track.uri
// tracks will return a whole array from a playlist
// tracks.track will return the one track object we need to drill into
async function playMusic(userData) {
    spotifyApi.setAccessToken(userData.accessToken)
    // console log the tossed in music uri
    console.log("now playing song - now printing song uri")


    try {
        console.log(userData.musicURI)
        await spotifyApi.play({
            uris: [userData.musicURI]
        })
    } catch (error) {
        console.log(error)
        console.log("spotify error on play request")
    }
}



async function audioLevel(userData) {
    spotifyApi.setAccessToken(userData.accessToken)
    try {
        console.log(`now setting audio level to ${userData.level}`)
        await spotifyApi.setVolume(userData.level)
    } catch (error) {
        console.log(error)
        console.log("spotify error on volume control")
    }
}






// ************* NOTE *************
// THE CUSTOM TOOL NEEDS TO RUN EVERY FUNCTION AS ASYNC ALSO
// THIS ENSURES THAT THE END FUNCTION WILL BE AWAITED IN ORDER TO RETURN THE DESIRED RESPONSE

const spotifyCustom = {

    // demo code
    speak: function (num) {
        let a = num
        let b = 5
        return console.log(a + b)
    },

    // redirect function that returns the redirect url
    redirect: async function () {
        return await spotifyRedirect()
    },
    // connects the user to spotify and grants token
    connect: async function (userData) {
        return await spotifyAuth(userData)
    },
    // search spotify for playlists and returns data
    playlistRead: async function (userData) {
        return await searchPlaylists(userData)
    },
    // selects one playlist and returns data
    playlistSelect: async function (userData) {
        return await selectPlaylists(userData)
    },
    // pauses the users current session music
    pause: async function (userData) {
        return await pauseMusic(userData)
    },
    // resumes the users current session music
    resume: async function (userData) {
        return await resumeMusic(userData)
    },
    // sets a specific song to play
    play: async function (userData) {
        return await playMusic(userData)
    },
    // set audio levels
    sound: async function (userData) {
        return await audioLevel(userData)
    }



}

module.exports = spotifyCustom