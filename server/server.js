require('dotenv').config({ path: `${__dirname}/../.env` })
const qs = require('qs')
const axios = require('axios')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const QueryString = require('qs');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyCustom = require('./Spotify');

let spotifyClient = process.env.spotify_clientid
let spotifySecret = process.env.spotify_secret
let auth_token = Buffer.from(`${spotifyClient}:${spotifySecret}`, 'utf-8').toString('base64');


let PORT = process.env.PORT || 5000

const app = express();
app.use(cors())
app.use(bodyParser.json())





// const spotifyAuth = async (spotifyCode) => {
//     console.log("now printing code in axios")
//     console.log(spotifyCode)
//     await axios('https://accounts.spotify.com/api/token', {
//         'method': 'POST',
//         'headers': {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Authorization': `Basic ${auth_token}`
//         },
//         data: {
//             'grant_type': "client_credentials",
//             'code': `${spotifyCode}`,
//             'redirect_uri': 'http://localhost:3000',
//         }
//     }).then(tokenres => {
//         console.log(tokenres.data.access_token)
//         return `${tokenres.data.access_token}`
//     }).catch(error => {
//         console.log("error in axios")
//         console.log(error)
//     })
// }

// const spotifyAuth = async (spotifyCode) => {
//     try {
//         const spotifyURL = 'https://accounts.spotify.com/api/token';


//         const dataInit = {
//             grant_type: "client_credentials",
//             code: spotifyCode,
//             redirect_uri: 'http://localhost:3000/',
//         }
//         // const data = qs.stringify(dataInit);


//         const headers = {
//             'Authorization': `Basic ${auth_token}`,
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }

//         const response = await axios.post('https://accounts.spotify.com/api/token', qs.stringify(dataInit), headers).then(
//             (response) => {
//                 console.log(response.data.access_token)
//                 return response.data.access_token
//             }
//         ).catch(
//             (error) => {
//                 console.log("axios token error")
//                 console.log(error)
//             }
//         )

//     } catch (error) {
//         console.log(error)
//         console.log("spotify error")
//     }
// }





app.get('/spotify-redirect', (req, res) => {

    // creates a redirect url json object that will be sent to the client and be manually replaced with the window.location.href once the button is clicked on the landing page

    res.json({
        "redirectURL": `https://accounts.spotify.com/authorize?client_id=${spotifyClient}&response_type=code&redirect_uri=http://localhost:3000/welcome/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-read-playback-state%20user-modify-playback-state`
    })
})


// connection route to grab token once page renders from redirect


app.post('/spotify-connect', async (req, res) => {
    // console log the code passed in from params on client
    console.log(`reading in server the redirect code ${req.body.code}`)

    // demo object to make sure it works on server console
    spotifyCustom.speak(5)

    try {
        console.log("reading req body")
        res.json(await spotifyCustom.connect(req.body.code))
    } catch (err) {
        res.send(err)
    }
})


app.post('/spotify-set', async (req, res) => {
    // console log the keyword passed in from client
    console.log(`reading in server the music keyword ${req.body.userData.musicKey}`)

    // demo object to make sure it works on server console
    spotifyCustom.speak(5)

    try {
        console.log("reading req body")
        res.json(await spotifyCustom.playlistRead(req.body.userData))
    } catch (err) {
        res.send(err)
    }
})



app.post('/spotify-playlist', async (req, res) => {
    // console log the keyword passed in from client
    console.log(`reading in server the music keyword ${req.body.userData.musicKey}`)

    // demo object to make sure it works on server console
    spotifyCustom.speak(5)

    try {
        console.log("reading req body")
        res.json(await spotifyCustom.playlistSelect(req.body.userData))
    } catch (err) {
        res.send(err)
    }
})

app.post('/spotify-pause', async (req, res) => {
    spotifyCustom.speak(5)

    try {
        console.log("pausing music")
        res.json(await spotifyCustom.pause(req.body.userData))
    } catch (err) {
        res.send(err)
    }
})




app.get('/fruits', (req, res) => {
    res.json({
        "fruits": ["apple", "banana", "mango"]
    })
})


// res.json(
//     () => {
//         axios('http://accounts.spotify.com/api/token', {
//             'method': 'POST',
//             'headers': {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Authorization': 'Basic' + (Buffer.from(`${spotifyClient}:${spotifySecret}`, 'utf-8').toString('base64'))
//             },
//             data: 'grant_type=client_credentials'
//         }).then(restoken => {
//             console.log(restoken.data.access.token)
//             return restoken.data.access.token
//         })
//     }

// )

// app.post('http://localhost:5000/refresh', (req, res) => {
//     const refreshToken = req.body.refreshToken
//     console.log(refreshToken)

//     const spotifyApi = new SpotifyWebApi({
//         redirectUri: 'http://localhost:5000',
//         clientId: `${spotifyClient}`,
//         clientSecret: `${spotifySecret}`,
//         refreshToken,
//     })

//     spotifyApi
//         .refreshAccessToken()
//         .then(data => {
//             res.json({
//                 accessToken: data.body.access_token,
//                 expiresIn: data.body.expires_in,
//             })
//         })
//         .catch((err) => {
//             console.log(err)
//             res.sendStatus(400)
//         })
// })


app.listen(PORT, () => {
    // console.log(`READING FOR SERVER - ${spotifyClient}`)
    // console.log(`READING FOR SERVER - ${spotifySecret}`)
    console.log(`server listening to port ${PORT}`)
})

// nodemon./ server.js localhost 3005