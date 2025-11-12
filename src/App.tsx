import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import MapPage from "./pages/MapPage";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mapa" element={<MapPage />} />
      </Routes>
      <Footer />
    </>
  );
}
