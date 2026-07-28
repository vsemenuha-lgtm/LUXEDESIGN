import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Services from '../components/Services';
import Quiz from '../components/Quiz';
import Workflow from '../components/Workflow';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <Workflow />
        <Quiz />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
