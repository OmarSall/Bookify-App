import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import VenueDetailsPage from "./pages/VenueDetailsPage/VenueDetailsPage";
// import AboutPage from "./pages/AboutPage/AboutPage";
// import FavouritesPage from "./pages/FavouritesPage/FavouritesPage";
// import StartHostingPage from "./pages/StartHostingPage/StartHostingPage";
// import LoginPage from "./pages/LoginPage/LoginPage";

function App() {

  return (
    <>
      <Router>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/venue/:id" element={<VenueDetailsPage />} />
              {/*<Route path="/about" element={<AboutPage />} />*/}
              {/*<Route path="/favourites" element={<FavouritesPage />} />*/}
              {/*<Route path="/start-hosting" element={<StartHostingPage />} />*/}
              {/*<Route path="/login" element={<LoginPage />} />*/}
              {/*<Route path="*" element={<HomePage />} />*/}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
