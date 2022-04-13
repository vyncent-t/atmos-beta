import { createSlice } from "@reduxjs/toolkit"



const initialSpotifyState = {
    isSpotifyAuth: false,
    clientid: "n",
    clientsecret: "n",
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