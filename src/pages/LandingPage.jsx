import React from 'react';
import LandingNavbar from '../components/LandingNavbar.jsx';
import LandingHero from '../components/LandingHero.jsx';
import LandingWhyChoose from '../components/LandingWhyChoose.jsx';
import LandingPageFooter from "../components/LandingPageFooter.jsx";

const LandingPage = () => {
    return (
        <div className="bg-examsy-bg min-h-screen text-examsy-text transition-colors duration-500">
            <LandingNavbar />
            <LandingHero />
            <LandingWhyChoose />
            <LandingPageFooter />
        </div>
    );
};

export default LandingPage;