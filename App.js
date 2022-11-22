import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
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

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/details/:id" element={<DetailsCity/>} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/detailsH/:id" element={<DetailsHotels />} />
        <Route path="/newcity" element={<NewCity />} />
        <Route path="/newhotel" element={<NewHotel />} />
        <Route path="/mycities" element={<MyCities />} />
        <Route path="/myhotels" element={<MyHotels />} />
        <Route path="/myitineraries" element={<MyItineraries />} />
        <Route path="/myshows" element={<MyShows />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;