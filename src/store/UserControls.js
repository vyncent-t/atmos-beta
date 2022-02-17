import { createSlice } from "@reduxjs/toolkit"
// using toolkit in order to shortcut some template code to make overall code smaller and easier to manage

// setting the initail state object, this is the master state which will be an expanded object
const initialControlState = {
    showContentBox: true
}


// the create slice method creates sections in which we can manipulate the state within the reducer
const userControlSlice = createSlice({
    name: "userControls",
    initialState: initialControlState,
    reducers: {
        toggleContentBox(state) {
            state.showContentBox = !state.showContentBox
        }
    }

})


// using contentSlice .actions will match the reducers to their own generated key pairs, no longer need to write out {type: example}
// toolkit creates an "action creator"  which will create the actions object for us, using the methods we run in the reducers prop under contentSlice
export const controlActions = userControlSlice.actions;

// we will be exporting only the reducers to the configure store since it wont need the entire slice, just the reducers and actions

export default userControlSlice.reducer;