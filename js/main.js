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

});
