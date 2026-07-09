import './style.css'

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar')
const navToggle = document.getElementById('navToggle')
const navMenu = document.getElementById('navMenu')
const navLinks = document.querySelectorAll('.nav-link')

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
})

// ===== Mobile menu toggle =====
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active')
  navToggle.classList.toggle('active')
})

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active')
    navToggle.classList.remove('active')
  })
})

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id]')

function updateActiveLink() {
  const scrollY = window.scrollY + 100
  sections.forEach(section => {
    const top = section.offsetTop
    const height = section.offsetHeight
    const id = section.getAttribute('id')
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active')
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active')
        }
      })
    }
  })
}
window.addEventListener('scroll', updateActiveLink)

// ===== Typing animation =====
const roles = ['Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Lifelong Learner']
const typedText = document.getElementById('typedText')
let roleIndex = 0
let charIndex = 0
let isDeleting = false

function typeRole() {
  const current = roles[roleIndex]
  if (isDeleting) {
    typedText.textContent = current.substring(0, charIndex--)
    if (charIndex < 0) {
      isDeleting = false
      roleIndex = (roleIndex + 1) % roles.length
      charIndex = 0
      setTimeout(typeRole, 400)
      return
    }
    setTimeout(typeRole, 40)
  } else {
    typedText.textContent = current.substring(0, charIndex++)
    if (charIndex > current.length) {
      isDeleting = true
      setTimeout(typeRole, 1800)
      return
    }
    setTimeout(typeRole, 80)
  }
}
typeRole()

// ===== Scroll reveal animations =====
const revealElements = document.querySelectorAll('.reveal')
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible')
        }, i * 80)
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
)
revealElements.forEach(el => revealObserver.observe(el))

// ===== Skill bar animation =====
const skillFills = document.querySelectorAll('.skill-fill')
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target
        fill.style.width = fill.dataset.width
        skillObserver.unobserve(fill)
      }
    })
  },
  { threshold: 0.3 }
)
skillFills.forEach(fill => skillObserver.observe(fill))

// ===== Counter animation =====
const counters = document.querySelectorAll('[data-count]')
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target
        const target = parseInt(el.dataset.count, 10)
        let current = 0
        const step = Math.max(1, Math.ceil(target / 40))
        const interval = setInterval(() => {
          current += step
          if (current >= target) {
            current = target
            clearInterval(interval)
          }
          el.textContent = current + (target >= 10 ? '+' : '')
        }, 30)
        counterObserver.unobserve(el)
      }
    })
  },
  { threshold: 0.5 }
)
counters.forEach(c => counterObserver.observe(c))

// ===== Contact form validation =====
const form = document.getElementById('contactForm')
const formSuccess = document.getElementById('formSuccess')

function showError(field, message) {
  const input = document.getElementById(field)
  const errorEl = document.querySelector(`.form-error[data-for="${field}"]`)
  input.classList.add('invalid')
  if (errorEl) errorEl.textContent = message
}

function clearError(field) {
  const input = document.getElementById(field)
  const errorEl = document.querySelector(`.form-error[data-for="${field}"]`)
  input.classList.remove('invalid')
  if (errorEl) errorEl.textContent = ''
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const fields = ['name', 'email', 'subject', 'message']
  let valid = true

  fields.forEach(f => {
    const val = document.getElementById(f).value.trim()
    if (!val) {
      showError(f, 'This field is required')
      valid = false
    } else {
      clearError(f)
    }
  })

  const email = document.getElementById('email').value.trim()
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('email', 'Please enter a valid email address')
    valid = false
  }

  if (!valid) return

  const btn = form.querySelector('button[type="submit"]')
  btn.classList.add('loading')
  btn.disabled = true

  setTimeout(() => {
    btn.classList.remove('loading')
    btn.disabled = false
    form.reset()
    formSuccess.classList.add('show')
    setTimeout(() => formSuccess.classList.remove('show'), 4000)
  }, 1200)
})

// Clear errors on input
form.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('input', () => clearError(input.id))
})

// ===== Resume download (generates a simple text resume) =====
function downloadResume(e) {
  e.preventDefault()
  const content = `MAHESH KANASE
Full Stack Developer
Pune, Maharashtra, India
Email: mahesh.kanase@example.com | Phone: +91 98765 43210

SUMMARY
Passionate Full Stack Developer with 3+ years of experience building
scalable web applications using React, Node.js, and modern technologies.

EXPERIENCE
- Senior Full Stack Developer | Tech Solutions Inc. (2023 - Present)
- Full Stack Developer | Digital Innovations Ltd. (2021 - 2023)
- Frontend Developer | WebCraft Studio (2020 - 2021)
- Software Developer Intern | StartUp Hub (2019 - 2020)

EDUCATION
- Bachelor of Computer Science | Savitribai Phule Pune University (2018-2021)
- Full Stack Development Bootcamp (2021)

SKILLS
JavaScript, React, Node.js, Python, Express, MongoDB, PostgreSQL,
Git, Docker, HTML/CSS, REST APIs

CERTIFICATIONS
- AWS Certified Developer (2023)
- Meta Front-End Developer (2022)
- MongoDB Developer (2022)
- Google UX Design (2021)
`
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'Mahesh_Kanase_Resume.txt'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

document.getElementById('resumeBtn').addEventListener('click', downloadResume)
document.getElementById('aboutResumeBtn').addEventListener('click', downloadResume)

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear()
