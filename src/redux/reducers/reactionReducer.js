import { createReducer } from "@reduxjs/toolkit";
import reactionActions from "../actions/reactionActions";

const { getReactions, updateReaction } = reactionActions;

const initialState = {
    reactioned: [
        {
            name: "like",
            reactioned: false,
        },
        {
            name: "love",
            reactioned: false,
        },
        {
            name: 'not-like',
            reactioned: false,
        },
        {
            name: 'surprise',
            reactioned: false,
        }
    ],

};

const reactionReducer = createReducer(initialState,
    (builder) => {
        builder
            .addCase(getReactions.fulfilled, (state, action) => {
                if (action.payload.success) {
                    return { ...state, reactions: action.payload.data, cantReactions: action.payload.lengthOfReactions, idReaction: action.payload.id };
                } else {
                    return { ...state, reactions: [], cantReactions: {}, idReaction: "" };
                }
            })
            .addCase(updateReaction.fulfilled, (state, action) => {
                state.reactioned.forEach(reaction => {
                    if (reaction.name === action.payload.name) {
                        reaction.reactioned = !reaction.reactioned
                    }
                })
            })
    }
);

export default reactionReducer;