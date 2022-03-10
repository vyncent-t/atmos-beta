require('dotenv').config({ path: `${__dirname}/../.env` })
const axios = require('axios')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();
app.use(cors())
app.use(bodyParser.json())

let spotifyClient = process.env.spotify_clientid
let spotifySecret = process.env.spotify_secret


app.post('http://localhost:3000/music/token', (req, res) => {

    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: `${spotifyClient}`,
        clientSecret: `${spotifySecret}`
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    })
        .catch(err => {
            console.log(err)
        })
})




app.post('http://localhost:3000/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    console.log(refreshToken)

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: `${spotifyClient}`,
        clientSecret: `${spotifySecret}`,
        refreshToken,
    })

    spotifyApi
        .refreshAccessToken()
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in,
            })
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
})


app.listen(process.env.PORT || 3001, () => {
    console.log(`READING FOR SERVER - ${spotifyClient}`)
    console.log(`READING FOR SERVER - ${spotifySecret}`)
    console.log("server live")
})

// nodemon./ server.js localhost 3005