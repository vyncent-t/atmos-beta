require('dotenv').config({ path: `${__dirname}/../.env` })
import qs from "qs"



let spotifyClient = process.env.spotify_clientid
let spotifySecret = process.env.spotify_secret

export const musicAuth = async () => {
    const auth_token = Buffer.from(`${spotifyClient}:${spotifySecret}`, 'utf-8').toString('base64')


    try {
        const spotifyURL = 'https://accounts.spotify.com/api/token'
        const data = qs.stringify({ 'grant-type': 'client_credentials' })

        const response = await axios.post(spotifyURL, {
            headers: {
                'Authorization': `Basic ${auth_token}`,
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })

        console.log(response.data.access_token)
        return response.data.access_token

    } catch (error) {
        console.log(error)
    }
}


// export const musicAuth = async () => {


//     const headers = {
//         headers: {
//             Accept: "application/json",
//             'Content-Type': "application/json",
//         },
//         auth: {
//             username: spotifyClient,
//             password: spotifySecret,
//         },
//     }

//     const data = {
//         grant_type: "client_credentials",
//     }


//     try {
//         const response = await axios.post(
//             'https://accounts.spotify.com/api/token',
//             qs.stringify(data),
//             headers
//         );
//         console.log(response.data.access_token)
//         return response.data.access_token;
//     } catch (error) {
//         console.log(error)
//     }
// }








// app.post('http://localhost:3000', (req, res) => {

//     const code = req.body.code
//     axios.post({
//         url: "https://accounts.spotify.com/api/token",
//         params: {
//             grant_type: "client_credentials"
//         },
//         headers: {
//             "Accept": "appllication/json",
//             "Content-Type": "application/"
//         }
//     })

// })
