import './style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// ── Journey data ──
const MILESTONES = [
  {
    year: '2016–2019',
    title: 'CEFET/RJ — Base Técnica',
    desc: 'Técnico em Mecânica com pesquisa no CNPq, coordenação do time de competição Solmae e estágio na Pipeway Engenharia (Oil & Gas). Três artigos publicados em conferências internacionais antes dos 20 anos.',
    tag: 'Engenharia & Pesquisa',
  },
  {
    year: '2020–2021',
    title: 'Farias Brito — Preparação Militar',
    desc: 'Dois anos de preparação intensa. Aprovações: AFA, EsPCEx, EFOMM e 1ª fase do ITA. Esse ciclo me mostrou que sou capaz de superar qualquer limite que eu mesmo me impuser.',
    tag: 'Disciplina & Superação',
  },
  {
    year: '2022',
    title: 'UFMG — Engenharia Aeroespacial',
    desc: 'Ingresso na Universidade Federal de Minas Gerais. Engenharia Aeroespacial como caminho natural para quem sempre encarou o céu como ponto de partida, não como limite.',
    tag: 'Engenharia Aeroespacial',
  },
  {
    year: '2022',
    title: 'Primeiro contato com o Marketing Digital',
    desc: 'Comecei como uma forma de gerar renda antes de iniciar a faculdade. Descobri que as mesmas habilidades analíticas da engenharia faziam total sentido no marketing digital. O que era complementar virou vocação.',
    tag: 'Descoberta Digital',
  },
  {
    year: '2023–2025',
    title: 'Equipe Fênix — Recordistas LASC 2023',
    desc: 'Subsistema de Aerodinâmica e Estruturas. Co-autor do foguete Guará, campeão da Latin American Space Challenge 2023. Recorde de precisão: 999,6 m de altitude com apenas 40 cm de desvio do alvo.',
    tag: '🏆 Recordistas América Latina',
  },
  {
    year: '2024–hoje',
    title: 'Exos Marketing — Cofundador',
    desc: 'Responsável por tráfego pago, dados, operações e integrações com IA. Mais de R$2 milhões em mídia gerenciada. Automações, dashboards e sistemas de IA que multiplicam a capacidade das equipes.',
    tag: 'Empreendedorismo & IA',
  },
  {
    year: '2024–hoje',
    title: 'Vhoe.co — Fundador',
    desc: 'Marca brasileira de vestuário premium inspirada em aviação. Mais de 140K seguidores no Instagram construídos via conteúdo de IA. Produto, marca e canal de distribuição construídos do zero.',
    tag: 'Brand Building',
  },
  {
    year: '2026',
    title: 'HEG-Genève — Suíça',
    desc: 'International Business Management na Haute École de Gestion de Genève. A próxima altitude já tem coordenada.',
    tag: 'Em breve...',
    upcoming: true,
  },
]

// ── Smooth scroll ──
const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

// ── Nav scroll effect ──
const nav = document.getElementById('nav')
ScrollTrigger.create({
  start: 'top -80',
  onUpdate: (self) => nav.classList.toggle('scrolled', self.scroll() > 80),
})

// ── Mobile nav ──
const toggle = document.getElementById('mobile-toggle')
const menu = document.getElementById('mobile-menu')
toggle?.addEventListener('click', () => menu.classList.toggle('open'))
menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => menu.classList.remove('open')))

// ── Text Scramble ──
function textScramble(el, duration = 900) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·'
  const original = el.textContent
  const steps = Math.floor(duration / 35)
  let step = 0

  const interval = setInterval(() => {
    const progress = step / steps
    let out = ''
    for (let i = 0; i < original.length; i++) {
      if (original[i] === ' ') { out += ' '; continue }
      if (original[i] === '·') { out += '·'; continue }
      if (progress * original.length > i) {
        out += original[i]
      } else {
        out += chars[Math.floor(Math.random() * chars.length)]
      }
    }
    el.textContent = out
    step++
    if (step > steps) {
      clearInterval(interval)
      el.textContent = original
    }
  }, 35)
}

// ── Orbital arcs animation ──
function initOrbitalArcs() {
  const dot1 = document.querySelector('.orbit-dot-1')
  const dot2 = document.querySelector('.orbit-dot-2')
  const orbit1 = document.querySelector('.orbit-1')
  const orbit2 = document.querySelector('.orbit-2')
  if (!dot1 || !orbit1) return

  // Get ellipse attributes for dot1 on orbit-1
  const cx1 = 600, cy1 = 350, rx1 = 520, ry1 = 200
  const cx2 = 600, cy2 = 350, rx2 = 380, ry2 = 300
  let t1 = 0, t2 = Math.PI

  function animateDots() {
    t1 += 0.003
    t2 += 0.0018
    dot1.setAttribute('cx', cx1 + rx1 * Math.cos(t1))
    dot1.setAttribute('cy', cy1 + ry1 * Math.sin(t1))
    dot2.setAttribute('cx', cx2 + rx2 * Math.cos(t2))
    dot2.setAttribute('cy', cy2 + ry2 * Math.sin(t2))
    requestAnimationFrame(animateDots)
  }

  // Slow rotation on orbits via CSS — dot animation in JS
  animateDots()
}

// ── Particles canvas ──
function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId)
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let W, H, particles, stars

  function resize() {
    W = canvas.width = canvas.offsetWidth
    H = canvas.height = canvas.offsetHeight
  }

  function createStars() {
    return Array.from({ length: 180 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 0.7 + 0.2,
      a: Math.random() * 0.18 + 0.04,
    }))
  }

  function createParticles() {
    const count = Math.floor((W * H) / 22000)
    return Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      a: Math.random() * 0.45 + 0.1,
    }))
  }

  function draw() {
    ctx.clearRect(0, 0, W, H)
    // Static stars
    stars.forEach((s) => {
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${s.a})`
      ctx.fill()
    })
    // Moving cyan particles
    particles.forEach((p) => {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0) p.x = W
      if (p.x > W) p.x = 0
      if (p.y < 0) p.y = H
      if (p.y > H) p.y = 0
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0, 194, 255, ${p.a})`
      ctx.fill()
    })
  }

  resize()
  stars = createStars()
  particles = createParticles()
  window.addEventListener('resize', () => { resize(); stars = createStars(); particles = createParticles() })

  let raf
  function loop() { draw(); raf = requestAnimationFrame(loop) }
  loop()
}

initParticles('particles-canvas')
initParticles('particles-canvas-2')

// ── Hero entrance animation ──
function initHero() {
  const content = document.querySelector('.hero-content')
  const pre = document.querySelector('.hero-pre')
  const lines = document.querySelectorAll('.hero-title .line')
  const sub = document.querySelector('.hero-sub')
  const ctas = document.querySelector('.hero-ctas')
  const scrollHint = document.querySelector('.hero-scroll-hint')

  const tl = gsap.timeline({ delay: 0.2 })
  tl.to(content, { opacity: 1, duration: 0 })
    .to(pre, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.1)
    .to(lines, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }, 0.35)
    .to(sub, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.8)
    .to(ctas, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.0)
    .to(scrollHint, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 1.4)
    .add(() => {
      const preEl = document.getElementById('hero-pre')
      if (preEl) textScramble(preEl, 900)
    }, 0.5)
}

// ── About section reveals ──
function initAbout() {
  const items = ['#about .section-tag', '#about .section-title', '#about p', '#about .about-quote', '#about .btn', '#about .about-photo-container']
  items.forEach((sel) => {
    const el = document.querySelector(sel)
    if (!el) return
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    })
  })
}

// ── Journey scrollytelling ──
function initJourney() {
  const navEl = document.getElementById('journey-nav')
  const card = document.getElementById('journey-card')
  const yearEl = document.getElementById('card-year')
  const titleEl = document.getElementById('card-title')
  const descEl = document.getElementById('card-desc')
  const tagEl = document.getElementById('card-tag')
  const rocket = document.getElementById('journey-rocket')
  const trail = document.getElementById('journey-trail')
  const rocketCol = document.getElementById('journey-rocket-col')
  if (!card) return

  // Build nav dots — appended in order, CSS reverses visually
  MILESTONES.forEach((m, i) => {
    const dot = document.createElement('div')
    dot.className = 'journey-dot' + (i === 0 ? ' active' : '')
    dot.innerHTML = `<div class="journey-dot-circle"></div><span class="journey-dot-label">${m.year}</span>`
    dot.addEventListener('click', () => goToMilestone(i))
    navEl.appendChild(dot)
  })

  let current = -1

  function setCard(i, animate = true) {
    if (i === current) return
    current = i
    const m = MILESTONES[i]

    document.querySelectorAll('.journey-dot').forEach((d, j) => {
      d.classList.toggle('active', j === i)
      d.classList.toggle('visited', j < i)
    })

    if (m.upcoming) {
      card.classList.add('upcoming')
    } else {
      card.classList.remove('upcoming')
    }

    if (animate) {
      gsap.to(card, {
        opacity: 0, y: 16, duration: 0.2, ease: 'power2.in',
        onComplete: () => {
          yearEl.textContent = m.year
          titleEl.textContent = m.title
          descEl.textContent = m.desc
          tagEl.textContent = m.tag
          gsap.fromTo(card, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' })
        },
      })
    } else {
      yearEl.textContent = m.year
      titleEl.textContent = m.title
      descEl.textContent = m.desc
      tagEl.textContent = m.tag
      gsap.set(card, { opacity: 1, y: 0 })
    }
  }

  function goToMilestone(i) {
    const spacer = document.getElementById('journey-spacer')
    const section = document.getElementById('journey')
    if (!spacer || !section) return setCard(i, true)
    const sectionTop = section.getBoundingClientRect().top + window.scrollY
    const step = spacer.offsetHeight / MILESTONES.length
    lenis.scrollTo(sectionTop + step * i + step / 2, { duration: 0.6 })
  }

  setCard(0, false)

  if (window.innerWidth > 900) {
    const spacer = document.getElementById('journey-spacer')
    spacer.style.display = 'block'

    ScrollTrigger.create({
      trigger: '#journey',
      start: 'top top',
      end: () => `+=${MILESTONES.length * window.innerHeight}`,
      scrub: 0.5,
      onUpdate: (self) => {
        const idx = Math.min(Math.floor(self.progress * MILESTONES.length), MILESTONES.length - 1)
        setCard(idx, true)

        // Rocket: moves from bottom (progress=0) to top (progress=1)
        if (rocket && rocketCol) {
          const colH = rocketCol.offsetHeight
          const rocketH = rocket.offsetHeight || 38
          const maxY = Math.max(0, colH - rocketH)
          const rocketY = (1 - self.progress) * maxY
          gsap.set(rocket, { top: rocketY })

          // Trail: grows from bottom
          if (trail) {
            trail.style.height = (self.progress * colH) + 'px'
          }
        }
      },
    })
  } else {
    card.style.display = 'none'
    if (rocketCol) rocketCol.style.display = 'none'
    const mobileList = document.createElement('div')
    mobileList.className = 'journey-mobile-list'
    mobileList.style.cssText = 'display:flex;flex-direction:column;gap:16px;margin-top:16px;'
    MILESTONES.forEach((m) => {
      const item = document.createElement('div')
      item.className = 'journey-card' + (m.upcoming ? ' upcoming' : '')
      item.style.cssText = 'opacity:1;transform:none;'
      item.innerHTML = `
        <div class="journey-card-year">${m.year}</div>
        <h3 class="journey-card-title">${m.title}</h3>
        <p class="journey-card-desc">${m.desc}</p>
        <span class="journey-card-tag">${m.tag}</span>
      `
      mobileList.appendChild(item)
    })
    document.querySelector('.journey-card-col').appendChild(mobileList)
  }
}

// ── Number counters ──
function initNumbers() {
  document.querySelectorAll('.number-card').forEach((card) => {
    const val = parseFloat(card.dataset.value)
    const decimals = parseInt(card.dataset.decimals || '0')
    const el = card.querySelector('.number-val')
    if (!el) return
    const obj = { n: 0 }

    ScrollTrigger.create({
      trigger: card,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          n: val,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = decimals > 0 ? obj.n.toFixed(decimals) : Math.floor(obj.n).toString()
          },
        })
      },
    })
  })
}

// ── Section reveals ──
function initReveals() {
  const selectors = [
    '#numbers .section-tag', '#numbers .section-title',
    '#numbers .number-card',
    '#services .section-tag', '#services .section-title',
    '#services .service-card', '#services .services-bridge',
    '#dual-path .dual-card',
    '#contact .section-tag', '#contact .section-title', '#contact .contact-sub', '#contact .contact-ctas',
  ]

  selectors.forEach((sel) => {
    const els = document.querySelectorAll(sel)
    els.forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 36,
        duration: 0.7,
        ease: 'power3.out',
        delay: i * 0.08,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })
  })

  // Journey header
  const journeyHeader = document.querySelector('.journey-header-col')
  if (journeyHeader) {
    gsap.from(journeyHeader, {
      opacity: 0, x: -40, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: journeyHeader, start: 'top 80%', once: true },
    })
  }

  // About section clip-path reveal
  const aboutSection = document.getElementById('about')
  if (aboutSection) {
    gsap.from(aboutSection, {
      clipPath: 'inset(6% 0 0 0)',
      opacity: 0,
      duration: 1.0,
      ease: 'power3.out',
      scrollTrigger: { trigger: aboutSection, start: 'top 90%', once: true },
    })
  }

  // Numbers section — stagger cards
  const numberCards = document.querySelectorAll('.number-card')
  if (numberCards.length) {
    gsap.from(numberCards, {
      opacity: 0, y: 50, scale: 0.96,
      duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '#numbers', start: 'top 80%', once: true },
    })
  }

  // Dual path — slide from sides
  const dualLeft = document.querySelector('.dual-entrepreneurs')
  const dualRight = document.querySelector('.dual-corporate')
  if (dualLeft) {
    gsap.from(dualLeft, {
      opacity: 0, x: -50, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '#dual-path', start: 'top 80%', once: true },
    })
  }
  if (dualRight) {
    gsap.from(dualRight, {
      opacity: 0, x: 50, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '#dual-path', start: 'top 80%', once: true },
    })
  }
}

// ── Init ──
window.addEventListener('DOMContentLoaded', () => {
  initHero()
  initAbout()
  initOrbitalArcs()
  initJourney()
  initNumbers()
  initReveals()
})
