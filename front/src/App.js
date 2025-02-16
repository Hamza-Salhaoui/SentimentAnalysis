import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Services from './components/Services';
import Reports from './components/Reports';
import Weather from './components/Weather';
import NewReport from "./components/NewReport";
import Analyses from "./components/Analyses";
import Statistics from "./components/Statistics";
import FileUpload from "./components/FileUpload";
import ContactMap from "./components/ContactMap";
import AnalysesLive from "./components/AnalysesLive";
import CreateReview from './components/CreateReview';
import AllReviews from './components/AllReviews';
import ReviewDetails from './components/ReviewDetails';
import UpdateReview from './components/UpdateReview';
import DeleteReview from './components/DeleteReview';
import AddReview from "./components/AddReview";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Redirection vers Login si l'utilisateur accède à "/" */}
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/new-report" element={<NewReport />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/analyses" element={<Analyses />} />
                <Route path="/upload" element={<FileUpload />} />
                <Route path="/contactmap" element={<ContactMap />} />
                <Route path="/analyseslive" element={<AnalysesLive />} />
                <Route path="/reviews" element={<AllReviews />} />
                <Route path="/reviews/create" element={<CreateReview />} />
                <Route path="/reviews/:id" element={<ReviewDetails />} />
                <Route path="/reviews/:id/update" element={<UpdateReview />} />
                <Route path="/reviews/:id/delete" element={<DeleteReview />} />
                <Route path="/add-review" element={<AddReview />} />
            </Routes>
        </Router>
    );
}

export default App;
