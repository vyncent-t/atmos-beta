import { createSlice } from "@reduxjs/toolkit"

const initialYoutubeState = {
    youtubechoices: {
        Beach: [
            "https://www.youtube.com/watch?v=xGRjCa49C6U",
            "https://www.youtube.com/watch?v=0ANLBX2EgmM",
            "https://www.youtube.com/watch?v=gnMajPQgkiA",
            "https://www.youtube.com/watch?v=UyZfCrrdbm8",
            "https://www.youtube.com/watch?v=Xn8tufsbSz0"
        ],

        Waterfall: [
            "https://www.youtube.com/watch?v=ixr0Plq0T2M",
            "https://www.youtube.com/watch?v=vemLEwjIxow",
            "https://www.youtube.com/watch?v=iXQ4AyyJSEk",
            "https://www.youtube.com/watch?v=rZ_LHofPEEs",
            "https://www.youtube.com/watch?v=n3PmzEVZWvc"
        ],
        City: [
            "https://www.youtube.com/watch?v=E2sSvVCRI4s",
            "https://www.youtube.com/watch?v=eZe4Q_58UTU",
            "https://www.youtube.com/watch?v=21HKaqA1rpo",
            "https://www.youtube.com/watch?v=JB0A8Me8EKk",
            "https://www.youtube.com/watch?v=CcDJZ5_nGZs",
        ],
        Forest: [
            "https://www.youtube.com/watch?v=qRTVg8HHzUo",
            "https://www.youtube.com/watch?v=PyFN_FYwqvc",
            "https://www.youtube.com/watch?v=hld4uaO1MDE",
            "https://www.youtube.com/watch?v=478TeAxm12g",
            "https://www.youtube.com/watch?v=qQU0UD8m6pE",
        ],
        Travel: [
            "https://www.youtube.com/watch?v=P6CLmbAwvMk",
            "https://www.youtube.com/watch?v=fh3EdeGNKus",
            "https://www.youtube.com/watch?v=vXCB1zGGFiY",
            "https://www.youtube.com/watch?v=ADt_RisXY0U",
            "https://www.youtube.com/watch?v=V_vj7BMawAI"
        ],
    },
    currentChoice: "none",

}

const youtubeSlice = createSlice({
    name: "youtubeVideo",
    initialState: initialYoutubeState,
    reducers: {
        updateChosen(state, action) {
            state.currentChoice = action.payload
        },
        updateContent(state, action) {
            state.currentContent = action.payload
        }
    }
})

export const youtubeActions = youtubeSlice.actions;

export default youtubeSlice.reducer;