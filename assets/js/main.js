document.addEventListener("DOMContentLoaded", () => {
    
    // 1. STATS COUNTER LOGIC
    const counters = document.querySelectorAll('.counter');
    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const updateCount = () => {
                    const inc = Math.max(1, Math.ceil(target / 90)); 
                    count += inc;
                    if (count < target) {
                        counter.innerText = count;
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    };
    const counterObserver = new IntersectionObserver(animateCounters, { threshold: 0.1 });
    counters.forEach(counter => counterObserver.observe(counter));




    // --- NEW SECURITY & FORM LOGIC ---

    // 3. CONTACT OBFUSCATION DECODER
    const obfuscatedData = {
        phone: 'KzkxIDc2MDAxMjM1MDA=', // +91 7600123500
        email: 'aW5mb0Bib29rbXl0cnVja3BhY2tlcnMuY29t', // info@bookmytruckpackers.com
        address: 'bWFydXRpZXN0YXRlIGJlaGluZGUgdG9sbCBuYWthLCBHb2xkZW4gY2hhdWthZGksIGhhbG9sIHJvYWQsIFZhZG9kYXJhIDM5MDAyMiwgR3VqYXJhdCwgSW5kaWE=',
        whatsapp: 'OTE3NjAwMTIzNTAw' // 917600123500
    };

    const decodeContact = (type) => atob(obfuscatedData[type]);

    document.querySelectorAll('.contact-link').forEach(link => {
        const type = link.dataset.contact;
        const decoded = decodeContact(type);
        if(type === 'email') link.href = 'mailto:' + decoded;
        else if(type === 'phone') link.href = 'tel:' + decoded.replace(/\s/g, '');
        else if(type === 'whatsapp') link.href = 'https://wa.me/' + decoded;
        
        const textEl = link.querySelector('.contact-text');
        if(textEl) textEl.innerText = decoded;
    });

    document.querySelectorAll('.contact-text[data-contact="address"]').forEach(el => {
        el.innerText = decodeContact('address');
    });

    // 4. WEB3FORMS AJAX SUBMISSION
    document.querySelectorAll('.web3-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const result = form.querySelector('.form-result');
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            
            submitBtn.innerText = "Submitting...";
            submitBtn.disabled = true;

            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let res = await response.json();
                if (response.status == 200) {
                    result.innerHTML = "Successfully submitted our team will connect you soon";
                    result.style.color = "#10b981"; // green-500
                    form.reset();
                } else {
                    result.innerHTML = res.message;
                    result.style.color = "#ef4444"; // red-500
                }
            })
            .catch(error => {
                result.innerHTML = "Something went wrong!";
                result.style.color = "#ef4444";
            })
            .finally(() => {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                setTimeout(() => {
                    result.innerHTML = "";
                }, 6000);
            });
        });
    });
});

// Other Page Scripts


const bgSlides = document.querySelectorAll('.hero-bg-slide');
if(bgSlides.length > 0) {
    let currentSlide = 0;
    setInterval(() => { bgSlides[currentSlide].classList.remove('active'); currentSlide = (currentSlide + 1) % bgSlides.length; bgSlides[currentSlide].classList.add('active'); }, 3000);
}

const nav = document.getElementById('main-nav');
const navLinks = document.getElementById('nav-links');
const navBtn = document.getElementById('nav-btn');
let navIsManuallyExpanded = false;

window.addEventListener('scroll', () => {
    if(nav && navLinks && navBtn) {
        if (window.scrollY > 50 && !navIsManuallyExpanded) { nav.classList.add('nav-folded'); navLinks.classList.add('nav-hidden-items'); navBtn.classList.add('nav-hidden-items'); } 
        else if (window.scrollY <= 50) { navIsManuallyExpanded = false; nav.classList.remove('nav-folded'); navLinks.classList.remove('nav-hidden-items'); navBtn.classList.remove('nav-hidden-items'); }
    }
});

function toggleNav() {
    if(nav && navLinks && navBtn) {
        if (window.innerWidth < 768) {
            const sideMenu = document.getElementById('mobile-side-menu');
            const overlay = document.getElementById('mobile-overlay');
            if (sideMenu && overlay) {
                if (sideMenu.classList.contains('translate-x-full')) { overlay.classList.remove('hidden'); setTimeout(() => { overlay.classList.remove('opacity-0'); sideMenu.classList.remove('translate-x-full'); }, 10); } 
                else { sideMenu.classList.add('translate-x-full'); overlay.classList.add('opacity-0'); setTimeout(() => { overlay.classList.add('hidden'); }, 300); }
            }
        } else {
            if (nav.classList.contains('nav-folded')) { navIsManuallyExpanded = true; nav.classList.remove('nav-folded'); navLinks.classList.remove('nav-hidden-items'); navBtn.classList.remove('nav-hidden-items'); } 
            else if (window.scrollY > 50) { navIsManuallyExpanded = false; nav.classList.add('nav-folded'); navLinks.classList.add('nav-hidden-items'); navBtn.classList.add('nav-hidden-items'); }
        }
    }
}
