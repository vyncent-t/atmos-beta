import { createSlice } from "@reduxjs/toolkit"


const initialSpotifyState = {
    spotifyAuthLink: 'https://accounts.spotify.com/authorize?client_id=50885eb87ce14757bdde10e7fb01f91a&response_type=code&redirect_uri=https://atmos-project.herokuapp.com/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state',
    isSpotifyAuth: false,
    clientid: "50885eb87ce14757bdde10e7fb01f91a",
    clientsecret: "4acdaecbdc96463bbe8daee8d938550c",
    authcode: "none code",
    accesstoken: "none token",
    refreshtoken: "none refresh",
    expiresin: "none ex",

}

const spotifySlice = createSlice({
    name: "spotifyMusic",
    initialState: initialSpotifyState,
    reducers: {
        updateSpotifyAuth(state) {
            state.isSpotifyAuth = !state.isSpotifyAuth
        },
        updateSpotifyCode(state, action) {
            state.authcode = action.payload
        },
        updateSpotifyAccess(state, action) {
            state.accesstoken = action.payload
        },
        updateSpotifyRefresh(state, action) {
            state.refreshtoken = action.payload
        },
        updateSpotifyExpire(state, action) {
            state.expiresin = action.payload
        }
    }
})


export const saveSpotify = (res) => {
    return async (dispatch) => {
        await dispatch(
            spotifyActions.updateSpotifyAccess(res.data.accessToken))
        await dispatch(
            spotifyActions.updateSpotifyRefresh(res.data.refreshToken))
        await dispatch(
            spotifyActions.updateSpotifyExpire(res.data.expiresIn))
    }
}


export const spotifyActions = spotifySlice.actions

export default spotifySlice.reducer