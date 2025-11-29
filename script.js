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

  // Chat Widget Functionality (Firebase Integrated)
  const chatToggle = document.getElementById('chatToggle');
  const chatBox = document.getElementById('chatBox');
  const chatClose = document.getElementById('chatClose');
  const chatMessages = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const chatSuccess = document.getElementById('chatSuccess');
  const userMessageInput = document.getElementById('userMessage');
  const authSection = document.getElementById('authSection');
  const googleSignInBtn = document.getElementById('googleSignInBtn');

  let currentUser = null; // To store the current authenticated user

  // Function to render messages
  const renderMessage = (message, isBot = false) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.classList.add(isBot ? 'bot-message' : 'user-message'); // Added user-message class

    messageElement.innerHTML = `
      <div class="message-avatar">
        ${isBot ? `
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        ` : `
          <img src="${message.avatar || 'https://via.placeholder.com/24/3b82f6/ffffff?text=U'}" alt="${message.userName}" style="border-radius: 50%; width: 24px; height: 24px;">
        `}
      </div>
      <div class="message-content">
        <p>${message.text}</p>
        ${!isBot ? `<span class="message-info">${message.userName || 'You'} • ${new Date(message.timestamp).toLocaleTimeString()}</span>` : ''}
      </div>
    `;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to bottom
  };

  // Initial bot message
  renderMessage({ text: 'Hi! 👋 How can we help you today?' }, true);


  // Handle Google Sign-in
  if (googleSignInBtn) {
    googleSignInBtn.addEventListener('click', async () => {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
      } catch (error) {
        console.error("Error during Google Sign-in:", error);
      }
    });
  }

  // Listen for authentication state changes
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      currentUser = user;
      authSection.style.display = 'none';
      chatForm.style.display = 'flex';

      // Save user profile to Firestore if it's new or update it
      const userRef = db.collection('users').doc(user.uid);
      const doc = await userRef.get();
      if (!doc.exists) {
        await userRef.set({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      } else {
        await userRef.update({
          displayName: user.displayName,
          photoURL: user.photoURL,
          lastLoginAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }

      // Load chat history
      loadChatHistory(user.uid);
      // Remove previous bot message
      chatMessages.innerHTML = ''; // Clear previous messages
      renderMessage({ text: `Hi ${user.displayName}! How can we help you today?` }, true);


    } else {
      currentUser = null;
      authSection.style.display = 'flex';
      chatForm.style.display = 'none';
      chatMessages.innerHTML = ''; // Clear messages when logged out
      renderMessage({ text: 'Please sign in to start chatting.' }, true);
    }
  });

  // Load chat history from Firestore
  const loadChatHistory = (userId) => {
    db.collection('chats')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        chatMessages.innerHTML = ''; // Clear current messages
        renderMessage({ text: currentUser ? `Hi ${currentUser.displayName}! How can we help you today?` : 'Please sign in to start chatting.' }, true);

        snapshot.forEach((doc) => {
          const message = doc.data();
          renderMessage({
            text: message.text,
            userName: message.userName,
            avatar: message.userPhoto,
            timestamp: message.timestamp.toDate()
          });
        });
      }, (error) => {
        console.error("Error loading chat history:", error);
      });
  };

  // Chat form submission (using Firestore)
  if (chatForm) {
    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const messageText = userMessageInput.value.trim();

      if (messageText && currentUser) {
        try {
          await db.collection('chats').add({
            userId: currentUser.uid,
            userName: currentUser.displayName,
            userEmail: currentUser.email,
            userPhoto: currentUser.photoURL,
            text: messageText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          });
          userMessageInput.value = ''; // Clear input
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }
    });
  }


  // Toggle chatbox functionality
  if (chatToggle && chatBox && chatClose) {
    chatToggle.addEventListener('click', () => {
      chatBox.classList.toggle('open');
      chatToggle.classList.toggle('active'); // for icon change
      chatSuccess.classList.remove('show'); // Hide success message if it was open
    });

    chatClose.addEventListener('click', () => {
      chatBox.classList.remove('open');
      chatToggle.classList.remove('active');
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
