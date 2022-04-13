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
        console.log("spotify error")
    }
}


function searchPlaylists(userData) {
    spotifyApi.searchPlaylists(userData.term)
        .then(
            function (data) {
                console.log(data.body)
            },
            function (err) {
                console.log(err)
            }
        )

}






const spotifyCustom = {

    speak: function (num) {
        let a = num
        let b = 5
        return console.log(a + b)
    },
    connect: function (code) {
        return spotifyAuth(code)
    }


}

module.exports = spotifyCustom