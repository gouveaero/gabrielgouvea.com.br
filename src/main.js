import './style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// ── Journey data ──
const MILESTONES = [
  {
    year: '2016–2019',
    title: 'CEFET/RJ — Técnico em Mecânica',
    desc: 'Aprendi que rigor técnico e liderança não são opostos. Conciliei o curso técnico com pesquisa científica no CNPq — três artigos publicados em conferências internacionais antes dos 20 anos.',
    tag: 'Engenharia & Pesquisa',
  },
  {
    year: '2018–2019',
    title: 'Pipeway Engenharia — Estágio em Oil & Gas',
    desc: 'Meu primeiro contato com engenharia industrial de verdade: desenvolvimento de componentes para PIGs de inspeção de gasodutos. Modelagem 3D em SolidWorks, validação dimensional e acompanhamento de protótipos físicos.',
    tag: 'Engenharia Industrial',
  },
  {
    year: '2019–2021',
    title: 'Preparação Militar — Farias Brito',
    desc: 'Anos de preparação intensa para concursos militares. Aprovado em AFA, EsPCEx, EFOMM e na 1ª fase do ITA. Descobri que gosto tanto do processo quanto da chegada.',
    tag: 'Disciplina & Método',
  },
  {
    year: '2022',
    title: 'UFMG — Engenharia Aeroespacial + Marketing',
    desc: 'Dois mundos, ao mesmo tempo: cálculo de trajetórias de foguetes de dia, primeiros passos em tráfego pago à noite. Ingressei na UFMG e comecei como gestor de mídia paga.',
    tag: 'Dupla Fronteira',
  },
  {
    year: '2022–2025',
    title: 'Equipe Fênix — Recordistas LASC 2023',
    desc: 'Membro do subsistema de Aerodinâmica & Estruturas da Equipe Fênix. Co-autor do foguete Guará, campeão da Latin American Space Challenge 2023. Recorde de precisão: 999,6 m de altitude com apenas 40 cm de desvio do alvo.',
    tag: '🏆 Recordistas América Latina',
  },
  {
    year: '2024–hoje',
    title: 'Exos Marketing — Co-fundador',
    desc: 'Cofundador e Head de Growth, Data & Operations. Mais de R$2 milhões em mídia gerenciada. Processos, automações, dashboards e funis de venda que escalam com método.',
    tag: 'Empreendedorismo',
  },
  {
    year: '2026',
    title: 'HEG-Genève — Suíça',
    desc: 'International Business Management na Haute École de Gestion de Genève. A próxima altitude já tem coordenada.',
    tag: 'Visão Global',
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

// ── Particles canvas ──
function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId)
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let W, H, particles

  function resize() {
    W = canvas.width = canvas.offsetWidth
    H = canvas.height = canvas.offsetHeight
  }

  function createParticles() {
    const count = Math.floor((W * H) / 18000)
    return Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      a: Math.random() * 0.5 + 0.1,
    }))
  }

  function draw() {
    ctx.clearRect(0, 0, W, H)
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
  particles = createParticles()
  window.addEventListener('resize', () => { resize(); particles = createParticles() })

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
}

// ── About section reveals ──
function initAbout() {
  const items = ['#about .section-tag', '#about .section-title', '#about p', '#about .about-quote', '#about .btn', '#about .about-photo-container']
  items.forEach((sel, i) => {
    const el = document.querySelector(sel)
    if (!el) return
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    })
  })
}

// ── Journey scrollytelling ──
function initJourney() {
  const nav = document.getElementById('journey-nav')
  const card = document.getElementById('journey-card')
  const yearEl = document.getElementById('card-year')
  const titleEl = document.getElementById('card-title')
  const descEl = document.getElementById('card-desc')
  const tagEl = document.getElementById('card-tag')
  if (!card) return

  // Build nav dots
  MILESTONES.forEach((m, i) => {
    const dot = document.createElement('div')
    dot.className = 'journey-dot' + (i === 0 ? ' active' : '')
    dot.innerHTML = `<div class="journey-dot-circle"></div><span class="journey-dot-label">${m.year}</span>`
    dot.addEventListener('click', () => goToMilestone(i))
    nav.appendChild(dot)
  })

  let current = -1

  function setCard(i, animate = true) {
    if (i === current) return
    current = i
    const m = MILESTONES[i]

    // Update nav dots
    document.querySelectorAll('.journey-dot').forEach((d, j) => d.classList.toggle('active', j === i))

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

  // Only set up scroll trigger on desktop
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
      },
    })
  } else {
    // Mobile: show all milestones as a simple list
    card.style.display = 'none'
    const mobileList = document.createElement('div')
    mobileList.className = 'journey-mobile-list'
    mobileList.style.cssText = 'display:flex;flex-direction:column;gap:16px;margin-top:16px;'
    MILESTONES.forEach((m) => {
      const item = document.createElement('div')
      item.className = 'journey-card'
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

// ── Generic section reveal ──
function initReveals() {
  const selectors = [
    '#numbers .section-tag', '#numbers .section-title',
    '#numbers .number-card',
    '#services .section-tag', '#services .section-title',
    '#services .service-card',
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
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
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
}

// ── Init ──
window.addEventListener('DOMContentLoaded', () => {
  initHero()
  initAbout()
  initJourney()
  initNumbers()
  initReveals()
})
