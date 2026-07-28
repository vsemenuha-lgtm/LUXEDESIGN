import React from 'react';
import { PencilRuler, Home, Hammer } from 'lucide-react';

const Services = () => {
  const services = [
    { icon: <PencilRuler size={40} color="var(--accent-color)" />, title: 'Дизайн-проект', desc: 'Полный пакет чертежей, планировочное решение и 3D-визуализация.' },
    { icon: <Home size={40} color="var(--accent-color)" />, title: 'Авторский надзор', desc: 'Контроль строителей, закупка материалов и мебели по смете.' },
    { icon: <Hammer size={40} color="var(--accent-color)" />, title: 'Ремонт под ключ', desc: 'Реализация проекта нашей бригадой с гарантией качества.' }
  ];

  return (
    <section id="services" className="section" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
      <div className="container fade-in">
        <h2 className="section-title">Что мы <span>делаем</span></h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {services.map((s, i) => (
            <div key={i} className="glass" style={{ padding: '3rem 2rem', textAlign: 'center', transition: 'transform 0.3s', cursor: 'pointer' }} 
                 onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
                 onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              <div style={{ marginBottom: '1.5rem' }}>{s.icon}</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{s.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
