// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Username welcome handling
    const usernameElement = document.getElementById('username');
    
    // Check if there's a stored name in sessionStorage
    const storedName = sessionStorage.getItem('visitorName');
    
    if (usernameElement) {
        if (storedName) {
            usernameElement.textContent = storedName;
        } else {
            // If no stored name, prompt for it
            setTimeout(function() {
                const name = prompt('Please enter your name:', '');
                if (name && name.trim() !== '') {
                    usernameElement.textContent = name;
                    sessionStorage.setItem('visitorName', name);
                }
            }, 1000);
        }
    }
    
    // Update current time
    function updateTime() {
        const now = new Date();
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            timeElement.textContent = now.toString();
        }
    }
    
    updateTime();
    setInterval(updateTime, 1000);
    
    // Form validation
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
                
                // Format the date to MM/DD/YYYY
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
                
                // Reset the form
                contactForm.reset();
                
                // Scroll to the info panel
                const infoPanel = document.getElementById('submitted-info');
                if (infoPanel) {
                    infoPanel.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    // Slider Functionality
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 1; // Mulai dari 1 karena kita akan klon slide
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let autoSlideInterval;

    // Infinite Loop: Clone first and last slides
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[slides.length - 1].cloneNode(true);
    slider.appendChild(firstSlideClone);
    slider.insertBefore(lastSlideClone, slides[0]);

    const allSlides = document.querySelectorAll('.slide'); // Update slides after cloning
    slider.style.transform = `translateX(${-currentSlide * 100}%)`; // Set posisi awal

    // Create Dots
    function createDots() {
        dotsContainer.innerHTML = ''; // Clear existing dots
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                stopAutoSlide();
                currentSlide = i + 1; // Sesuaikan dengan indeks slide (1-based karena klon)
                setSliderPosition(true);
                updateDots();
                startAutoSlide();
            });
            dotsContainer.appendChild(dot);
        }
    }

    // Fungsi untuk mengatur posisi slide
    function setSliderPosition(withTransition = true) {
        if (withTransition) {
            slider.style.transition = 'transform 0.5s ease-in-out';
        } else {
            slider.style.transition = 'none';
        }
        slider.style.transform = `translateX(${-currentSlide * 100}%)`;
        prevTranslate = -currentSlide * slider.clientWidth; // Update prevTranslate berdasarkan lebar slider
    }

    // Fungsi untuk memperbarui indikator dots
    function updateDots() {
        const actualIndex = (currentSlide - 1 + slides.length) % slides.length;
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === actualIndex);
        });
    }

    // Fungsi untuk pergi ke slide berikutnya
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

    // Fungsi untuk pergi ke slide sebelumnya
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

    // Fungsi untuk memulai slide otomatis
    function startAutoSlide() {
        clearInterval(autoSlideInterval); // Clear interval sebelum membuat baru
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    // Fungsi untuk menghentikan slide otomatis
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Tombol navigasi
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

    // Swipe/Drag Functionality
    function startDragging(e) {
        isDragging = true;
        startPos = getPositionX(e);
        currentTranslate = prevTranslate;
        stopAutoSlide();
        animationID = requestAnimationFrame(animation);
        slider.style.transition = 'none';
        e.preventDefault(); // Mencegah scrolling default
    }

    function drag(e) {
        if (isDragging) {
            const currentPosition = getPositionX(e);
            const moveDistance = currentPosition - startPos;
            currentTranslate = prevTranslate + moveDistance;
            slider.style.transform = `translateX(${currentTranslate}px)`;
            e.preventDefault(); // Mencegah scrolling default
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

    // Event listener untuk touch dan mouse
    slider.addEventListener('mousedown', startDragging);
    slider.addEventListener('touchstart', startDragging, { passive: false });
    slider.addEventListener('mouseup', stopDragging);
    slider.addEventListener('touchend', stopDragging);
    slider.addEventListener('mousemove', drag);
    slider.addEventListener('touchmove', drag, { passive: false });
    slider.addEventListener('mouseleave', stopDragging);
    slider.addEventListener('touchcancel', stopDragging);

    // Inisialisasi slider
    createDots();
    setSliderPosition();
    startAutoSlide();

    // Listener untuk transisi slider
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
});