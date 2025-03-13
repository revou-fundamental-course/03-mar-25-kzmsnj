// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (untuk kedua halaman)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Username welcome handling (hanya di index.html)
    const usernameElement = document.getElementById('username');
    const storedName = sessionStorage.getItem('visitorName');
    
    if (usernameElement) {
        if (storedName) {
            usernameElement.textContent = storedName;
        } else {
            setTimeout(function() {
                const name = prompt('Please enter your name:', '');
                if (name && name.trim() !== '') {
                    usernameElement.textContent = name;
                    sessionStorage.setItem('visitorName', name);
                }
            }, 1000);
        }
    }
    
    // Update current time (hanya di index.html untuk contact form)
    function updateTime() {
        const now = new Date();
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            timeElement.textContent = now.toString();
        }
    }
    
    if (document.getElementById('current-time')) {
        updateTime();
        setInterval(updateTime, 1000);
    }
    
    // Form validation (hanya di index.html)
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let isValid = true;
            
            // Name validation
            const name = document.getElementById('name').value;
            const nameError = document.getElementById('nameError');
            if (!name.trim()) {
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }
            
            // Date validation
            const date = document.getElementById('date').value;
            const dateError = document.getElementById('dateError');
            if (!date) {
                dateError.style.display = 'block';
                isValid = false;
            } else {
                dateError.style.display = 'none';
            }
            
            // Gender validation
            const genderMale = document.getElementById('male');
            const genderFemale = document.getElementById('female');
            const genderError = document.getElementById('genderError');
            if ((!genderMale || !genderMale.checked) && (!genderFemale || !genderFemale.checked)) {
                genderError.style.display = 'block';
                isValid = false;
            } else {
                genderError.style.display = 'none';
            }
            
            // Message validation
            const message = document.getElementById('message').value;
            const messageError = document.getElementById('messageError');
            if (!message.trim()) {
                messageError.style.display = 'block';
                isValid = false;
            } else {
                messageError.style.display = 'none';
            }
            
            // If form is valid, update the info panel
            if (isValid) {
                const infoName = document.getElementById('info-name');
                const infoDate = document.getElementById('info-date');
                const infoGender = document.getElementById('info-gender');
                const infoMessage = document.getElementById('info-message');
                
                if (infoName) infoName.textContent = name;
                
                if (infoDate) {
                    const dateObj = new Date(date);
                    const formattedDate = (dateObj.getMonth() + 1).toString().padStart(2, '0') + '/' +
                                          dateObj.getDate().toString().padStart(2, '0') + '/' +
                                          dateObj.getFullYear();
                    infoDate.textContent = formattedDate;
                }
                
                if (infoGender) {
                    const gender = genderMale && genderMale.checked ? 'Laki - Laki' : 'Perempuan';
                    infoGender.textContent = gender;
                }
                
                if (infoMessage) infoMessage.textContent = message;
                
                contactForm.reset();
                const infoPanel = document.getElementById('submitted-info');
                if (infoPanel) {
                    infoPanel.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    // Quick Links (hanya di index.html)
    const quickLinks = document.querySelectorAll('.quick-link-btn');
    if (quickLinks.length > 0) {
        quickLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                console.log('Quick link clicked:', targetId);
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    console.log('Section not found for ID:', targetId);
                }
            });
        });
    }

    // Smooth scrolling untuk navigasi dalam halaman yang sama (kedua halaman)
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah perilaku default untuk semua tautan
            const href = this.getAttribute('href');
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';

            // Jika tautan dalam halaman yang sama
            if (href.startsWith('#')) {
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    scrollToSection(targetSection);
                }
            } 
            // Jika tautan ke halaman lain
            else {
                const [targetPage, targetSection] = href.split('#');
                // Jika halaman berbeda, tambahkan efek transisi
                if (targetPage && targetPage !== currentPage) {
                    document.body.style.opacity = '0'; // Fade out
                    setTimeout(() => {
                        window.location.href = href; // Pindah ke halaman baru
                    }, 300); // Sesuaikan dengan durasi transisi CSS
                } else if (targetSection) {
                    // Jika halaman sama tapi ada section
                    const section = document.querySelector(`#${targetSection}`);
                    if (section) {
                        scrollToSection(section);
                    }
                }
            }
        });
    });

    function scrollToSection(section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Fade-in saat halaman dimuat
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
        
        // Jika ada hash di URL, scroll ke section yang sesuai
        const hash = window.location.hash;
        if (hash) {
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                setTimeout(() => scrollToSection(targetSection), 100); // Delay kecil untuk memastikan halaman siap
            }
        }
    });

    // Slider Functionality (hanya di index.html)
    const slider = document.querySelector('.slider');
    if (slider) {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const dotsContainer = document.querySelector('.slider-dots');
        let currentSlide = 1;
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID = 0;
        let autoSlideInterval;

        const firstSlideClone = slides[0].cloneNode(true);
        const lastSlideClone = slides[slides.length - 1].cloneNode(true);
        slider.appendChild(firstSlideClone);
        slider.insertBefore(lastSlideClone, slides[0]);

        const allSlides = document.querySelectorAll('.slide');
        slider.style.transform = `translateX(${-currentSlide * 100}%)`;

        function createDots() {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < slides.length; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    stopAutoSlide();
                    currentSlide = i + 1;
                    setSliderPosition(true);
                    updateDots();
                    startAutoSlide();
                });
                dotsContainer.appendChild(dot);
            }
        }

        function setSliderPosition(withTransition = true) {
            if (withTransition) {
                slider.style.transition = 'transform 0.5s ease-in-out';
            } else {
                slider.style.transition = 'none';
            }
            slider.style.transform = `translateX(${-currentSlide * 100}%)`;
            prevTranslate = -currentSlide * slider.clientWidth;
        }

        function updateDots() {
            const actualIndex = (currentSlide - 1 + slides.length) % slides.length;
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === actualIndex);
            });
        }

        function nextSlide() {
            currentSlide++;
            setSliderPosition();
            if (currentSlide === allSlides.length - 1) {
                setTimeout(() => {
                    currentSlide = 1;
                    setSliderPosition(false);
                }, 500);
            }
            updateDots();
        }

        function prevSlide() {
            currentSlide--;
            setSliderPosition();
            if (currentSlide === 0) {
                setTimeout(() => {
                    currentSlide = slides.length;
                    setSliderPosition(false);
                }, 500);
            }
            updateDots();
        }

        function startAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });

            prevBtn.addEventListener('click', () => {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });
        }

        function startDragging(e) {
            isDragging = true;
            startPos = getPositionX(e);
            currentTranslate = prevTranslate;
            stopAutoSlide();
            animationID = requestAnimationFrame(animation);
            slider.style.transition = 'none';
            e.preventDefault();
        }

        function drag(e) {
            if (isDragging) {
                const currentPosition = getPositionX(e);
                const moveDistance = currentPosition - startPos;
                currentTranslate = prevTranslate + moveDistance;
                slider.style.transform = `translateX(${currentTranslate}px)`;
                e.preventDefault();
            }
        }

        function stopDragging() {
            if (isDragging) {
                isDragging = false;
                cancelAnimationFrame(animationID);
                const movedBy = currentTranslate - prevTranslate;
                const slideWidth = slider.clientWidth;

                if (movedBy < -slideWidth / 3 && currentSlide < allSlides.length - 1) {
                    currentSlide++;
                } else if (movedBy > slideWidth / 3 && currentSlide > 0) {
                    currentSlide--;
                }

                if (currentSlide === allSlides.length - 1) {
                    setTimeout(() => {
                        currentSlide = 1;
                        setSliderPosition(false);
                    }, 500);
                } else if (currentSlide === 0) {
                    setTimeout(() => {
                        currentSlide = slides.length;
                        setSliderPosition(false);
                    }, 500);
                }

                setSliderPosition(true);
                updateDots();
                startAutoSlide();
            }
        }

        function getPositionX(e) {
            return e.type.includes('touch') ? e.touches[0].clientX : e.pageX;
        }

        function animation() {
            if (isDragging) {
                slider.style.transform = `translateX(${currentTranslate}px)`;
                requestAnimationFrame(animation);
            }
        }

        slider.addEventListener('mousedown', startDragging);
        slider.addEventListener('touchstart', startDragging, { passive: false });
        slider.addEventListener('mouseup', stopDragging);
        slider.addEventListener('touchend', stopDragging);
        slider.addEventListener('mousemove', drag);
        slider.addEventListener('touchmove', drag, { passive: false });
        slider.addEventListener('mouseleave', stopDragging);
        slider.addEventListener('touchcancel', stopDragging);

        createDots();
        setSliderPosition();
        startAutoSlide();

        slider.addEventListener('transitionend', () => {
            if (currentSlide === 0) {
                currentSlide = slides.length;
                setSliderPosition(false);
                updateDots();
            } else if (currentSlide === allSlides.length - 1) {
                currentSlide = 1;
                setSliderPosition(false);
                updateDots();
            }
        });
    }

    const welcomeHeading = document.querySelector('.welcome h1');
    const welcomeParagraph = document.querySelector('.welcome p');
    
    if (welcomeHeading && welcomeParagraph) {
        // Character-by-character animation for the heading
        animateText(welcomeHeading);
        
        // Add interaction for username
        const usernameElement = document.getElementById('username');
        if (usernameElement) {
            usernameElement.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.1)';
                this.style.textShadow = '0 0 15px rgba(0, 196, 204, 0.8)';
            });
            
            usernameElement.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1)';
                this.style.textShadow = '';
            });
        }
        
        // Add scroll-triggered animations
        document.addEventListener('scroll', function() {
            const welcomeSection = document.querySelector('.welcome');
            if (!welcomeSection) return;
            
            const sectionPosition = welcomeSection.getBoundingClientRect();
            const screenPosition = window.innerHeight;
            
            if (sectionPosition.top < screenPosition && sectionPosition.bottom > 0) {
                // Apply additional animations when welcome section is in view
                welcomeHeading.classList.add('in-view');
                welcomeParagraph.classList.add('in-view');
            }
        });
    }
    
    // Character-by-character animation function
    function animateText(element) {
        if (!element) return;
        
        // Skip if already animated
        if (element.classList.contains('text-animated')) return;
        
        const text = element.textContent;
        let htmlContent = '';
        
        // Handle username span specially
        if (element.innerHTML.includes('span id="username"')) {
            // Preserve the span for username
            const parts = element.innerHTML.split(/<span id="username">(.*?)<\/span>/);
            
            // Animate the text before and after the span
            htmlContent = animateTextPart(parts[0]) + 
                          '<span id="username">' + (parts[1] || '(Ur Name)') + '</span>' + 
                          (parts[2] ? animateTextPart(parts[2]) : '');
        } else {
            htmlContent = animateTextPart(text);
        }
        
        element.innerHTML = htmlContent;
        element.classList.add('text-animated');
        
        // Animate each character
        const chars = element.querySelectorAll('.char-animate');
        chars.forEach((char, index) => {
            setTimeout(() => {
                char.classList.add('char-visible');
            }, 50 * index);
        });
    }
    
    function animateTextPart(text) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            if (text[i] === ' ') {
                result += ' ';
            } else {
                result += `<span class="char-animate">${text[i]}</span>`;
            }
        }
        return result;
    }
    
    // Add interactive animations
    document.addEventListener('mousemove', function(e) {
        const welcomeSection = document.querySelector('.welcome');
        if (!welcomeSection) return;
        
        const bounds = welcomeSection.getBoundingClientRect();
        if (e.clientX >= bounds.left && e.clientX <= bounds.right && 
            e.clientY >= bounds.top && e.clientY <= bounds.bottom) {
            
            // Calculate mouse position relative to section center
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;
            const posX = e.clientX - bounds.left - centerX;
            const posY = e.clientY - bounds.top - centerY;
            
            // Apply subtle parallax effect
            const welcomeHeading = document.querySelector('.welcome h1');
            const welcomeParagraph = document.querySelector('.welcome p');
            
            if (welcomeHeading) {
                welcomeHeading.style.transform = `translateX(${posX / 50}px) translateY(${posY / 50}px)`;
            }
            
            if (welcomeParagraph) {
                welcomeParagraph.style.transform = `translateX(${posX / 80}px) translateY(${posY / 80}px)`;
            }
        }
    });

    // Debugging
    console.log('Script loaded on:', window.location.pathname);
});