import { createReducer } from "@reduxjs/toolkit";
import reactionActions from "../actions/reactionActions";

const { getMyReactions,deleteReaction } = reactionActions;

const initialState = {
    myReactions: [],

};

const reactionReducer = createReducer(initialState,
    (builder) => {
        builder
            .addCase(getMyReactions.fulfilled, (state, action) => {
                return {...state, myReactions: action.payload}
            })
            .addCase(deleteReaction.fulfilled, (state, action) => {
                let newReactions = state.myReactions.filter(reaction => reaction._id !== action.payload.data._id)
                return {...state, myReactions: newReactions}
            })
    }
);

export default reactionReducer;