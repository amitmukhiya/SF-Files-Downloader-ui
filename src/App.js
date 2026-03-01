import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Documentation from "./components/pages/Documentation";
import ReleaseNotes from "./components/pages/ReleaseNotes";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";

import "./styles/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/documentation"  element={<Documentation />} />
        <Route path="/release-notes"  element={<ReleaseNotes />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        {/* Catch-all → Home */}
        <Route path="*"               element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
