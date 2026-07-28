import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="section">
      <div className="container fade-in">
        <h2 className="section-title">Свяжитесь с <span>нами</span></h2>
        <div className="glass" style={{ padding: '4rem', maxWidth: '800px', margin: '0 auto' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <input type="text" placeholder="Ваше имя" style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px', fontSize: '1.1rem' }} />
            <input type="text" placeholder="Телефон" style={{ padding: '1.2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '4px', fontSize: '1.1rem' }} />
            <button className="btn-primary" type="button" style={{ marginTop: '1rem', fontSize: '1.1rem' }}>Отправить заявку</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
