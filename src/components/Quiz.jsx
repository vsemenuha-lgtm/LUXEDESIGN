import React, { useState } from 'react';

const questions = [
  {
    id: 'type',
    title: 'Какой у вас тип объекта?',
    options: ['Квартира в новостройке', 'Вторичное жилье', 'Загородный дом', 'Коммерческое помещение']
  },
  {
    id: 'area',
    title: 'Укажите площадь помещения:',
    options: ['До 50 м²', '50 - 100 м²', '100 - 150 м²', 'Более 150 м²']
  },
  {
    id: 'style',
    title: 'Какой стиль интерьера вам ближе?',
    options: ['Современный минимализм', 'Лофт / Индустриальный', 'Неоклассика', 'Скандинавский', 'Пока не знаю, нужна помощь']
  },
  {
    id: 'redevelopment',
    title: 'Потребуется ли перепланировка?',
    options: ['Да, планируем менять', 'Нет, оставим как есть', 'Пока не уверен(а)']
  },
  {
    id: 'timeline',
    title: 'Когда планируете начать ремонт?',
    options: ['В течение месяца', 'Через 1-3 месяца', 'Полгода и более', 'Сроки не горят']
  }
];

const Quiz = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleOptionSelect = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
    setTimeout(() => {
      if (currentStep < questions.length) {
        setCurrentStep(prev => prev + 1);
      }
    }, 300); // Небольшая задержка для анимации выбора
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Подготовка данных для Web3Forms
    // ВАЖНО: Вместо "YOUR_ACCESS_KEY_HERE" клиент должен вставить свой ключ от Web3Forms
    const formData = {
      access_key: "YOUR_ACCESS_KEY_HERE", // <-- СЮДА ВСТАВИТЬ КЛЮЧ!
      subject: "Новая заявка на дизайн/ремонт с сайта",
      Имя: name,
      Телефон: phone,
      "Тип объекта": answers.type,
      "Площадь": answers.area,
      "Стиль": answers.style,
      "Перепланировка": answers.redevelopment,
      "Сроки": answers.timeline
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
      } else {
        alert("Произошла ошибка при отправке. Пожалуйста, попробуйте позже.");
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка сети. Пожалуйста, проверьте подключение.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeQuiz = () => {
    setIsOpen(false);
    // Reset state after close animation
    setTimeout(() => {
      setCurrentStep(0);
      setAnswers({});
      setIsSuccess(false);
      setName('');
      setPhone('');
    }, 300);
  };

  return (
    <section id="quiz" className="section" style={{ backgroundColor: 'var(--accent-color)', color: '#111' }}>
      <div className="container fade-in" style={{ textAlign: 'center' }}>
        <h2 className="heading-section" style={{ marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Узнайте стоимость вашего проекта</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Пройдите короткий тест за 1 минуту и получите предварительную смету.</p>
        <button 
          onClick={() => setIsOpen(true)}
          style={{ 
            background: '#111', color: 'var(--accent-color)', 
            padding: '1.5rem 3rem', fontSize: '1.2rem', 
            border: 'none', borderRadius: '4px', cursor: 'pointer', textTransform: 'uppercase', fontWeight: 'bold',
            transition: 'transform 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Пройти тест
        </button>
      </div>

      {/* Quiz Modal Overlay */}
      {isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(5px)',
          padding: '1rem'
        }}>
          <div className="modal-content" style={{
            background: '#1a1d24', width: '100%', maxWidth: '600px',
            borderRadius: '16px', overflow: 'hidden', position: 'relative',
            color: 'white', border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            {/* Close button */}
            <button 
              onClick={closeQuiz}
              style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: 'transparent', border: 'none', color: 'var(--text-secondary)',
                cursor: 'pointer', zIndex: 10
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Progress bar */}
            {!isSuccess && (
              <div style={{ background: 'rgba(255,255,255,0.05)', height: '6px', width: '100%' }}>
                <div style={{
                  background: 'var(--accent-color)', height: '100%',
                  width: `${((currentStep) / (questions.length + 1)) * 100}%`,
                  transition: 'width 0.3s ease'
                }} />
              </div>
            )}

            <div style={{ padding: '3rem 2rem' }}>
              {isSuccess ? (
                <div style={{ textAlign: 'center' }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1.5rem auto' }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>Спасибо за заявку!</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
                    Мы получили ваши ответы. Наш специалист свяжется с вами в ближайшее время для обсуждения деталей и предварительного расчета.
                  </p>
                  <button onClick={closeQuiz} className="btn-primary" style={{ width: '100%' }}>
                    Закрыть
                  </button>
                </div>
              ) : currentStep < questions.length ? (
                // Render Question
                <div>
                  <div style={{ color: 'var(--accent-color)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                    Шаг {currentStep + 1} из {questions.length}
                  </div>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'white' }}>
                    {questions[currentStep].title}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {questions[currentStep].options.map((option, index) => {
                      const qId = questions[currentStep].id;
                      const isSelected = answers[qId] === option;
                      return (
                        <button
                          key={index}
                          onClick={() => handleOptionSelect(qId, option)}
                          style={{
                            padding: '1.2rem 1.5rem',
                            background: isSelected ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${isSelected ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)'}`,
                            color: isSelected ? 'var(--accent-color)' : 'white',
                            borderRadius: '8px',
                            textAlign: 'left',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                          onMouseOver={(e) => {
                            if(!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                          }}
                          onMouseOut={(e) => {
                            if(!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                          }}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  {currentStep > 0 && (
                    <button 
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      style={{ marginTop: '2rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Вернуться назад
                    </button>
                  )}
                </div>
              ) : (
                // Final Step: Contact Form
                <div>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'white' }}>
                    Последний шаг!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Оставьте ваши контакты, чтобы мы могли отправить вам результаты расчета.
                  </p>
                  
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <input 
                        type="text" 
                        required
                        placeholder="Ваше имя" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                          width: '100%', padding: '1.2rem',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px', color: 'white',
                          fontSize: '1.1rem'
                        }}
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        required
                        placeholder="Ваш телефон" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{
                          width: '100%', padding: '1.2rem',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px', color: 'white',
                          fontSize: '1.1rem'
                        }}
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn-primary" 
                      style={{ 
                        width: '100%', padding: '1.2rem', fontSize: '1.2rem',
                        opacity: isSubmitting ? 0.7 : 1
                      }}
                    >
                      {isSubmitting ? 'Отправка...' : 'Получить расчет'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textDecoration: 'underline', marginTop: '0.5rem' }}
                    >
                      Назад к вопросам
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Quiz;
