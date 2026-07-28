import React from 'react';

const About = () => {
  return (
    <section id="about" className="section" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="container fade-in">
        <div className="responsive-grid-2" style={{ alignItems: 'center' }}>
          <div>
            <h2 className="section-title heading-section" style={{ textAlign: 'left' }}>
              <span>Больше</span>, чем просто дизайн
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
              LUXE DESIGN — это команда архитекторов, дизайнеров и инженеров, объединенных страстью к созданию функциональных и эстетичных пространств.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Мы берем на себя все заботы: от первой линии на чертеже до расстановки декора. Наш подход основан на глубоком понимании ваших потребностей и строгом контроле качества на каждом этапе.
            </p>
            
            <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem' }}>
              <div>
                <div style={{ fontSize: '2.5rem', color: 'var(--accent-color)', fontFamily: 'var(--font-heading)' }}>10+</div>
                <div style={{ color: 'var(--text-secondary)' }}>лет опыта</div>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', color: 'var(--accent-color)', fontFamily: 'var(--font-heading)' }}>150+</div>
                <div style={{ color: 'var(--text-secondary)' }}>проектов</div>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', color: 'var(--accent-color)', fontFamily: 'var(--font-heading)' }}>100%</div>
                <div style={{ color: 'var(--text-secondary)' }}>качество</div>
              </div>
            </div>
          </div>
          
          <div style={{ position: 'relative' }}>
            <div className="glass" style={{ padding: '1rem', position: 'absolute', bottom: '-2rem', left: '-2rem', zIndex: 2 }}>
              <p style={{ fontWeight: 'bold' }}>Елена Смирнова</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Главный архитектор</p>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80" 
              alt="Интерьер" 
              style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', height: '600px' }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
