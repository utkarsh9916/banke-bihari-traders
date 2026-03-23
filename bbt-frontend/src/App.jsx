import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StoreDetails from "./pages/StoreDetails"
import HomePage from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Stores from "./pages/Stores";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Wholesale from "./pages/Wholesale";
import CategoriesPage from "./pages/CategoriesPage";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen"> {/* 👈 Add this wrapper */}
        <Header />
        <main className="flex-grow"> {/* 👈 Main content takes available space */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/wholesale" element={<Wholesale />} />
            <Route path="/store/:id" element={<StoreDetails />} />
            <Route path="/categories" element={<CategoriesPage />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer /> {/* 👈 Footer stays at bottom */}
      </div>
    </Router>
  );
}

export default App;