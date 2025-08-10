document.addEventListener('DOMContentLoaded', function() {
    // 1. Hero Video Control (Corrected)
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.muted = true; // Essential for autoplay
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (heroVideo.paused) {
                        heroVideo.play().catch(error => {
                            if (error.name !== 'AbortError') {
                                console.warn('Video autoplay failed:', error);
                            }
                        });
                    }
                } else {
                    if (!heroVideo.paused) {
                        heroVideo.pause();
                    }
                }
            });
        }, { threshold: 0.5 });
        videoObserver.observe(heroVideo);
    }

    // 2. Scroll Animations for Sections
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    if (animatedElements.length > 0) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    }

    // 3. WhatsApp Form Logic
    const whatsappInput = document.getElementById('whatsapp');
    if (whatsappInput) {
        const formatWhatsApp = (input) => {
            let value = input.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);
            let formatted = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
            if (value.length < 11) {
                formatted = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
            }
            input.value = formatted;
        };
        whatsappInput.addEventListener('input', () => formatWhatsApp(whatsappInput));
    }

    // 4. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 5. Smooth Scroll & Close Mobile Menu
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });
});

// Function to send email
function sendEmail() {
    const name = document.getElementById('nome')?.value;
    const whatsapp = document.getElementById('whatsapp')?.value;
    const city = document.getElementById('cidade')?.value;
    const service = document.getElementById('servico')?.value;
    const message = document.getElementById('mensagem')?.value;

    if (!name || !whatsapp || !city || !service || !message) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const subject = `Solicitação de Orçamento - ${name}`;
    const body = `Olá, me chamo ${name} e gostaria de um orçamento para serviço elétrico em ${city}.\n\nServiço de interesse: ${service}\n\nMensagem: ${message}\n\nContato WhatsApp: ${whatsapp}`;
    
    const mailtoUrl = `mailto:phcmoraes.tech@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
}

// This function needs to be global to be called by onclick="sendWhatsApp()"
function sendWhatsApp() {
    const name = document.getElementById('nome')?.value;
    const whatsapp = document.getElementById('whatsapp')?.value.replace(/\D/g, '');
    const city = document.getElementById('cidade')?.value;
    const service = document.getElementById('servico')?.value;
    const message = document.getElementById('mensagem')?.value;

    if (!name || !whatsapp || !city || !service || !message) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const text = `Olá, me chamo ${name} e gostaria de um orçamento para serviço elétrico em ${city}. Detalhes: ${message}`;
    const whatsappUrl = `https://wa.me/55${whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
}
