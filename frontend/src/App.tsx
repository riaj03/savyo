import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import FeaturedDeals from "./components/home/FeaturedDeals";
import TopStores from "./components/home/TopStores";
import Login from "./pages/Login";
import CreateDeal from "./pages/CreateDeal";
import Deals from "./pages/Deals";
import Stores from "./pages/Stores";
import Categories from "./pages/Categories";
import DealDetails from "./pages/DealDetails";
import Register from "./pages/Register";
import PrivateRoute from "./components/auth/PrivateRoute";

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedDeals />
      <TopStores />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/deals" element={<Deals />} />
            <Route
              path="/create-deal"
              element={
                <PrivateRoute>
                  <CreateDeal />
                </PrivateRoute>
              }
            />
            <Route path="/stores" element={<Stores />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/deals/:id" element={<DealDetails />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
