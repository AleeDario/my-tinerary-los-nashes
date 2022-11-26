import cityReducer from './cityReducer';
import hotelReducer from './hotelReducer';
import userReducer from './userReducer';

const rootReducer = {
    city: cityReducer,
    hotel: hotelReducer,
    user: userReducer,
}

export default rootReducer;