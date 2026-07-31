import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const Portfolio = () => {
  const [filter, setFilter] = useState('Все');
  const categories = ['Все', 'Квартиры', 'Дома', 'Коммерция'];

  const filteredProjects = filter === 'Все' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="section">
      <div className="container fade-in">
        <h2 className="section-title">Наши <span>Проекты</span></h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              className={filter === cat ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '1.2rem 2rem', flexGrow: 1, fontSize: '1.2rem' }}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="responsive-grid-2">
          {filteredProjects.map(project => (
            <Link 
              to={`/project/${project.id}`}
              key={project.id} 
              style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', cursor: 'pointer', display: 'block' }}
            >
              <img 
                className="portfolio-img"
                loading="lazy"
                src={project.image} 
                alt={project.title} 
                style={{ width: '100%', height: 'auto', aspectRatio: '4/5', objectFit: 'cover', transition: 'transform 0.5s' }} 
              />
              <div className="portfolio-info" style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                padding: '3rem 2rem 2rem 2rem',
                color: 'white'
              }}>
                <h3 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                <p style={{ color: 'var(--accent-color)', fontSize: '1.2rem' }}>{project.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
