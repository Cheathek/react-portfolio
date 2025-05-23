import React, { useEffect, useState, useRef } from 'react';
import { Element } from 'react-scroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import Alert from './components/Alert';
import ParticleBackground from './components/ParticleBackground';
import AOS from 'aos';
import Text from './components/LocalizedText';
import 'aos/dist/aos.css';
import 'boxicons/css/boxicons.min.css';

const App = () => {
  const [theme, setTheme] = useState('light');
  const [alertMessage, setAlertMessage] = useState(null);
  const alertTimeoutRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true, offset: 100 });

    const savedTheme =
      localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;

    const handleContextMenu = (e) => {
      e.preventDefault();
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
      setAlertMessage(null);
      setTimeout(() => {
        setAlertMessage({
          text: <Text>alert.right-click</Text>,
          subtitle: <Text>alert.protect</Text>,
        });
      }, 10);
    };

    // Handle F12 key press and other developer tools shortcuts
    const handleKeyDown = (e) => {
      // Block F12 key
      if (e.key === 'F12') {
        e.preventDefault();
        if (alertTimeoutRef.current) {
          clearTimeout(alertTimeoutRef.current);
        }
        setAlertMessage(null);
        setTimeout(() => {
          setAlertMessage({
            text: <Text>alert.f12</Text>,
            subtitle: <Text>alert.protect</Text>,
          });
        }, 10);
        return false;
      }

      // Block Ctrl+Shift+I (alternative dev tools shortcut)
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        if (alertTimeoutRef.current) {
          clearTimeout(alertTimeoutRef.current);
        }
        setAlertMessage(null);
        setTimeout(() => {
          setAlertMessage({
            text: <Text>alert.c+s+i</Text>,
            subtitle: <Text>alert.protect</Text>,
          });
        }, 10);
        return false;
      }

      // Block Ctrl+Shift+J (Chrome console shortcut)
      if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        if (alertTimeoutRef.current) {
          clearTimeout(alertTimeoutRef.current);
        }
        setAlertMessage(null);
        setTimeout(() => {
          setAlertMessage({
            text: <Text>alert.c+s+j</Text>,
            subtitle: <Text>alert.protect</Text>,
          });
        }, 10);
        return false;
      }

      // Block Ctrl+Shift+C (Chrome inspector shortcut)
      if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        if (alertTimeoutRef.current) {
          clearTimeout(alertTimeoutRef.current);
        }
        setAlertMessage(null);
        setTimeout(() => {
          setAlertMessage({
            text: <Text>alert.c+s+c</Text>,
            subtitle: <Text>alert.protect</Text>,
          });
        }, 10);
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', AOS.refresh);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', AOS.refresh);
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
  };

  const showAlert = (message, subtitle) => {
    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current);
    }
    setAlertMessage(null);
    setTimeout(() => {
      setAlertMessage({ text: message, subtitle });
    }, 10);
  };

  return (
    <div className='relative min-h-screen'>
      {/* Always render Alert, it handles its own visibility */}
      <Alert message={alertMessage?.text || ''} subtitle={alertMessage?.subtitle || ''} />

      <ParticleBackground theme={theme} />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
          <Element key={section} name={section}>
            {section === 'home' ? (
              <Hero />
            ) : section === 'about' ? (
              <About />
            ) : section === 'skills' ? (
              <Skills />
            ) : section === 'projects' ? (
              <Projects />
            ) : (
              <Contact />
            )}
          </Element>
        ))}
      </main>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default App;
