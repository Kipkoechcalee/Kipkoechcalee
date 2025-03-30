// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    initSkillBars();
    initGallery();
    initLightbox();
    initForm();
    init3DEffects();
    setCurrentYear();
  });
  
  // ===== SKILL BARS ANIMATION =====
  function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector('.skill-fill');
          const percent = entry.target.querySelector('.skill-percent');
          const level = entry.target.dataset.level;
          
          fill.style.width = `${level}%`;
          percent.textContent = `${level}%`;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
  }
  
  // ===== GALLERY FILTER =====
  function initGallery() {
    const filterButtons = document.querySelectorAll('.gallery-filter button');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter items
        const filterValue = button.dataset.filter;
        document.querySelectorAll('.gallery-item').forEach(item => {
          item.style.display = (filterValue === 'all' || item.dataset.category === filterValue) 
            ? 'block' 
            : 'none';
          
          // Animate visible items
          if (item.style.display === 'block') {
            gsap.from(item, {
              opacity: 0,
              y: 50,
              duration: 0.5,
              ease: "power2.out"
            });
          }
        });
      });
    });
  }
  
  // ===== LIGHTBOX =====
  function initLightbox() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-content');
    const closeBtn = document.querySelector('.close-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;
    
    // Open lightbox
    document.querySelectorAll('.view-btn, .gallery-item img').forEach((el, index) => {
      el.addEventListener('click', (e) => {
        currentIndex = index;
        const imgSrc = e.currentTarget.closest('.gallery-item').querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      
      if (e.key === 'Escape') {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
      
      if (e.key === 'ArrowRight') navigateLightbox(1);
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
    });
    
    // Navigation functions
    function navigateLightbox(direction) {
      const items = Array.from(document.querySelectorAll('.gallery-item'));
      currentIndex = (currentIndex + direction + items.length) % items.length;
      lightboxImg.src = items[currentIndex].querySelector('img').src;
      
      // Add animation
      gsap.from(lightboxImg, {
        scale: 0.9,
        opacity: 0,
        duration: 0.3
      });
    }
  }
  
  // ===== 3D TILT EFFECT =====
  function init3DEffects() {
    const gallery = document.querySelector('.gallery-container');
    
    gallery.addEventListener('mousemove', (e) => {
      const items = document.querySelectorAll('.gallery-item');
      
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const tiltX = (y - centerY) / 20;
        const tiltY = (centerX - x) / 20;
        
        item.style.setProperty('--tilt-x', `${tiltX}deg`);
        item.style.setProperty('--tilt-y', `${tiltY}deg`);
      });
    });
    
    gallery.addEventListener('mouseleave', () => {
      document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.setProperty('--tilt-x', '0deg');
        item.style.setProperty('--tilt-y', '0deg');
      });
    });
  }
  
  // ===== FORM HANDLING =====
  function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const submitBtn = form.querySelector('button[type="submit"]');

      // Form Validation and Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset errors
    document.querySelectorAll('.error-message').forEach(el => {
      el.style.display = 'none';
    });
    document.querySelectorAll('.form-control').forEach(el => {
      el.classList.remove('error');
    });
    
    // Validate form
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    if (!name.value.trim()) {
      name.classList.add('error');
      name.nextElementSibling.style.display = 'block';
      isValid = false;
    }
    
    if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) {
      email.classList.add('error');
      email.nextElementSibling.style.display = 'block';
      isValid = false;
    }
    
    if (!message.value.trim()) {
      message.classList.add('error');
      message.nextElementSibling.style.display = 'block';
      isValid = false;
    }
    
    if (isValid) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual fetch)
      setTimeout(() => {
        contactForm.reset();
        document.querySelector('.form-success').style.display = 'block';
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          document.querySelector('.form-success').style.display = 'none';
        }, 5000);
      }, 1500);
    }
  });
}
      
      // Visual feedback
      submitBtn.disabled = true;
      const btnText = submitBtn.querySelector('.btn-text');
      const originalText = btnText.textContent;
      btnText.textContent = 'Sending...';
      
      try {
        // Replace with actual fetch to your backend
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success state
        btnText.textContent = 'Message Sent!';
        form.reset();
        
        // Confetti effect
        if (window.confetti) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      } catch (error) {
        btnText.textContent = 'Error!';
      } finally {
        setTimeout(() => {
          btnText.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }
  
  // ===== UTILITIES =====
  function setCurrentYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
  }
  
  // ===== GSAP ANIMATIONS =====
  function initAnimations() {
    // Animate elements on scroll
    gsap.utils.toArray('.gallery-item, .skill-bar').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: i * 0.1,
        ease: "back.out(1.7)"
      });
    });
    
    // Hero text animation
    gsap.from('.hero-content h1', {
      duration: 1,
      opacity: 0,
      y: -50,
      ease: "power3.out"
    });
  }
  
  // Initialize animations after everything loads
  window.addEventListener('load', initAnimations);