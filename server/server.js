require('dotenv').config({ path: `${__dirname}/../.env` })
const qs = require('qs')
const axios = require('axios')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const QueryString = require('qs');
// const SpotifyWebApi = require('spotify-web-api-node');

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


    res.json({
        "redirectURL": `https://accounts.spotify.com/authorize?client_id=${spotifyClient}&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`
    })
})


// connection route to grab token once page renders from redirect


app.post('/spotify-connect', (req, res) => {
    // console log the code passed in from params on client
    console.log(req.body.code)



    // spotify auth function that makes axios post req to auth api endpoint
    async function spotifyAuth(spotifyCode) {
        try {
            const data = qs.stringify(
                {
                    grant_type: "client_credentials",
                    code: spotifyCode,
                    redirect_uri: 'http://localhost:3000/',
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


            console.log("PRINTING SPOTIFY TOKEN")
            console.log(response.data.access_token)
            res.json({
                "token": response.data.access_token
            })
            return response.data.access_token
        } catch (error) {
            console.log(error)
            console.log("spotify error")
        }
    }

    try {
        spotifyAuth(req.body.code)
        console.log("auth token")

    } catch (error) {
        console.log(error)
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
    console.log(`READING FOR SERVER - ${spotifyClient}`)
    console.log(`READING FOR SERVER - ${spotifySecret}`)
    console.log(`server listening to port ${PORT}`)
})

// nodemon./ server.js localhost 3005