// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            alert('CV download would start here. Please add your actual CV file.');
        });
    }

   

    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        header.style.transform = (scrollTop > lastScrollTop && scrollTop > 100) ? 'translateY(-100%)' : 'translateY(0)';
        lastScrollTop = scrollTop;
    });
    header.style.transition = 'transform 0.3s ease-in-out';

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.skill-card, .work-item, .contact-method');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

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
    updateActiveNavLink();

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

// Carousel
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
    carousel.addEventListener('mouseenter', ()=>{ paused = false; });
    carousel.addEventListener('mouseleave', ()=>{ paused = false; lastTimestamp = null; });
    carousel.addEventListener('touchstart', ()=>{ paused = false; }, {passive:true});
    carousel.addEventListener('touchend', ()=>{ paused = false; lastTimestamp = null; }, {passive:true});
})();

// Form with EmailJS
(function(){
    emailjs.init({
        publicKey: "ZIEG5myhqCa8TG9Id"
    }); // Your EmailJS Public Key

    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if(name && email && message){
            emailjs.send('service_6zfb7q6', 'template_etx1xnn', {
                name: name,
                email: email,
                message: message
            }).then(() => {
                formMessage.textContent = "✅ Thank you! Your message has been sent.";
                formMessage.style.color = "#16a34a"; // green
                form.reset();
            }).catch((error) => {
                formMessage.textContent = "❌ Something went wrong. Please try again.";
                formMessage.style.color = "#dc2626"; // red
                console.error(error);
            });
        } else {
            formMessage.textContent = "⚠️ Please fill in all fields.";
            formMessage.style.color = "#dc2626"; // red
        }
    });
})();