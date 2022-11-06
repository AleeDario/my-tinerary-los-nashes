import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;