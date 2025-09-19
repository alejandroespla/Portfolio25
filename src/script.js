// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle Download CV button
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Create a temporary link to download a sample CV
            // In a real implementation, this would link to an actual PDF file
            alert('CV download would start here. Please add your actual CV file.');
            
            // Example of how to trigger a download:
            // const link = document.createElement('a');
            // link.href = 'path/to/your/cv.pdf';
            // link.download = 'Alex_Espla_CV.pdf';
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
        });
    }

    // Handle CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Scroll to contact section or open email client
            window.location.href = 'mailto:alexesplata@gmail.com?subject=Let\'s Work Together&body=Hi Alex, I\'d like to discuss a project with you.';
        });
    }

    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add transition to header
    header.style.transition = 'transform 0.3s ease-in-out';

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-card, .work-item, .contact-method');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add hover effects to skill cards
    

    // Add active state to navigation links based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (scrollPos >= top && scrollPos <= bottom) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Add active nav link styles
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: #23719f !important;
            position: relative;
        }
        .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            right: 0;
            height: 2px;
            background: #23719f;
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Call once on load

    // Mobile menu toggle (for future enhancement)
    function createMobileMenu() {
        const nav = document.querySelector('.nav-container');
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.style.display = 'none';
        menuToggle.style.background = 'none';
        menuToggle.style.border = 'none';
        menuToggle.style.fontSize = '24px';
        menuToggle.style.color = '#23719f';
        menuToggle.style.cursor = 'pointer';

        const navMenu = document.querySelector('.nav-menu');
        
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
        });

        nav.appendChild(menuToggle);

        // Show/hide mobile menu toggle based on screen size
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                menuToggle.style.display = 'block';
                navMenu.style.display = navMenu.classList.contains('mobile-active') ? 'flex' : 'none';
            } else {
                menuToggle.style.display = 'none';
                navMenu.style.display = 'flex';
                navMenu.classList.remove('mobile-active');
            }
        }

        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();

        // Add mobile menu styles
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            @media (max-width: 768px) {
                .nav-menu.mobile-active {
                    display: flex !important;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    padding: 20px;
                    gap: 20px;
                }
            }
        `;
        document.head.appendChild(mobileStyle);
    }

    createMobileMenu();
});


(function(){
    const carousel = document.getElementById('carousel');
    const logos = document.getElementById('logos');
    const root = document.documentElement;
  
    let speed = parseFloat(getComputedStyle(root).getPropertyValue('--speed')) || 60;
  
    function populateClones(){
      logos.querySelectorAll('.clone').forEach(n=>n.remove());
      const items = Array.from(logos.children).filter(n=>!n.classList.contains('clone'));
      if(items.length === 0) return;
  
      let totalWidth = logos.scrollWidth;
      const viewportWidth = carousel.clientWidth;
  
      let i = 0;
      while(totalWidth < viewportWidth * 2){
        const clone = items[i % items.length].cloneNode(true);
        clone.classList.add('clone');
        logos.appendChild(clone);
        totalWidth = logos.scrollWidth;
        i++;
        if(i>500) break;
      }
    }
  
    populateClones();
  
    let resizeTimeout;
    window.addEventListener('resize', ()=>{
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(()=> populateClones(), 120);
    });
  
    let paused = false;
    let lastTimestamp = null;
  
    function step(timestamp){
      if(lastTimestamp === null) lastTimestamp = timestamp;
      const delta = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;
  
      if(!paused){
        const deltaPx = speed * delta;
        carousel.scrollLeft += deltaPx;
  
        if(carousel.scrollLeft >= logos.scrollWidth - carousel.clientWidth){
          const originalWidth = Array.from(logos.children)
            .filter(c=>!c.classList.contains('clone'))
            .reduce((sum,el)=> sum + el.offsetWidth + parseFloat(getComputedStyle(logos).gap || 0), 0);
          carousel.scrollLeft = carousel.scrollLeft - originalWidth;
        }
      }
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  
    carousel.addEventListener('mouseenter', ()=>{ paused = true; });
    carousel.addEventListener('mouseleave', ()=>{ paused = false; lastTimestamp = null; });
    carousel.addEventListener('touchstart', ()=>{ paused = true; }, {passive:true});
    carousel.addEventListener('touchend', ()=>{ paused = false; lastTimestamp = null; }, {passive:true});
  })();

  
  const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if(name && email && message) {
        // Aquí puedes añadir tu lógica de envío (Fetch, EmailJS, etc.)
        formMessage.textContent = "Thanks! Your message has been sent.";
        form.reset();
    } else {
        formMessage.textContent = "Please fill in all fields.";
        formMessage.style.color = "#dc2626"; // rojo
    }
});
