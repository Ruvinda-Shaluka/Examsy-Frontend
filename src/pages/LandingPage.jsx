import React from 'react';
import LandingNavbar from '../components/landingPage/LandingNavbar.jsx';
import LandingHero from '../components/landingPage/LandingHero.jsx';
import LandingWhyChoose from '../components/landingPage/LandingWhyChoose.jsx';
import LandingPageFooter from "../components/landingPage/LandingPageFooter.jsx";

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