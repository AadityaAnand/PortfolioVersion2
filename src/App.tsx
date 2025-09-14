import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Home />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
};

export default App;