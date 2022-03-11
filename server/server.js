require('dotenv').config({ path: `${__dirname}/../.env` })
const axios = require('axios')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const SpotifyWebApi = require('spotify-web-api-node');
const app = express();
app.use(cors())
app.use(bodyParser.json())

let spotifyClient = process.env.spotify_clientid
let spotifySecret = process.env.spotify_secret
let PORT = process.env.PORT || 5000


app.get('/fruits', (req, res) => {
    res.json({
        "fruits": ["apple", "banana", "mango"]
    })
})




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
    console.log(`READING FOR SERVER - ${spotifyClient}`)
    console.log(`READING FOR SERVER - ${spotifySecret}`)
    console.log(`server listening to port ${PORT}`)
})

// nodemon./ server.js localhost 3005