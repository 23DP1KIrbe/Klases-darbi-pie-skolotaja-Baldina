const burgerMenu = document.getElementById('burgerMenu')
const navLinks = document.getElementById('navLinks')
const themeToggle = document.getElementById('themeToggle')

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active')
})

document.addEventListener('click', (event) => {
    if (!event.target.closest('nav')) {
        navLinks.classList.remove('active')
    }
})

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode')
    
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = 'Light Mode'
        localStorage.setItem('theme', 'dark')
    } else {
        themeToggle.textContent = 'Dark Mode'
        localStorage.setItem('theme', 'light')
    }
})

const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode')
    themeToggle.textContent = 'Light Mode'
} else {
    document.body.classList.remove('dark-mode')
    themeToggle.textContent = 'Dark Mode'
}

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm')
    const nameInput = document.getElementById('name')
    const emailInput = document.getElementById('email')
    const messageInput = document.getElementById('message')
    const nameError = document.getElementById('nameError')
    const emailError = document.getElementById('emailError')
    const messageError = document.getElementById('messageError')
    const successMessage = document.getElementById('successMessage')
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }
    
    function showError(input, errorElement, message) {
        errorElement.textContent = message
        errorElement.style.display = 'block'
        input.classList.add('error-highlight')
        
        setTimeout(() => {
            errorElement.style.display = 'none'
            input.classList.remove('error-highlight')
        }, 3000)
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault()
        
        let isValid = true
        
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'Lūdzu, ievadiet savu vārdu')
            isValid = false
        }
        
        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'Lūdzu, ievadiet e-pasta adresi')
            isValid = false
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, emailError, 'Lūdzu, ievadiet derīgu e-pasta adresi')
            isValid = false
        }
        
        if (messageInput.value.trim() === '') {
            showError(messageInput, messageError, 'Lūdzu, ievadiet ziņojumu')
            isValid = false
        }
        
        if (isValid) {
            successMessage.style.display = 'block'
            contactForm.reset()
            
            setTimeout(() => {
                successMessage.style.display = 'none'
            }, 5000)
        }
    })
    
    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim() !== '') {
            nameError.style.display = 'none'
            nameInput.classList.remove('error-highlight')
        }
    })
    
    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim() !== '' && isValidEmail(emailInput.value.trim())) {
            emailError.style.display = 'none'
            emailInput.classList.remove('error-highlight')
        }
    })
    
    messageInput.addEventListener('input', function() {
        if (messageInput.value.trim() !== '') {
            messageError.style.display = 'none'
            messageInput.classList.remove('error-highlight')
        }
    })
})