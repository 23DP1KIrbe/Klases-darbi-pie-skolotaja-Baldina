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