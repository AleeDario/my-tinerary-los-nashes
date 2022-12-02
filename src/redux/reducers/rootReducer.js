import cityReducer from './cityReducer';
import hotelReducer from './hotelReducer';
import userReducer from './userReducer';
import reactionReducer from './reactionReducer';
import commentReducer from './commentReducer';

const rootReducer = {
    city: cityReducer,
    hotel: hotelReducer,
    user: userReducer,
    reaction: reactionReducer,
    comment: commentReducer,
}

export default rootReducer;