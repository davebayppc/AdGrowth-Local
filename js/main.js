document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isOpen = answer.classList.contains('active');
      
      // Close all answers
      document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.remove('active'));
      
      // If clicking a closed answer, open it
      if (!isOpen) {
        answer.classList.add('active');
      }
    });
  });

  // Sticky Header Drop-Shadow on scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      header.style.boxShadow = 'var(--box-shadow-hover)';
    } else {
      header.style.boxShadow = 'var(--box-shadow)';
    }
  });

  // Intersection Observer for Kinetic Typography / Fade Ins
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // If element has a specific animation class data attribute, we could use that.
        // For now, if it has 'animate-on-scroll', we add the 'animate-fade-in-up' class.
        if (entry.target.classList.contains('slide-right')) {
            entry.target.classList.add('animate-slide-in-right');
        } else {
            entry.target.classList.add('animate-fade-in-up');
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));

  // Dynamic FAQ Schema (JSON-LD) Generator for AEO
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": Array.from(faqItems).map(item => {
        const questionText = item.querySelector('.faq-question').textContent.replace('+', '').trim();
        const answerText = item.querySelector('.faq-answer').textContent.trim();
        return {
          "@type": "Question",
          "name": questionText,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": answerText
          }
        };
      })
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  // Inject WhatsApp Floating Widget
  const waWidget = document.createElement('a');
  waWidget.href = 'https://wa.me/13212638910';
  waWidget.className = 'whatsapp-widget';
  waWidget.target = '_blank';
  waWidget.rel = 'noopener noreferrer';
  waWidget.setAttribute('aria-label', 'Chat with us on WhatsApp');
  waWidget.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 414.7c-32 0-64-8.6-92-24.8l-6.6-3.9-68.4 18 18.3-66.7-4.3-6.8c-17.7-28.2-27.1-61-27.1-94.4 0-101.4 82.5-183.9 184-183.9 54.1 0 105 21.1 143.3 59.4 38.3 38.3 59.4 89.2 59.4 143.3 0 101.4-82.5 183.9-183.9 183.9zm101.3-138.4c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.6-12 1.9-5.5-2.8-23.4-8.6-44.5-27.5-16.4-14.7-27.5-32.9-30.7-38.4-3.2-5.6-.3-8.6 2.4-11.4 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.6 5.6-9.3 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.7 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>';
  document.body.appendChild(waWidget);

});
