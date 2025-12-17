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

const products = [
    {
        id: 1,
        title: "Baltu valodas",
        description: "Iemācies senās baltu valodas kā latviešu, lietuviešu un prūšu valodu pamatus.",
        image: "About_Baltics_thumb.jpg"
    },
    {
        id: 2,
        title: "Senās valodas",
        description: "Izpēti senās valodas kā latīņu, sengrieķu un citas vēsturiskās valodas.",
        image: "Roman_Empire_map.svg.png"
    },
    {
        id: 3,
        title: "Reģionālās valodas",
        description: "Apgūsti reģionālās valodas no dažādām Eiropas un pasaules daļām.",
        image: "Latgales_vēlēšanu_apgabals.svg.png"
    },
    {
        id: 4,
        title: "Lībiešu valoda",
        description: "Apgūsti lībiešu valodu - vienu no retākajām valodām Baltijā.",
        image: "About_Baltics_thumb.jpg"
    },
    {
        id: 5,
        title: "Gēlu valoda",
        description: "Mācies gēlu valodu - seno ķeltu valodu, ko runā Skotijā.",
        image: "Roman_Empire_map.svg.png"
    },
    {
        id: 6,
        title: "Basku valoda",
        description: "Izpēti un mācies baskvalodu - unikālu valodu bez zināmām radniecīgām valodām.",
        image: "Latgales_vēlēšanu_apgabals.svg.png"
    }
]

const cardsContainer = document.getElementById('cardsContainer')
const searchInput = document.getElementById('searchInput')
const sortAZ = document.getElementById('sortAZ')
const sortZA = document.getElementById('sortZA')

let currentProducts = [...products]

function createCard(product) {
    const card = document.createElement('div')
    card.className = 'card'
    card.dataset.id = product.id
    card.dataset.title = product.title.toLowerCase()
    card.dataset.description = product.description.toLowerCase()
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <button class="card-btn">Uzzināt vairāk</button>
    `
    
    return card
}

function renderCards(productsArray) {
    cardsContainer.innerHTML = ''
    productsArray.forEach(product => {
        const card = createCard(product)
        cardsContainer.appendChild(card)
    })
}

function filterCards() {
    const searchTerm = searchInput.value.toLowerCase().trim()
    const allCards = document.querySelectorAll('.card')
    
    allCards.forEach(card => {
        const title = card.dataset.title
        const description = card.dataset.description
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.classList.remove('hidden')
        } else {
            card.classList.add('hidden')
        }
    })
}

function sortProducts(order) {
    currentProducts.sort((a, b) => {
        if (order === 'az') {
            return a.title.localeCompare(b.title)
        } else {
            return b.title.localeCompare(a.title)
        }
    })
    renderCards(currentProducts)
}

searchInput.addEventListener('input', filterCards)

sortAZ.addEventListener('click', () => {
    sortProducts('az')
})

sortZA.addEventListener('click', () => {
    sortProducts('za')
})

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
    
    renderCards(currentProducts)
})