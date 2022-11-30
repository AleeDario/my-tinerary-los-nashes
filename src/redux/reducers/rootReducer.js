import cityReducer from './cityReducer';
import hotelReducer from './hotelReducer';
import userReducer from './userReducer';
import reactionReducer from './reactionReducer';

const rootReducer = {
    city: cityReducer,
    hotel: hotelReducer,
    user: userReducer,
    reaction: reactionReducer,
}

export default rootReducer;