import React, { useRef } from 'react';
import bgVideo from '../assets/bg-video.mp4';

const Hero = () => {
  const videoRef = useRef(null);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 5) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline
        onTimeUpdate={handleTimeUpdate}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          zIndex: 0
        }}
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to right, rgba(15, 17, 21, 0.95) 0%, rgba(15, 17, 21, 0.5) 100%)',
        zIndex: 1
      }}></div>
      
      <div className="container fade-in" style={{ position: 'relative', zIndex: 2 }}>
        <h1 className="heading-hero" style={{
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          maxWidth: '800px',
        }}>
          Создаем интерьеры, в которых хочется <span style={{ color: 'var(--accent-color)', fontStyle: 'italic' }}>жить</span>
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          marginBottom: '3rem'
        }}>
          Премиальный дизайн интерьера и ремонт под ключ в Украине. Мы превращаем ваши мечты в безупречную реальность с вниманием к каждой детали.
        </p>
        <div className="responsive-flex">
          <a href={`${import.meta.env.BASE_URL || ''}#portfolio`} className="btn-primary" style={{ textAlign: 'center' }}>Смотреть проекты</a>
          <a href={`${import.meta.env.BASE_URL || ''}#quiz`} className="btn-secondary" style={{ textAlign: 'center' }}>Рассчитать стоимость</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
