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
                const name = prompt('Please enter your name:', 'Harfi');
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
});