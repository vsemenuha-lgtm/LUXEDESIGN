import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease',
      padding: isScrolled ? '1rem 0' : '2rem 0',
      background: isScrolled ? 'rgba(15, 17, 21, 0.95)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : 'none'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" onClick={() => window.scrollTo(0, 0)} style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', textDecoration: 'none', zIndex: 1001 }}>
          LUXE<span style={{ color: 'var(--accent-color)' }}>DESIGN</span>
        </Link>
        
        <nav style={{ display: 'flex', gap: '2rem' }} className="desktop-nav">
          <a href={`${import.meta.env.BASE_URL}#about`} style={{ transition: 'color 0.3s' }}>О студии</a>
          <a href={`${import.meta.env.BASE_URL}#portfolio`}>Проекты</a>
          <a href={`${import.meta.env.BASE_URL}#services`}>Услуги</a>
          <a href={`${import.meta.env.BASE_URL}#workflow`}>Этапы</a>
          <a href={`${import.meta.env.BASE_URL}#contact`}>Контакты</a>
        </nav>
        
        <button className="btn-primary header-btn" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}>
          Обсудить проект
        </button>

        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ zIndex: 1001 }}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav className="mobile-menu">
          <a href={`${import.meta.env.BASE_URL}#about`} onClick={closeMenu}>О студии</a>
          <a href={`${import.meta.env.BASE_URL}#portfolio`} onClick={closeMenu}>Проекты</a>
          <a href={`${import.meta.env.BASE_URL}#services`} onClick={closeMenu}>Услуги</a>
          <a href={`${import.meta.env.BASE_URL}#workflow`} onClick={closeMenu}>Этапы</a>
          <a href={`${import.meta.env.BASE_URL}#contact`} onClick={closeMenu}>Контакты</a>
          <button className="btn-primary" style={{ marginTop: '1rem', width: 'fit-content' }} onClick={closeMenu}>
            Обсудить проект
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
