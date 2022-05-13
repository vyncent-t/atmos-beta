import { configureStore } from "@reduxjs/toolkit"

// we are exporting only the reducers from the slices made in other files since we unly need the reducers and actions
import contentReducer from "./Content"
import controlReducer from "./UserControls"
import spotifyReducer from "./SpotifyState"
import youtubeReducer from "./YouTubeState"


// configure store combines multiple slices in order to execute their reducers
const store = configureStore({
    reducer: {
        content: contentReducer,
        controls: controlReducer,
        spotify: spotifyReducer,
        youtube: youtubeReducer,
    }
})


export default store;