import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { FormProvider } from './context/FormContext';
import Navbar, { NavSpacer } from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import Home from './components/Home';
import Listings from './components/Listings';
import Seller from './components/Seller';
import News from './components/News';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import SearchRouter from './components/SearchRouter';
import AddListingPage from './components/AddListingPage';
import HeavyVehicleListing from './components/HeavyVehicleListing';
import FeaturedList from './components/FeaturedList';
import VehicleDetails from './components/VehicleDetails';
import AdminLogin from './admin/adminLogin';
import Dashboard from './admin/dashboard';


export default function App() {
  // Scroll to top on route change unless there's a hash (e.g., #results)
  function ScrollToTopOnNavigate() {
    const location = useLocation();
    React.useEffect(() => {
      if (!location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    }, [location.pathname, location.search, location.hash]);
    return null;
  }

  return (
    <FormProvider>
      <Router>
        <div className="App">
          <ScrollToTopOnNavigate />
          <Navbar />
          <NavSpacer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/listing" element={<Listings />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/sender" element={<Seller />} />
            <Route path="/news" element={<News />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/search" element={<SearchRouter />} />
            <Route path="/add-listing" element={<AddListingPage />} />
            <Route path="/heavy-vehicles" element={<HeavyVehicleListing />} />
            <Route path="/vehicle/:id" element={
              <ProtectedRoute>
                <VehicleDetails />
              </ProtectedRoute>
            } />
            <Route path="/category/:type/:vehicle" element={
              <main className="p-6">
                <h1 className="text-3xl font-bold mb-4">Category Page</h1>
                <p>Category content will be displayed here.</p>
              </main>
            } />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <AdminProtectedRoute>
                <Dashboard />
              </AdminProtectedRoute>
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </FormProvider>
  );
}
