// ============= FUNCIONES PARA VALIDACIÓN DE TELÉFONO CON LIBPHONENUMBER-JS =============

/**
 * Valida un número de teléfono internacional
 * @param {string} phoneNumber - Número de teléfono a validar
 * @param {string} countryCode - Código de país (ej: 'CL' para Chile)
 * @returns {object} { isValid: boolean, formatted: string, error: string }
 */
function validatePhoneNumber(phoneNumber, countryCode = 'CL') {
    try {
        // Limpiar espacios en blanco
        const cleanNumber = phoneNumber.trim();
        
        if (!cleanNumber) {
            return { isValid: false, formatted: '', error: 'Por favor ingresa un número de teléfono' };
        }
        
        // Usar libphonenumber-js
        const parsed = libphonenumber.parse(cleanNumber, countryCode);
        const isValid = libphonenumber.isValidNumber(parsed);
        
        if (!isValid) {
            return { 
                isValid: false, 
                formatted: '', 
                error: `Número de teléfono inválido para ${countryCode}` 
            };
        }
        
        // Formatear en formato internacional
        const formatted = libphonenumber.format(parsed, 'INTERNATIONAL');
        const countryName = getCountryName(parsed.country);
        
        return { 
            isValid: true, 
            formatted: formatted,
            country: parsed.country,
            countryName: countryName,
            error: null 
        };
    } catch (error) {
        return { 
            isValid: false, 
            formatted: '', 
            error: 'Número de teléfono inválido. Verifica el formato.' 
        };
    }
}

/**
 * Obtiene el nombre del país a partir del código
 */
function getCountryName(countryCode) {
    const countryNames = {
        'CL': 'Chile',
        'AR': 'Argentina',
        'PE': 'Perú',
        'CO': 'Colombia',
        'BO': 'Bolivia',
        'UY': 'Uruguay',
        'PY': 'Paraguay',
        'BR': 'Brasil',
        'ES': 'España',
        'MX': 'México',
        'US': 'Estados Unidos',
    };
    return countryNames[countryCode] || countryCode;
}

/**
 * Crea un elemento de error para mostrar en el formulario
 */
function showPhoneError(inputElement, errorMessage) {
    // Remover error anterior si existe
    clearPhoneError(inputElement);
    
    // Agregar clase de error al input
    inputElement.classList.add('input-error');
    
    // Crear y mostrar mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'phone-error';
    errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.85rem; margin-top: 4px; margin-bottom: 4px; font-weight: 500;';
    errorDiv.textContent = errorMessage;
    // Insertar justo después del input, no al final del formulario
    inputElement.insertAdjacentElement('afterend', errorDiv);
}

/**
 * Remueve los errores del teléfono
 */
function clearPhoneError(inputElement) {
    inputElement.classList.remove('input-error');
    // Buscar el error justo después del input
    const nextEl = inputElement.nextElementSibling;
    if (nextEl && nextEl.classList.contains('phone-error')) {
        nextEl.remove();
    }
}

// ========================================

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animar icono de hamburguesa
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Dropdown para móvil
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    link.addEventListener('click', (e) => {
        // En móvil, prevenir navegación y mostrar/ocultar dropdown
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// cerrar menu al hacer click en un enlace
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // No cerrar si es un dropdown en móvil
        const isMobileDropdown = link.closest('.dropdown') && window.innerWidth <= 768;
        
        if (!isMobileDropdown) {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
            // Cerrar todos los dropdowns
            dropdowns.forEach(d => d.classList.remove('active'));
        }
    });
});

// cerrar menu al hacer click en el botón de conversemos (móvil)
const navBtnMobile = document.querySelector('.nav-btn-mobile a');
if (navBtnMobile) {
    navBtnMobile.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// scrool suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// estilos de navbar al hacer scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Generar ID único para cada conversión
function generateConversionId() {
    return 'CONV-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Función para mostrar thank you page
function showThankYouPage(data) {
    const footerForm = document.querySelector('.footer-form');
    if (footerForm) {
        footerForm.innerHTML = `
            <div style="text-align: center; padding: 50px 0;">
                <div style="background: rgba(43, 68, 58, 0.1); border: 2px solid #2b443a; border-radius: 15px; padding: 50px; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2b443a; margin-bottom: 20px; font-size: 2.5rem;">¡Gracias por tu interés!</h2>
                    <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                        Hemos recibido tu solicitud correctamente. Nuestro equipo se contactará contigo pronto para brindarte más información sobre Mirador Villarica.
                    </p>
                    <p style="color: #999; font-size: 14px; margin-bottom: 20px;">
                        <strong>Datos recibidos:</strong><br>
                        Nombre: ${data.nombre}<br>
                        Email: ${data.email}<br>
                        Teléfono: ${data.telefono}
                    </p>
                    <button onclick="window.history.pushState({}, '', window.location.pathname); location.reload();" style="background: #efb550; color: #2b443a; padding: 12px 30px; border: none; border-radius: 34px; font-weight: 600; cursor: pointer; display: inline-block;">Volver al sitio</button>
                </div>
            </div>
        `;
    }
}

// Detectar si hay parámetros de éxito en la URL al cargar
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('ref')) {
        const nombre = urlParams.get('nombre') || '';
        const email = urlParams.get('email') || '';
        const telefono = urlParams.get('telefono') || '';
        
        const data = { nombre, email, telefono };
        showThankYouPage(data);
    }
});

// Manejador de envío de formulario
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const telefonoInput = contactForm.querySelector('input[name="telefono"]');
        const telefonoValue = formData.get('telefono');
        
        // VALIDAR NÚMERO DE TELÉFONO
        const phoneValidation = validatePhoneNumber(telefonoValue, 'CL');
        
        if (!phoneValidation.isValid) {
            showPhoneError(telefonoInput, phoneValidation.error);
            return; // No enviar el formulario
        } else {
            clearPhoneError(telefonoInput);
        }

        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: phoneValidation.formatted, // Usar número formateado
            telefonoRaw: telefonoValue,
            pais: phoneValidation.country,
            cuandoComprar: formData.get('cuando-comprar'),
            mensaje: formData.get('mensaje')
        };
        
        const conversionId = generateConversionId();
        
        // Desabilitar botón de envío
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        // PARA PRUEBAS: Simular respuesta exitosa (cambiar a false cuando el webhook esté configurado)
        const isTestMode = false;
        
        if (isTestMode) {
            // Simular respuesta exitosa
            
            // Evento para Google Analytics CON ID DE CONVERSIÓN
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'conversion_id': conversionId,
                    'email': data.email,
                    'proyecto': 'Mirador Villarica'
                });
            }
            
            // Mostrar thank you page
            showThankYouPage(data);
            
            // Cambiar URL sin redirigir
            const params = new URLSearchParams({
                ref: conversionId,
                nombre: data.nombre,
                email: data.email,
                telefono: data.telefono
            });
            
            window.history.pushState({ ref: conversionId, data: data }, '', '?' + params.toString() + '#footer');
            
        } else {
            // Enviar datos al webhook.
            const webhookUrl = 'https://auto.portalterreno.com/webhook/659599be-faca-452d-b087-fdd0d5964658';
            
            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    
                    // Evento para Google Analytics
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'form_submission', {
                            'conversion_id': conversionId,
                            'email': data.email,
                            'proyecto': 'Mirador Villarica'
                        });
                    }
                    
                    // Mostrar thank you page
                    showThankYouPage(data);
                    
                    // Cambiar URL
                    const params = new URLSearchParams({
                        ref: conversionId,
                        nombre: data.nombre,
                        email: data.email,
                        telefono: data.telefono
                    });
                    
                    window.history.pushState({ ref: conversionId, data: data }, '', '?' + params.toString() + '#footer');
                } else {
                    if (submitBtn) submitBtn.disabled = false;
                    alert('Hubo un error al enviar tu mensaje. Por favor intenta nuevamente.');
                }
            })
            .catch(error => {
                if (submitBtn) submitBtn.disabled = false;
                alert('Hubo un error al enviar tu mensaje. Por favor intenta nuevamente.');
            });
        }
    });
}

// Animaciones al hacer scroll usando Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.classList.remove('will-animate');
        }
    });
}, observerOptions);

// Seleccionar elementos a animar
const animatedElements = document.querySelectorAll('.animate-on-scroll, .gallery-item, .place-card, .feature-item');

// Aplicar clase initial will-animate para ocultar inicialmente y observar
animatedElements.forEach(el => {
    if (!el.classList.contains('active')) {
        el.classList.add('will-animate');
    }
    observer.observe(el);
});

// Lightbox para galería
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');
const galleryItems = document.querySelectorAll('.gallery-item img');

let currentImageIndex = 0;

// Abrir lightbox al hacer clic en imagen
galleryItems.forEach((img, index) => {
    img.addEventListener('click', () => {
        openLightbox(index);
    });
});

function openLightbox(index) {
    currentImageIndex = index;
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
    updateLightboxImage();
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function updateLightboxImage() {
    const img = galleryItems[currentImageIndex];
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.alt;
}

function showNext() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    updateLightboxImage();
}

function showPrev() {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxImage();
}

// Event listeners
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Cerrar al hacer clic fuera de la imagen
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    }
});

// WhatsApp Modal
function abrirWhatsAppModal() {
    const modal = document.getElementById('whatsapp-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

function cerrarWhatsAppModal() {
    const modal = document.getElementById('whatsapp-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Configurar WhatsApp después de que el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupWhatsApp);
} else {
    setupWhatsApp();
}

function setupWhatsApp() {
    
    // Evento click para el botón flotante
    const whatsappFloat = document.getElementById('whatsapp-float');
    
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            abrirWhatsAppModal();
        });
    }

    // Cerrar modal al hacer click en X
    const whatsappClose = document.querySelector('.whatsapp-close');
    if (whatsappClose) {
        whatsappClose.addEventListener('click', cerrarWhatsAppModal);
    }

    // Cerrar modal al hacer click fuera
    const whatsappModal = document.getElementById('whatsapp-modal');
    if (whatsappModal) {
        window.addEventListener('click', function(e) {
            if (e.target === whatsappModal) {
                cerrarWhatsAppModal();
            }
        });
    }

    // Enviar formulario WhatsApp
    const whatsappForm = document.getElementById('whatsapp-form');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('ws-nombre').value;
            const email = document.getElementById('ws-email').value;
            const telefonoInput = document.getElementById('ws-phone');
            const telefono = telefonoInput.value;
            const cuandoComprar = document.getElementById('ws-cuando-comprar').value;
            const mensaje = document.getElementById('ws-mensaje').value;
            
            // VALIDAR NÚMERO DE TELÉFONO CON LIBPHONENUMBER-JS
            const phoneValidation = validatePhoneNumber(telefono, 'CL');
            
            if (!phoneValidation.isValid) {
                showPhoneError(telefonoInput, phoneValidation.error);
                return; // No enviar el formulario
            } else {
                clearPhoneError(telefonoInput);
            }
            
            const telefonoFormateado = phoneValidation.formatted;
            
            const numeroWhatsApp = '56940329987';
            const textoMensaje = `¡Hola Diego! Visité la página de *Mirador de Villarrica* y me interesa el proyecto _www.miradordevillarrica.cl_\n\n*Mis datos:*\nNombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefonoFormateado}\n¿Cuándo comprar?: ${cuandoComprar}\nMensaje: ${mensaje}\n\n¿Me podrías dar más info?`;
            
            const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoMensaje)}`;
            
            // Webhook de n8n para capturar lead
            const webhookN8N = 'https://auto.portalterreno.com/webhook/659599be-faca-452d-b087-fdd0d5964658';
            
            // Enviar datos al webhook
            fetch(webhookN8N, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre,
                    email,
                    telefono: telefonoFormateado,
                    telefonoRaw: telefono,
                    pais: phoneValidation.country,
                    cuandoComprar,
                    mensaje,
                    timestamp: new Date().toISOString(),
                    origen: 'Formulario WhatsApp'
                })
            }).catch(() => {});
            
            // Abrir WhatsApp
            window.open(enlaceWhatsApp, '_blank');
            
            // Mostrar mensaje de éxito al cliente
            const formContainer = document.querySelector('.whatsapp-modal-content');
            if (formContainer) {
                formContainer.innerHTML = `
                    <div style="text-align: center; padding: 30px 0;">
                        <h2 style="color: #25D366; margin-bottom: 15px; font-size: 24px;">¡Gracias por contactarnos! ✓</h2>
                        <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
                            Tu mensaje ha sido enviado correctamente.<br>
                            Nos comunicaremos contigo pronto.
                        </p>
                        <button onclick="location.reload()" style="background: #25D366; color: white; border: none; padding: 12px 30px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; margin-top: 20px;">
                            Cerrar
                        </button>
                    </div>
                `;
            }
            
            // Limpiar formulario después de 2 segundos
            setTimeout(() => {
                whatsappForm.reset();
                cerrarWhatsAppModal();
            }, 2000);
        });
    } else {
        console.log('✗ Formulario WhatsApp no encontrado');
    }
}

// funcionalidad masterplan
document.addEventListener('DOMContentLoaded', function() {
    const masterplanImage = document.getElementById('masterplanImage');
    const masterplanModal = document.getElementById('masterplanModal');
    const masterplanModalClose = document.querySelector('.masterplan-modal-close');

    if (masterplanImage) {
        masterplanImage.addEventListener('click', () => {
            if (masterplanModal) {
                masterplanModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    if (masterplanModalClose) {
        masterplanModalClose.addEventListener('click', () => {
            if (masterplanModal) {
                masterplanModal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Cerrar modal al hacer click fuera de la imagen
    if (masterplanModal) {
        masterplanModal.addEventListener('click', (e) => {
            if (e.target === masterplanModal) {
                masterplanModal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && masterplanModal && masterplanModal.classList.contains('show')) {
            masterplanModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
});


