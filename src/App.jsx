import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navigation/Navbar';
import HeroSection from './components/Hero/HeroSection';
import Intro from './components/Intro';
import Services from './components/Services/Services';
import LibraryServiceForm from './components/LibraryServiceForm';

function App() {
  return (
    
      <BrowserRouter>
        <div className="">
            <Navbar />
            <HeroSection />
            <Intro />
            <Services />
            <LibraryServiceForm/>
        </div>
      </BrowserRouter>
    
  );
}

export default App;
