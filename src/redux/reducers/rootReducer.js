import cityReducer from './cityReducer';
import hotelReducer from './hotelReducer';

const rootReducer = {
    city: cityReducer,
    hotel: hotelReducer
}

export default rootReducer;