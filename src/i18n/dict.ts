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
  about: { kicker: string; headline: string; body: string; quote: string; photoCaption: string; linkLabel: string };
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
      "That passion took me to CEFET/RJ, where I paired a mechanical technician degree with scientific research, publishing at international conferences before I turned 20. Then came years of intense preparation, with admissions to Brazil's most selective service academies, the <strong>Air Force Academy (AFA)</strong>, the <strong>Army's cadet school (EsPCEx)</strong> and the <strong>Merchant Marine officer school (EFOMM)</strong>, and to <strong>ITA</strong>, the country's top aerospace institute. In 2022 I was admitted to Aerospace Engineering at UFMG, one of Brazil's most competitive federal universities, the same year I took my first steps in entrepreneurship and digital marketing. I learned that the engineer's mindset, <span class='hl'>systems, data and precision</span>, works in any domain.",
    quote: "What drives me is <span class='lime'>the instinct to take on challenges and make something new of them.</span>",
    photoCaption: "Podcast conversation",
    linkLabel: "Full profile on LinkedIn",
  },
  path: {
    title: "The <span class='lime'>trajectory</span>",
    kicker: "engineering precision · business velocity",
    lede:
      "None of this came from giving up on a path. It came from connecting science, engineering and entrepreneurship into one way of building.",
    stages: ["LAUNCH", "ATMOSPHERE", "ORBIT", "BEYOND"],
    milestones: [
      { year: "2016–19", tag: "CEFET/RJ", title: "Technical base", desc: "Mechanical technician with CNPq research, SolMar competition lead and a Pipeway (Oil & Gas) internship." },
      { year: "2020–21", tag: "Farias Brito", title: "Years at full intensity", desc: "Intense preparation in math, physics and chemistry, with admissions to AFA, EsPCEx, EFOMM and ITA." },
      { year: "2022", tag: "UFMG", title: "Aerospace Engineering", desc: "Admitted to Aerospace Engineering at UFMG, one of Brazil's most competitive programs. The same year, my first steps in entrepreneurship and digital marketing." },
      { year: "2023", tag: "LASC", title: "Champion, 0.4 m off", desc: "Member of the aerodynamics & structures subsystem, team Fênix. I actively built rocket Guará, champion in the 1 km class with a Brazilian record of 999.6 m, 0.4 m from target." },
      { year: "2024→", tag: "Exos", title: "Co-founder & CTO", desc: "Leading paid media, data and AI integrations across the agency. Turning launches into recurring revenue." },
      { year: "2026", tag: "Vhoe.co", title: "Founder", desc: "Premium aviation apparel brand. 140K+ Instagram followers built via AI content. Product, brand and channel from scratch." },
      { year: "2026", tag: "AI dev", title: "Building with AI", desc: "Sites, local image-generation systems, local LLMs, autonomous agents with Hermes, and proprietary marketing skills." },
      { year: "2026", tag: "HEG Geneva", title: "IBM exchange", desc: "International Business Management in Geneva. The next altitude already has a coordinate." },
    ],
  },
  services: {
    title: "My <span class='lime'>expertise</span>",
    kicker: "where I'm strong",
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
      "For years, deep specialization looked like the only way to be valuable. The harder the problem, the more it paid to master a single front. AI changed that.",
      "I don't treat AI as decoration. I use it to operate across many fronts at once, engineering, marketing, product and data, and ship what used to take a whole team.",
      "The edge now isn't only knowing how to execute. It's connecting ideas, asking the right questions and turning vision into something real, fast.",
      "That is how I work: as a builder who orchestrates many skills instead of guarding one. AI doesn't replace people, it amplifies the ones who use it with intention.",
    ],
    close: "The advantage of the coming years isn't being the best at one thing. It's orchestrating many to build what matters.",
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
      "Essa paixão me levou ao CEFET/RJ, onde uni o técnico em mecânica à pesquisa científica, com trabalhos publicados em conferências internacionais antes dos 20 anos. Depois vieram anos de preparação intensa, com aprovações na <strong>Academia da Força Aérea (AFA)</strong>, na <strong>Escola Preparatória de Cadetes do Exército (EsPCEx)</strong>, na <strong>Escola de Formação de Oficiais da Marinha Mercante (EFOMM)</strong> e no <strong>ITA</strong>. Em 2022 fui aprovado em Engenharia Aeroespacial na UFMG, uma das universidades federais mais concorridas do Brasil, no mesmo ano em que dei os primeiros passos no empreendedorismo e no marketing digital. Descobri que a mentalidade de engenheiro, <span class='hl'>sistemas, dados e precisão</span>, funciona em qualquer domínio.",
    quote: "O que me move é <span class='lime'>o instinto de pegar desafios e fazer algo novo com eles.</span>",
    photoCaption: "Conversa em podcast",
    linkLabel: "Perfil completo no LinkedIn",
  },
  path: {
    title: "A <span class='lime'>trajetória</span>",
    kicker: "precisão de engenharia · velocidade de negócio",
    lede:
      "Nada disso veio de desistir de um caminho. Veio de conectar ciência, engenharia e empreendedorismo num só jeito de construir.",
    stages: ["LANÇAMENTO", "ATMOSFERA", "ÓRBITA", "ALÉM"],
    milestones: [
      { year: "2016–19", tag: "CEFET/RJ", title: "Base técnica", desc: "Técnico em mecânica com pesquisa no CNPq, liderança no SolMar e estágio na Pipeway (Oil & Gas)." },
      { year: "2020–21", tag: "Farias Brito", title: "Anos de alta intensidade", desc: "Preparação intensa em matemática, física e química, com aprovações na AFA, EsPCEx, EFOMM e no ITA." },
      { year: "2022", tag: "UFMG", title: "Engenharia Aeroespacial", desc: "Aprovado em Engenharia Aeroespacial na UFMG, um dos cursos mais concorridos do Brasil. No mesmo ano, os primeiros passos no empreendedorismo e no marketing digital." },
      { year: "2023", tag: "LASC", title: "Campeão, desvio de 0,4 m", desc: "Membro do subsistema de aerodinâmica e estruturas da equipe Fênix. Participei ativamente na construção do foguete Guará, campeão na categoria de 1 km com recorde brasileiro de 999,6 m, a 0,4 m do alvo." },
      { year: "2024→", tag: "Exos", title: "Cofundador e CTO", desc: "Lidero tráfego pago, dados e integrações com IA na agência. Transformando lançamentos em receita recorrente." },
      { year: "2026", tag: "Vhoe.co", title: "Fundador", desc: "Marca premium de vestuário de aviação. 140K+ seguidores no Instagram via conteúdo de IA. Produto, marca e canal do zero." },
      { year: "2026", tag: "IA", title: "Construindo com IA", desc: "Sites, sistemas de geração de imagem local, LLMs locais, agentes autônomos com Hermes e skills proprietárias para marketing." },
      { year: "2026", tag: "HEG Genebra", title: "Intercâmbio IBM", desc: "International Business Management em Genebra. A próxima altitude já tem coordenada." },
    ],
  },
  services: {
    title: "Minha <span class='lime'>expertise</span>",
    kicker: "meus pontos fortes",
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
      "Por anos, a especialização profunda pareceu a única forma de ser valioso. Quanto mais difícil o problema, mais compensava dominar uma única frente. A IA mudou isso.",
      "Não trato a IA como enfeite. Uso para operar em várias frentes ao mesmo tempo, engenharia, marketing, produto e dados, e entregar o que antes exigia um time inteiro.",
      "O diferencial agora não é só saber executar. É conectar ideias, fazer as perguntas certas e transformar visão em algo real, rápido.",
      "É assim que eu trabalho: como alguém que orquestra muitas habilidades em vez de guardar uma só. A IA não substitui pessoas, ela amplia quem a usa com intenção.",
    ],
    close: "A vantagem dos próximos anos não é ser o melhor em uma coisa só. É orquestrar várias para construir o que importa.",
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
