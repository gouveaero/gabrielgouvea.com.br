// Bilingual content. English is the default; Portuguese via the nav toggle.
// Rich strings carry inline HTML (rendered with <RT>). Accent spans: .lime .hl .dim
// No em dashes in prose (reads as AI). Hyphens only in standard compounds.

export type Lang = "en" | "pt";

export type Milestone = { year: string; title: string; desc: string; tag?: string };
export type Fact = { n: string; l: string; accent?: boolean };
export type Credential = { value: string; label: string; note: string; accent?: boolean };
export type ProjectLink = { label: string; href: string };
export type Project = {
  tag: string;
  title: string;
  blurb: string;
  href?: string;
  cta?: string;
  img?: string;
  links?: ProjectLink[];
};
export type Service = { title: string; desc: string };

const GG = "https://slides.gabrielgouvea.com.br";

export interface Content {
  meta: { title: string; desc: string };
  nav: { status: string; menu: { about: string; vision: string; path: string; contact: string }; cta: string };
  hero: {
    eyebrow1: string;
    eyebrow2: string;
    titleLines: string[];
    sub: string;
    cta: string;
    ctaGhost: string;
    portraitTag: string;
  };
  credentials: { label: string };
  about: { kicker: string; headline: string; body: string; quote: string; tagline: string; photoCaption: string; linkLabel: string };
  path: {
    title: string;
    kicker: string;
    lede: string;
    stages: string[];
    milestones: Milestone[];
  };
  services: { title: string; kicker: string; items: Service[]; linkLabel: string; linkHref: string };
  vision: { kicker: string; title: string; lede: string; paragraphs: string[]; close: string };
  contact: { title: string; sub: string; cta: string; links: { label: string; value: string; href: string }[] };
  footer: { note: string; rights: string };
}

const en: Content = {
  meta: {
    title: "Gabriel Gouvea · Engineer, Entrepreneur & AI Builder",
    desc: "Co-founder and CTO of Exos, aerospace engineering at UFMG. I build businesses and AI systems that perform.",
  },
  nav: {
    status: "field active",
    menu: { about: "About", vision: "Vision", path: "Trajectory", contact: "Contact" },
    cta: "Let's talk",
  },
  hero: {
    eyebrow1: "Aerospace Engineering · UFMG",
    eyebrow2: "Co-founder & CTO · Exos",
    titleLines: ["Engineer.", "Entrepreneur.", "<span class='lime'>AI</span> builder."],
    sub: "<strong>Co-founder and CTO at Exos.</strong> Aerospace engineering at UFMG. I build businesses and AI systems that perform.",
    cta: "Let's talk",
    ctaGhost: "see the work",
    portraitTag: "Gabriel Gouvea · 2026",
  },
  credentials: { label: "the path so far" },
  about: {
    kicker: "About",
    headline: "Since I was a kid, aircraft were my <span class='lime'>benchmark for excellence.</span>",
    body:
      "That passion took me to CEFET/RJ, where I paired a mechanical technician degree with scientific research, publishing at international conferences before I turned 20. Then came years of intense preparation and admissions to <strong>AFA, EsPCEx, EFOMM and ITA</strong>. The route changed, and it was the best thing that could have happened. In 2022 I began Aerospace Engineering at UFMG and, that same year, took my first steps in digital marketing. I learned that the engineer's mindset, <span class='hl'>systems, data and precision</span>, works in any domain.",
    quote: "What drives me isn't a job title. <span class='lime'>It's the instinct to take on challenges and make something of them.</span>",
    tagline: "Engineering doesn't lie. Neither does data.",
    photoCaption: "Founder & operator · in conversation",
    linkLabel: "Full profile on LinkedIn",
  },
  path: {
    title: "The <span class='lime'>trajectory</span>",
    kicker: "engineering precision · business velocity",
    lede:
      "A fighter pilot dream redirected into aerospace engineering. The same instinct now turns precision into a way of building companies and AI.",
    stages: ["LAUNCH", "ATMOSPHERE", "ORBIT", "BEYOND"],
    milestones: [
      { year: "2016–19", tag: "CEFET/RJ", title: "Technical base", desc: "Mechanical technician with CNPq research, SolMar competition lead and a Pipeway (Oil & Gas) internship. Research published at international conferences before 20." },
      { year: "2020–21", tag: "Farias Brito", title: "The route changed", desc: "Two years of intense prep. Admissions to AFA, EsPCEx, EFOMM and ITA. The plan broke, and it was the best thing that happened." },
      { year: "2022", tag: "UFMG", title: "Aerospace Engineering", desc: "Started at UFMG and, the same year, took the first steps in digital marketing." },
      { year: "2023", tag: "LASC", title: "Champion, 0.4 m off", desc: "Aerodynamics & structures on rocket Guará. 1 km class champion with a 999.6 m precision record, 0.4 m off target." },
      { year: "2024→", tag: "Exos", title: "Co-founder & CTO", desc: "Leading paid media, data and AI integrations across the agency. Turning launches into recurring revenue." },
      { year: "2026", tag: "Vhoe.co", title: "Founder", desc: "Premium aviation apparel brand. 140K+ Instagram followers built via AI content. Product, brand and channel from scratch." },
      { year: "2026", tag: "AI dev", title: "Building with AI", desc: "Sites, local image-generation systems, local LLMs, autonomous agents with Hermes, and proprietary marketing skills." },
      { year: "2026", tag: "HEG Geneva", title: "IBM exchange", desc: "International Business Management in Geneva. The next altitude already has a coordinate." },
    ],
  },
  services: {
    title: "Where I can <span class='lime'>help</span>",
    kicker: "what I do",
    items: [
      { title: "Strategy & Paid Media", desc: "Launch funnels and paid media with predictable ROI. Google, Meta, TikTok and LinkedIn Ads at scale." },
      { title: "Applied AI", desc: "Automation, AI agents and system architecture that multiply a team's capacity. From prompt to end to end integration." },
      { title: "Mentoring & Consulting", desc: "For digital entrepreneurs who need method: from strategy to execution, built on data and process engineering." },
    ],
    linkLabel: "Explore Gouvea Growth",
    linkHref: GG,
  },
  vision: {
    kicker: "Vision",
    title: "The polymath is <span class='lime'>back.</span>",
    lede: "Now with a new interface.",
    paragraphs: [
      "For a long time, extreme specialization looked like the best path. The more complex the problem, the more valuable it seemed to master a single front. AI changed the game.",
      "Today the edge isn't only in knowing how to do something. It's in connecting ideas, asking good questions, using the right tools and turning vision into execution. Intelligence still matters. What changed was the cost of execution.",
      "With AI, automation and tools like Claude Code and n8n, one person with good vision can build, test and ship what used to require whole teams.",
      "AI gives back something that excessive specialization had taken away: the ability to build across many fronts and think like a modern polymath. AI doesn't replace people. It amplifies those who use it with intention.",
    ],
    close: "The advantage of the coming years isn't being the best at one thing. It's orchestrating many skills to build extraordinary things.",
  },
  contact: {
    title: "Let's <span class='lime'>talk.</span>",
    sub: "Open to ventures, partnerships and AI problems worth solving.",
    cta: "Send an email",
    links: [
      { label: "Email", value: "gvsg.gouvea@gmail.com", href: "mailto:gvsg.gouvea@gmail.com" },
      { label: "LinkedIn", value: "in/gabriel-aero", href: "https://www.linkedin.com/in/gabriel-aero" },
      { label: "Instagram", value: "@gouveaero", href: "https://instagram.com/gouveaero" },
    ],
  },
  footer: { note: "built with AI · real time generative field", rights: "Gabriel Gouvea" },
};

const pt: Content = {
  meta: {
    title: "Gabriel Gouvea · Engenheiro, Empreendedor & Construtor de IA",
    desc: "Cofundador e Diretor Técnico da Exos, engenharia aeroespacial na UFMG. Construo negócios e sistemas de IA que performam.",
  },
  nav: {
    status: "campo ativo",
    menu: { about: "Sobre", vision: "Visão", path: "Trajetória", contact: "Contato" },
    cta: "Vamos conversar",
  },
  hero: {
    eyebrow1: "Engenharia Aeroespacial · UFMG",
    eyebrow2: "Cofundador e Diretor Técnico · Exos",
    titleLines: ["Engenheiro.", "Empreendedor.", "Construtor de <span class='lime'>IA.</span>"],
    sub: "<strong>Cofundador e Diretor Técnico da Exos.</strong> Engenharia aeroespacial na UFMG. Construo negócios e sistemas de IA que performam.",
    cta: "Vamos conversar",
    ctaGhost: "ver o trabalho",
    portraitTag: "Gabriel Gouvea · 2026",
  },
  credentials: { label: "a trajetória até aqui" },
  about: {
    kicker: "Sobre",
    headline: "Desde criança, aviões foram meu <span class='lime'>referencial de excelência.</span>",
    body:
      "Essa paixão me levou ao CEFET/RJ, onde uni o técnico em mecânica à pesquisa científica, com trabalhos publicados em conferências internacionais antes dos 20 anos. Vieram anos de preparação intensa e aprovações na <strong>AFA, EsPCEx, EFOMM e no ITA</strong>. A rota mudou, e foi a melhor coisa que aconteceu. Em 2022 entrei em Engenharia Aeroespacial na UFMG e, no mesmo ano, dei os primeiros passos no marketing digital. Descobri que a mentalidade de engenheiro, <span class='hl'>sistemas, dados e precisão</span>, funciona em qualquer domínio.",
    quote: "O que me move não é uma profissão ou um cargo. <span class='lime'>É o instinto de pegar desafios e fazer algo com eles.</span>",
    tagline: "A engenharia não mente. Os dados também não.",
    photoCaption: "Founder & operador · em conversa",
    linkLabel: "Perfil completo no LinkedIn",
  },
  path: {
    title: "A <span class='lime'>trajetória</span>",
    kicker: "precisão de engenharia · velocidade de negócio",
    lede:
      "Um sonho de piloto de caça redirecionado para a engenharia aeroespacial. O mesmo instinto agora transforma precisão num jeito de construir empresas e IA.",
    stages: ["LANÇAMENTO", "ATMOSFERA", "ÓRBITA", "ALÉM"],
    milestones: [
      { year: "2016–19", tag: "CEFET/RJ", title: "Base técnica", desc: "Técnico em mecânica com pesquisa no CNPq, liderança no SolMar e estágio na Pipeway (Oil & Gas). Pesquisa publicada em conferências internacionais antes dos 20." },
      { year: "2020–21", tag: "Farias Brito", title: "A rota mudou", desc: "Dois anos de preparação intensa. Aprovações na AFA, EsPCEx, EFOMM e no ITA. O plano quebrou, e foi a melhor coisa que aconteceu." },
      { year: "2022", tag: "UFMG", title: "Engenharia Aeroespacial", desc: "Entrei na UFMG e, no mesmo ano, dei os primeiros passos no marketing digital." },
      { year: "2023", tag: "LASC", title: "Campeão, desvio de 0,4 m", desc: "Aerodinâmica e estruturas no foguete Guará. Campeão na categoria 1 km com recorde de 999,6 m, 0,4 m do alvo." },
      { year: "2024→", tag: "Exos", title: "Cofundador e CTO", desc: "Lidero tráfego pago, dados e integrações com IA na agência. Transformando lançamentos em receita recorrente." },
      { year: "2026", tag: "Vhoe.co", title: "Fundador", desc: "Marca premium de vestuário de aviação. 140K+ seguidores no Instagram via conteúdo de IA. Produto, marca e canal do zero." },
      { year: "2026", tag: "IA", title: "Construindo com IA", desc: "Sites, sistemas de geração de imagem local, LLMs locais, agentes autônomos com Hermes e skills proprietárias para marketing." },
      { year: "2026", tag: "HEG Genebra", title: "Intercâmbio IBM", desc: "International Business Management em Genebra. A próxima altitude já tem coordenada." },
    ],
  },
  services: {
    title: "Onde posso <span class='lime'>contribuir</span>",
    kicker: "o que faço",
    items: [
      { title: "Estratégia & Tráfego Pago", desc: "Funis de lançamento e mídia paga com ROI previsível. Google, Meta, TikTok e LinkedIn Ads em escala." },
      { title: "IA Aplicada", desc: "Automações, agentes de IA e arquitetura de sistemas que multiplicam a capacidade das equipes. Do prompt à integração ponta a ponta." },
      { title: "Mentoria & Consultoria", desc: "Para empreendedores digitais que precisam de método: da estratégia à execução, com dados e engenharia de processos." },
    ],
    linkLabel: "Conheça a Gouvea Growth",
    linkHref: GG,
  },
  vision: {
    kicker: "Visão",
    title: "O polímata está de <span class='lime'>volta.</span>",
    lede: "Agora com uma nova interface.",
    paragraphs: [
      "Por muito tempo, a especialização extrema parecia o melhor caminho. Quanto mais complexo o problema, mais valioso dominar uma única frente. A IA mudou o jogo.",
      "Hoje o diferencial não está só em saber fazer. Está em conectar ideias, fazer boas perguntas, usar as ferramentas certas e transformar visão em execução. A inteligência continua importando. O que mudou foi o custo da execução.",
      "Com IA, automações e ferramentas como Claude Code e n8n, uma pessoa com boa visão constrói, testa e lança o que antes exigia equipes inteiras.",
      "A IA devolve algo que a especialização excessiva tinha tirado: a capacidade de construir em várias frentes e pensar como um polímata moderno. A IA não substitui pessoas. Ela amplia quem sabe usá-la com intenção.",
    ],
    close: "A vantagem dos próximos anos não é ser o melhor em uma coisa só. É orquestrar várias habilidades para construir coisas extraordinárias.",
  },
  contact: {
    title: "Vamos <span class='lime'>conversar.</span>",
    sub: "Aberto a empreitadas, parcerias e problemas de IA que valham a pena resolver.",
    cta: "Enviar um e-mail",
    links: [
      { label: "E-mail", value: "gvsg.gouvea@gmail.com", href: "mailto:gvsg.gouvea@gmail.com" },
      { label: "LinkedIn", value: "in/gabriel-aero", href: "https://www.linkedin.com/in/gabriel-aero" },
      { label: "Instagram", value: "@gouveaero", href: "https://instagram.com/gouveaero" },
    ],
  },
  footer: { note: "construído com IA · campo generativo em tempo real", rights: "Gabriel Gouvea" },
};

export const dict: Record<Lang, Content> = { en, pt };
