// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
  // Add animation classes to elements
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    // Alternate animation directions for variety
    if (index % 3 === 0) {
      section.classList.add('fade-in');
    } else if (index % 3 === 1) {
      section.classList.add('slide-in-left');
    } else {
      section.classList.add('slide-in-right');
    }
    observer.observe(section);
  });

  // Animate cards with scale effect
  const cards = document.querySelectorAll('.pillar, .program-card, .life-card, .vision-card, .profile-card, .bento-card, .atglance-card');
  cards.forEach((card, index) => {
    card.classList.add('scale-in');
    card.style.transitionDelay = `${(index % 3) * 0.1}s`;
    observer.observe(card);
  });

  // Animate section headers
  const headers = document.querySelectorAll('.section-header');
  headers.forEach(header => {
    header.classList.add('fade-in');
    observer.observe(header);
  });

  // Add smooth scroll behavior to navigation links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add parallax effect to hero section
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
          hero.style.transform = `translateY(${scrolled * 0.5}px)`;
          hero.style.opacity = 1 - (scrolled / 600);
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Add typing effect to main heading
  const mainHeading = document.querySelector('.hero-copy h2');
  if (mainHeading) {
    const text = mainHeading.textContent;
    mainHeading.textContent = '';
    mainHeading.style.opacity = '1';
    
    let charIndex = 0;
    const typeSpeed = 30;
    
    function typeWriter() {
      if (charIndex < text.length) {
        mainHeading.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, typeSpeed);
      }
    }
    
    setTimeout(typeWriter, 500);
  }

  // Add hover effect to stats
  const stats = document.querySelectorAll('.stat');
  stats.forEach(stat => {
    stat.addEventListener('mouseenter', () => {
      stat.style.transform = 'scale(1.1) rotate(-2deg)';
    });
    stat.addEventListener('mouseleave', () => {
      stat.style.transform = 'scale(1) rotate(0deg)';
    });
  });

  // Counter animation for stats
  const animateCounter = (element, target) => {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  };

  // Observe stats for counter animation
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const text = entry.target.textContent.trim();
        const number = parseInt(text);
        
        if (!isNaN(number)) {
          entry.target.dataset.animated = 'true';
          animateCounter(entry.target, number);
        }
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => {
    if (!isNaN(parseInt(stat.textContent))) {
      statsObserver.observe(stat);
    }
  });

  // Add gradient animation to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      btn.style.setProperty('--x', `${x}px`);
      btn.style.setProperty('--y', `${y}px`);
    });
  });

  // Add floating animation to cards on hover
  const floatingCards = document.querySelectorAll('.card, .hero-card .card');
  floatingCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      card.style.transform = `perspective(1000px) rotateX(${-y / 20}deg) rotateY(${x / 20}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });

  // Add stagger animation to navigation items
  const navItems = document.querySelectorAll('nav a');
  navItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      item.style.transition = 'all 0.3s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 * index);
  });

  // Chat Widget Functionality
  const chatToggle = document.getElementById('chatToggle');
  const chatBox = document.getElementById('chatBox');
  const chatClose = document.getElementById('chatClose');
  const chatForm = document.getElementById('chatForm');
  const chatSuccess = document.getElementById('chatSuccess');
  const userNameInput = document.getElementById('userName');
  const userEmailInput = document.getElementById('userEmail');
  const userMessageInput = document.getElementById('userMessage');

  if (chatToggle && chatBox && chatClose && chatForm && chatSuccess) {
    chatToggle.addEventListener('click', () => {
      chatBox.classList.toggle('open');
      chatToggle.classList.toggle('active'); // for icon change
      chatSuccess.classList.remove('show'); // Hide success message if it was open
      chatForm.style.display = 'flex'; // Show form again
    });

    chatClose.addEventListener('click', () => {
      chatBox.classList.remove('open');
      chatToggle.classList.remove('active');
    });

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = userNameInput.value;
      const email = userEmailInput.value;
      const message = userMessageInput.value;

      // Construct mailto link
      const subject = encodeURIComponent(`Question from ${name} via Website Chat`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoLink = `mailto:ixm205@piima.uz?subject=${subject}&body=${body}`;
      
      // Open default email client
      window.open(mailtoLink, '_blank');

      // Display success message and reset form
      chatForm.style.display = 'none';
      chatSuccess.classList.add('show');
      userNameInput.value = '';
      userEmailInput.value = '';
      userMessageInput.value = '';

      // Optionally, close chatbox after a delay or let user close it
      setTimeout(() => {
        chatBox.classList.remove('open');
        chatToggle.classList.remove('active');
        chatSuccess.classList.remove('show');
        chatForm.style.display = 'flex';
      }, 5000); // Close after 5 seconds
    });
  }

  console.log('🎨 Scroll animations initialized');
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});
