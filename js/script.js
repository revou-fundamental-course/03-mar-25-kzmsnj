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
        // Jika sudah ada nama di sessionStorage, langsung tampilkan
        if (storedName) {
            console.log('Nama dari sessionStorage:', storedName);
            usernameElement.textContent = storedName;
        } 
        // Jika belum ada, minta input dan tampilkan langsung
        else {
            const name = prompt('Please enter your name:', '');
            console.log('Nama yang dimasukkan:', name);
            if (name && name.trim() !== '') {
                // Langsung ubah teks di elemen username
                usernameElement.textContent = name;
                // Simpan ke sessionStorage
                sessionStorage.setItem('visitorName', name);
            } else {
                // Jika input kosong atau dibatalkan, gunakan default
                usernameElement.textContent = '(Ur Name)';
            }
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
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const currentScroll = window.scrollY;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;
                    const direction = targetPosition < currentScroll ? 'up' : 'down';

                    scrollToSection(targetSection);
                    animateSection(targetSection, direction);
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
            e.preventDefault();
            const href = this.getAttribute('href');
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';

            if (href.startsWith('#')) {
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const currentScroll = window.scrollY;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;
                    const direction = targetPosition < currentScroll ? 'up' : 'down';

                    scrollToSection(targetSection);
                    animateSection(targetSection, direction);
                } else if (href === '#welcome' && currentPage === 'index.html') {
                    scrollToTop();
                    const welcomeSection = document.querySelector('#welcome');
                    if (welcomeSection) animateSection(welcomeSection, 'up');
                } else if (href === '#profile-banner' && currentPage === 'profile.html') {
                    scrollToTop();
                    const profileBanner = document.querySelector('#profile-banner');
                    if (profileBanner) animateSection(profileBanner, 'up');
                }
            } else {
                const [targetPage, targetSection] = href.split('#');
                if (targetPage && targetPage !== currentPage) {
                    // Buat overlay transisi
                    const transitionOverlay = document.createElement('div');
                    transitionOverlay.classList.add('page-transition-overlay');
                    document.body.appendChild(transitionOverlay);

                    // Tentukan arah animasi
                    const isToProfile = targetPage === 'profile.html';
                    const directionClass = isToProfile ? 'slide-to-left' : 'slide-to-right';

                    // Tambahkan kelas untuk memulai animasi keluar
                    document.body.classList.add('page-exit', directionClass);

                    // Pastikan overlay muncul sebelum halaman baru dimuat
                    setTimeout(() => {
                        transitionOverlay.classList.add('active');
                    }, 10); // Delay kecil untuk sinkronisasi

                    // Tunggu animasi keluar selesai sebelum pindah halaman
                    setTimeout(() => {
                        window.location.href = href;
                    }, 500); // Durasi animasi keluar

                    // Jangan hapus overlay di sini, biarkan halaman baru yang menanganinya
                } else if (targetSection) {
                    const section = document.querySelector(`#${targetSection}`);
                    if (section) {
                        const currentScroll = window.scrollY;
                        const targetPosition = section.getBoundingClientRect().top + window.scrollY;
                        const direction = targetPosition < currentScroll ? 'up' : 'down';

                        scrollToSection(section);
                        animateSection(section, direction);
                    }
                }
            }

            lastScrollPosition = window.scrollY; // Perbarui posisi terakhir setelah klik
        });
    });

    function scrollToSection(section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    function animateSection(section, direction) {
        document.querySelectorAll('section, .profile-banner').forEach(sec => {
            sec.classList.remove('slide-in-up', 'slide-in-down');
        });
        const animationClass = direction === 'up' ? 'slide-in-up' : 'slide-in-down';
        section.classList.add(animationClass);
        setTimeout(() => {
            section.classList.remove(animationClass);
        }, 800);
    }

    // Fade-in dan animasi masuk saat halaman dimuat
    window.addEventListener('load', () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const referrer = document.referrer;
        const fromProfile = referrer.includes('profile.html');
        const fromIndex = referrer.includes('index.html');

        // Hapus overlay dari halaman sebelumnya jika ada
        const existingOverlay = document.querySelector('.page-transition-overlay');
        if (existingOverlay) {
            existingOverlay.classList.remove('active');
            setTimeout(() => {
                if (document.body.contains(existingOverlay)) {
                    document.body.removeChild(existingOverlay);
                }
            }, 500); // Sinkronkan dengan durasi animasi masuk
        }

        let enterClass = 'slide-in-from-right';
        if (currentPage === 'index.html' && fromProfile) {
            enterClass = 'slide-in-from-left';
        } else if (currentPage === 'profile.html' && fromIndex) {
            enterClass = 'slide-in-from-right';
        }

        document.body.classList.add('page-enter', enterClass);
        setTimeout(() => {
            document.body.classList.remove('page-enter', enterClass);
        }, 500); // Durasi animasi masuk

        const hash = window.location.hash;
        if (hash) {
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                setTimeout(() => {
                    scrollToSection(targetSection);
                    animateSection(targetSection, 'down');
                }, 100);
            }
        }
    });

    // Tambahkan event listener untuk resize
    window.addEventListener('resize', () => {
        if (slider) {
            setSliderPosition(false); // Perbarui posisi tanpa animasi saat resize
            // Pastikan slide memiliki tinggi yang sesuai
            const slides = document.querySelectorAll('.slide');
            slides.forEach(slide => {
                slide.style.height = `${slider.clientHeight}px`;
            });
        }
    })

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
        slider.style.transition = withTransition 
            ? 'transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)' 
            : 'none';
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
            }, 600);
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
            }, 600);
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

    document.addEventListener('DOMContentLoaded', () => {
        if (slider) {
            const slides = document.querySelectorAll('.slide');
            slides.forEach(slide => {
                slide.style.height = `${slider.clientHeight}px`;
            });
        }
    });

    // Debugging
    console.log('Script loaded on:', window.location.pathname);
});