import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LiveCounter from './components/LiveCounter';
import FeaturesSection from './components/FeaturesSection';
import RegistrationForm from './components/RegistrationForm';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleScrollToRegister = () => {
    const el = document.getElementById('registration-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToExplore = () => {
    const el = document.getElementById('what-you-build');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Called when a new student completes registration
  const handleRegistrationSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Navigation Bar */}
      <Navbar onRegisterClick={handleScrollToRegister} />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {/* Section B: Hero Section */}
        <HeroSection 
          onRegisterClick={handleScrollToRegister} 
          onExploreClick={handleScrollToExplore} 
        />

        {/* Section C: Live Registration Counter */}
        <LiveCounter refreshTrigger={refreshTrigger} />

        {/* Section D: What You'll Learn & Build */}
        <FeaturesSection />

        {/* Section E: Registration Form */}
        <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />

        {/* Section F: Final Call to Action */}
        <FinalCTA onRegisterClick={handleScrollToRegister} />
      </main>

      {/* Section G: Footer */}
      <Footer />
    </div>
  );
}
