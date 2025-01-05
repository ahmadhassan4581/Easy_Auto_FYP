// App.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile/index';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import CarDetails from './components/CarDetails';
import Cart from './Cart/Cart';
import { CartProvider } from './context/CarContext'; // Import CartProvider
import PlaceOrder from './PlaceOrder/PlaceOrder';
import Review from './components/Review'
import MaintenanceDetails from './components/MaintenanceDetails';
import Comparison from './components/Comparison';
import NewCars from './components/NewCars';
import ContactUs from './components/ContactUs';
function App() {
    return (
        <CartProvider>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/comparison" element={<Comparison />} />
                    <Route path="/newcars" element={<NewCars />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/cars/:id" element={<CarDetails />} />
                    <Route path="/cart" element={<Cart />} /> {/* Cart route */}
                    <Route path="/place-order" element={<PlaceOrder />} />
                    <Route path="/review" element={<Review />} />
                    <Route path="/maintenance-details/:carId" element={<MaintenanceDetails />} />
                </Routes>
                <Footer />
            </div>
        </CartProvider>
    );
}

export default App;
