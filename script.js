document.addEventListener('DOMContentLoaded', function() {
    // O código dentro desta função será executado quando o HTML for completamente carregado.
});

function calcular() {
    console.log("Botão 'Calcular' clicado. A função está sendo chamada.");

    // Aqui vamos adicionar a lógica para pegar os valores dos inputs e fazer os cálculos.
}
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
        });
    }

    // 2. Header Animation on Scroll
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav ul');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
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

    const text = `Olá, me chamo ${name} e gostaria de um orçamento para serviço elétrico em ${city}. Detalhes: ${message}`;
    const whatsappUrl = `https://wa.me/55${whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
}
