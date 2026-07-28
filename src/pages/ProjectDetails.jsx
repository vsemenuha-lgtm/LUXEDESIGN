import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(id));
  
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const allImages = project ? [project.image, ...(project.gallery || [])] : [];

  const handleKeyDown = useCallback((e) => {
    if (currentImageIndex === null) return;
    if (e.key === 'Escape') setCurrentImageIndex(null);
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  }, [currentImageIndex, allImages.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Проект не найден</h2>
        <button onClick={() => navigate('/')} className="btn-primary" style={{ marginLeft: '1rem' }}>На главную</button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main style={{ paddingTop: '100px', paddingBottom: '6rem' }}>
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', transition: 'color 0.3s' }} className="back-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Назад к проектам
            </Link>
          </div>

          <h1 className="heading-project" style={{ marginBottom: '1rem' }}>{project.title}</h1>
          <div className="responsive-flex" style={{ marginBottom: '3rem', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'inline-block', padding: '0.25rem 1rem', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--accent-color)', borderRadius: '100px', fontSize: '1rem', height: 'fit-content', width: 'fit-content' }}>
              {project.category}
            </span>
            <div>
              <strong style={{ color: 'white', marginRight: '0.5rem' }}>{project.area}</strong> Площадь
            </div>
            <div>
              <strong style={{ color: 'white', marginRight: '0.5rem' }}>{project.timeframe}</strong> Сроки
            </div>
          </div>

          <img 
            src={project.image} 
            alt={project.title}
            onClick={() => setCurrentImageIndex(0)}
            style={{ width: '100%', height: '600px', objectFit: 'cover', borderRadius: '16px', marginBottom: '4rem', cursor: 'zoom-in' }}
          />

          <div className="responsive-grid-2" style={{ marginBottom: '5rem' }}>
            <div>
              <h3 className="heading-medium" style={{ marginBottom: '1.5rem', color: 'white' }}>О проекте</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {project.description}
              </p>
            </div>
            <div>
              <h3 className="heading-medium" style={{ marginBottom: '1.5rem', color: 'white' }}>Проделанная работа</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {project.tasks.map((task, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="heading-medium" style={{ marginBottom: '2rem', color: 'white', textAlign: 'center' }}>Галерея проекта</h3>
          <div className="responsive-grid-4">
            {project.gallery && project.gallery.map((imgUrl, index) => (
              <img 
                key={index}
                src={imgUrl} 
                alt={`${project.title} фото ${index + 1}`}
                onClick={() => setCurrentImageIndex(index + 1)}
                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px', transition: 'transform 0.3s', cursor: 'zoom-in' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {currentImageIndex !== null && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.95)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <button 
            onClick={() => setCurrentImageIndex(null)}
            style={{
              position: 'absolute', top: '2rem', right: '2rem', background: 'rgba(255,255,255,0.1)',
              border: 'none', color: 'white', width: '50px', height: '50px', borderRadius: '50%',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 10001, transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--accent-color)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <button 
            onClick={prevImage}
            style={{
              position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white',
              width: '60px', height: '60px', borderRadius: '50%', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--accent-color)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <img 
            src={allImages[currentImageIndex]} 
            alt="Enlarged gallery"
            style={{ maxWidth: '95%', maxHeight: '90vh', objectFit: 'contain', userSelect: 'none' }}
          />

          <button 
            onClick={nextImage}
            style={{
              position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white',
              width: '60px', height: '60px', borderRadius: '50%', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--accent-color)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <div style={{ position: 'absolute', bottom: '2rem', color: 'var(--text-secondary)', fontSize: '1.2rem', letterSpacing: '2px' }}>
            {currentImageIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetails;
