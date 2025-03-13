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
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) { // Hanya untuk link dalam halaman yang sama
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
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

    // Debugging
    console.log('Script loaded on:', window.location.pathname);
});