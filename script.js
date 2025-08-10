// Cache de elementos DOM
const domCache = {
    heroVideo: document.querySelector('.hero-video'),
    header: document.querySelector('.main-header'),
    navToggle: document.querySelector('.nav-toggle'),
    mainNav: document.querySelector('.main-nav ul'),
    contactForm: document.getElementById('contact-form'),
    // Adicione outros elementos frequentemente acessados aqui
};

/**
 * Inicializa os listeners de eventos quando o DOM estiver pronto
 */
function init() {
    // 1. Controle de vídeo do herói com Intersection Observer
    initHeroVideo();
    
    // 2. Animação do cabeçalho no scroll
    initHeaderScroll();
    
    // 3. Navegação móvel
    initMobileNav();
    
    // 4. Formulário de contato
    initContactForm();
    
    // 5. Funções de acessibilidade
    initAccessibility();
}

/**
 * Inicializa o controle do vídeo do herói com Intersection Observer
 */
function initHeroVideo() {
    if (!domCache.heroVideo) return;
    
    // Configurações do Intersection Observer
    const observerOptions = {
        root: null,
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            
            if (entry.isIntersecting) {
                if (video.paused) {
                    video.play().catch(error => {
                        // Suprime erros de autoplay não críticos
                        if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
                            console.warn('Falha na reprodução automática do vídeo:', error);
                        }
                    });
                }
            } else if (!video.paused) {
                video.pause();
            }
        });
    }, observerOptions);
    
    // Configura o vídeo para reprodução otimizada
    domCache.heroVideo.muted = true;
    domCache.heroVideo.playsInline = true;
    domCache.heroVideo.setAttribute('playsinline', '');
    domCache.heroVideo.setAttribute('preload', 'metadata');
    
    // Inicia a observação
    videoObserver.observe(domCache.heroVideo);
    
    // Lida com a troca de orientação para evitar problemas de layout
    window.addEventListener('orientationchange', () => {
        if (domCache.heroVideo) {
            domCache.heroVideo.style.height = `${window.innerHeight}px`;
        }
    });
}

/**
 * Inicializa a animação do cabeçalho no scroll
 */
function initHeaderScroll() {
    if (!domCache.header) return;
    
    // Otimização de performance com requestAnimationFrame
    let ticking = false;
    
    const updateHeader = () => {
        if (window.scrollY > 50) {
            domCache.header.classList.add('scrolled');
        } else {
            domCache.header.classList.remove('scrolled');
        }
        ticking = false;
    };
    
    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    };
    
    // Usa o passive: true para melhorar a performance do scroll
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Verificação inicial
    updateHeader();
}

/**
 * Inicializa a navegação móvel
 */
function initMobileNav() {
    if (!domCache.navToggle || !domCache.mainNav) return;
    
    // Adiciona classe para indicar suporte a JavaScript
    document.documentElement.classList.add('js-enabled');
    
    // Toggle do menu móvel
    const toggleMenu = (e) => {
        e.preventDefault();
        domCache.mainNav.classList.toggle('active');
        domCache.navToggle.setAttribute(
            'aria-expanded',
            domCache.navToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    };
    
    // Adiciona atributos ARIA para acessibilidade
    domCache.navToggle.setAttribute('aria-expanded', 'false');
    domCache.navToggle.setAttribute('aria-controls', 'main-navigation');
    domCache.navToggle.setAttribute('aria-label', 'Alternar navegação');
    domCache.mainNav.id = 'main-navigation';
    
    // Adiciona o evento de clique
    domCache.navToggle.addEventListener('click', toggleMenu);
    
    // Fecha o menu ao clicar em um link
    const navLinks = domCache.mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (domCache.mainNav.classList.contains('active')) {
                domCache.mainNav.classList.remove('active');
                domCache.navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

/**
 * Inicializa o formulário de contato
 */
function initContactForm() {
    if (!domCache.contactForm) return;
    
    // Validação do formulário
    domCache.contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Aqui você pode adicionar validação personalizada
        const formData = new FormData(domCache.contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Validação básica
        let isValid = true;
        const requiredFields = ['nome', 'email', 'mensagem'];
        
        requiredFields.forEach(field => {
            if (!formValues[field]?.trim()) {
                isValid = false;
                const input = domCache.contactForm.querySelector(`[name="${field}"]`);
                if (input) {
                    input.classList.add('error');
                }
            }
        });
        
        if (isValid) {
            // Aqui você pode adicionar o código para enviar o formulário
            console.log('Formulário válido, enviando...', formValues);
            // Exemplo: sendContactForm(formValues);
        } else {
            console.warn('Por favor, preencha todos os campos obrigatórios.');
        }
    });
    
    // Remove a classe de erro ao digitar
    const formInputs = domCache.contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                input.classList.remove('error');
            }
        });
    });
}

/**
 * Inicializa melhorias de acessibilidade
 */
function initAccessibility() {
    // Adiciona suporte a teclado para elementos interativos
    document.addEventListener('keydown', (e) => {
        // Fecha o menu ao pressionar ESC
        if (e.key === 'Escape' && domCache.mainNav?.classList.contains('active')) {
            domCache.mainNav.classList.remove('active');
            if (domCache.navToggle) {
                domCache.navToggle.setAttribute('aria-expanded', 'false');
                domCache.navToggle.focus();
            }
        }
    });
    
    // Adiciona foco visível para elementos interativos
    document.addEventListener('keyup', (e) => {
        if (e.key === 'Tab') {
            document.documentElement.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.documentElement.classList.remove('keyboard-nav');
    });
}

// Inicializa o script quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM já está pronto
    init();
}

// Função para o cálculo (se necessário)
function calcular() {
    console.log("Função de cálculo chamada");
    // Implemente a lógica de cálculo aqui
}
    }

    // 4. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Accordion Functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const content = item.querySelector('.accordion-content');
            const icon = header.querySelector('i');

            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                    otherItem.querySelector('.accordion-header i').classList.remove('fa-minus');
                    otherItem.querySelector('.accordion-header i').classList.add('fa-plus');
                }
            });

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            }
        });
    });

    // 6. Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendMail(); // Assuming sendMail is defined elsewhere and handles the contact form
        });
    }
});

// Function for the calculator
function calcular() {
    console.log("Função calcular chamada.");

    // Get values from the calculation form inputs
    const demanda = document.getElementById('demanda').value;
    const custoUnitario = document.getElementById('custo_unitario').value;
    const custoDisponibilidade = document.getElementById('custo_disponibilidade').value;
    const pisCofins = document.getElementById('pis_cofins').value;

    // Log values for debugging
    console.log('Demanda (kW):', demanda);
    console.log('Custo Unitário (R$/kWh):', custoUnitario);
    console.log('Custo de Disponibilidade (R$):', custoDisponibilidade);
    console.log('PIS/COFINS (%):', pisCofins);

    // Placeholder for calculation logic
    // const resultado = ...

    // Placeholder for displaying the result
    const resultadoDiv = document.getElementById('resultado');
    if(resultadoDiv){
        resultadoDiv.innerHTML = 'Valores recebidos. Lógica de cálculo a ser implementada.';
    }
}

// Function to send email for the contact form
function sendMail() {
    var params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    const serviceID = "service_p7z0knh";
    const templateID = "template_j2joc2d";

    // Ensure emailjs is loaded before calling it
    if (typeof emailjs !== 'undefined') {
        emailjs.send(serviceID, templateID, params)
            .then(res => {
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
                document.getElementById("message").value = "";
                console.log(res);
                alert("Sua mensagem foi enviada com sucesso!");
            })
            .catch(err => {
                console.log(err);
                alert("Ocorreu um erro ao enviar sua mensagem. Tente novamente.");
            });
    } else {
        console.error("EmailJS SDK not loaded.");
        alert("Não foi possível enviar o email. O serviço de email não está disponível.");
    }
}

// Function to send WhatsApp message
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

    // Número da empresa (substitua pelo número correto com DDD)
    const empresaWhatsApp = '5512997007101'; // Número formatado para link do WhatsApp
    
    // Mensagem formatada para o WhatsApp
    const text = `*Nova mensagem de orçamento*\n\n` +
                 `*Nome:* ${name}\n` +
                 `*WhatsApp:* ${whatsapp}\n` +
                 `*Cidade:* ${city}\n` +
                 `*Serviço:* ${service}\n\n` +
                 `*Mensagem:*\n${message}`;
    
    // Abre o WhatsApp com a mensagem pré-preenchida
    const whatsappUrl = `https://wa.me/${empresaWhatsApp}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
}
