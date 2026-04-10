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
});
