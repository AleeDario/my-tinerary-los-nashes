import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import userActions from "./redux/actions/userActions";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Cities from "./pages/Cities";
import Hotels from "./pages/Hotels";
import DetailsCity from "./pages/DetailsCity";
import DetailsHotels from "./pages/DetailsHotels";
import NewCity from "./pages/NewCity";
import NewHotel from "./pages/NewHotel";
import MyCities from "./pages/MyCities";
import MyHotels from "./pages/MyHotels"
import MyItineraries from "./pages/MyItineraries";
import MyShows from "./pages/MyShows";
import ProtectedRoute from "./components/ProtectedRoute";
import MyProfile from "./pages/MyProfile";
import NewItinerary from "./pages/NewItinerary";
import NewShow from "./pages/NewShow";
import NewReaction from "./pages/NewReaction";
import { useNavigate } from "react-router-dom";

function App() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { reLogin } = userActions
    const { online, role } = useSelector(state => state.user)
    const token = JSON.parse(localStorage.getItem("token"))

    useEffect(() => {
        if (token) {
            dispatch(reLogin(token.token.user))
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route element={<ProtectedRoute isAllowed={!online} reDirect='/home' />}>
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                </Route>
                <Route path="/cities" element={<Cities />} />
                <Route path="/details/:id" element={<DetailsCity />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/detailsH/:id" element={<DetailsHotels />} />
                {online && (
                    <>
                        <Route element={<ProtectedRoute isAllowed={!!online} reDirect='/signin' />}>
                            <Route path="/myprofile" element={<MyProfile />} />
                        </Route>
                        <Route element={<ProtectedRoute isAllowed={role === 'admin'} reDirect='/signin' />}>
                            <Route path="/mycities" element={<MyCities />} />
                            <Route path="/myhotels" element={<MyHotels />} />
                            <Route path="/newcity" element={<NewCity />} />
                            <Route path="/newhotel" element={<NewHotel />} />
                            <Route path="/newreactions" element={<NewReaction />} />
                        </Route>
                        <Route element={<ProtectedRoute isAllowed={role === 'user'} reDirect='/signin' />}>
                            <Route path="/myitineraries" element={<MyItineraries />} />
                            <Route path="/myshows" element={<MyShows />} />
                            <Route path="/newitinerary" element={<NewItinerary />} />
                            <Route path="/newshow" element={<NewShow />} />
                        </Route>
                    </>

                )}

                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Layout>
    );
}

export default App;