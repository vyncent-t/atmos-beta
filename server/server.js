require('dotenv').config({ path: `${__dirname}/../.env` })
const qs = require('qs')
const axios = require('axios')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const QueryString = require('qs');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyCustom = require('./Spotify');

// let spotifyClient = process.env.spotify_clientid
// let spotifySecret = process.env.spotify_secret
// let auth_token = Buffer.from(`${spotifyClient}:${spotifySecret}`, 'utf-8').toString('base64');



let PORT = process.env.PORT || 5000

const app = express();
app.use(cors())
app.use(bodyParser.json())




// ************** NOTE ***********************
// these functions in the route are meant to chained in async so that the response isn't being sent back until the very last endpoint is reached


app.get('/', (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: {
            name: 'atmos-project'
        }
    })
}
)


app.get('/spotify-redirect', async (req, res) => {

    // creates a redirect url json object that will be sent to the client and be manually replaced with the window.location.href once the button is clicked on the landing page

    // res.json({
    //     "redirectURL": `https://accounts.spotify.com/authorize?client_id=${spotifyClient}&response_type=code&redirect_uri=http://localhost:3000/welcome/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-read-playback-state%20user-modify-playback-state`
    // })

    spotifyCustom.speak(5)

    try {
        console.log("redirect load")
        res.json(await spotifyCustom.redirect())
    } catch (err) {
        res.send(err)
    }


})


// connection route to grab token once page renders from redirect
// these functions are chained in async so that the response isn't being sent back until the very last endpoint is reached
app.post('/spotify-connect', async (req, res) => {
    // console log the code passed in from params on client
    console.log(`reading in server the redirect code ${req.body.code}`)

    // run this line to make sure the connection is hit
    spotifyCustom.speak(5)

    try {
        console.log("reading req body")
        res.json(await spotifyCustom.connect(req.body.code))
    } catch (err) {
        res.send(err)
    }
})

// these functions are chained in async so that the response isn't being sent back until the very last endpoint is reached
app.post('/spotify-set', async (req, res) => {
    // console log the keyword passed in from client
    console.log(`reading in server the music keyword ${req.body.userData.musicKey}`)

    // run this line to make sure the connection is hit
    spotifyCustom.speak(5)

    try {
        console.log("reading req body")
        res.json(await spotifyCustom.playlistRead(req.body.userData))
    } catch (err) {
        res.send(err)
    }
})


// these functions are chained in async so that the response isn't being sent back until the very last endpoint is reached
app.post('/spotify-playlist', async (req, res) => {
    // console log the keyword passed in from client
    console.log(`reading in server the music keyword ${req.body.userData.musicKey}`)

    // run this line to make sure the connection is hit
    spotifyCustom.speak(5)

    try {
        console.log("reading req body")
        res.json(await spotifyCustom.playlistSelect(req.body.userData))
    } catch (err) {
        res.send(err)
    }
})


// route to pause music
// these functions are chained in async so that the response isn't being sent back until the very last endpoint is reached
app.post('/spotify-pause', async (req, res) => {
    // run this line to make sure the connection is hit
    spotifyCustom.speak(5)
    try {
        console.log("pausing music")
        res.json(await spotifyCustom.pause(req.body.userData))
    } catch (err) {
        res.send(err)
    }
})

// route to resume paused music
app.post('/spotify-resume', async (req, res) => {
    spotifyCustom.speak(5)

    try {
        console.log("resume playing music")
        res.json(await spotifyCustom.resume(req.body.userData))
    } catch (err) {
        res.send(err)
    }
})




app.post('/spotify-play-music', async (req, res) => {
    spotifyCustom.speak(5)

    try {
        console.log("playing music")
        res.json(await spotifyCustom.play(req.body.userData))
    } catch (err) {
        res.send(err)
    }
})

app.post('/spotify-control-audio', async (req, res) => {

    try {
        console.log("changing audio levels")
        res.json(await spotifyCustom.sound(req.body.userData))
    } catch (err) {
        res.send(err)
    }
})


// ignore this demo  code
app.get('/fruits', (req, res) => {
    res.json({
        "fruits": ["apple", "banana", "mango"]
    })
})



app.listen(PORT, () => {
    // console.log(`READING FOR SERVER - ${spotifyClient}`)
    // console.log(`READING FOR SERVER - ${spotifySecret}`)
    console.log(`server listening to port ${PORT}`)
})
