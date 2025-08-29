import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import VenueDetailsPage from "./pages/VenueDetailsPage/VenueDetailsPage";
import { AuthProvider } from "./services/auth/AuthContext";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RequireAuth from "./components/RequireAuth";
import StartHostingPage from "./pages/StartHostingPage/StartHostingPage";
import MyBookingsPage from "./pages/MyBookingsPage/MyBookingsPage";
import MyFavouritesPage from "./pages/MyFavouritesPage/MyFavouritesPage";
import AboutPage from "./pages/AboutPage/AboutPage";

function App() {

  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route element={<RequireAuth />}>
                <Route path="/my-bookings" element={<MyBookingsPage />} />
                <Route path="/my-favourites" element={<MyFavouritesPage />} />
                <Route path="/start-hosting" element={<StartHostingPage />} />
              </Route>
              <Route path="/venue/:id" element={<VenueDetailsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;