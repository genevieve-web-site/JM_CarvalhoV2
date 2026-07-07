import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Menu, X, FileText, HardHat, Users, UserCheck, ChevronRight,
  Mail, Phone, MapPin, Target, Eye, Diamond, Handshake,
  CheckCircle2, ArrowRight, Star, Briefcase, Clock, Building2,
  Shield, FolderOpen, BarChart3, ChevronLeft,
} from "lucide-react";

// ─── Injected keyframes ─────────────────────────────────────────
const CSS = `
  @keyframes float-up { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-40px) scale(.8);opacity:0} }
  @keyframes doc1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes doc2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes doc3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  @keyframes pulse-ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.6);opacity:0} }
  @keyframes check-draw { 0%{stroke-dashoffset:24} 100%{stroke-dashoffset:0} }
  @keyframes bar-grow { 0%{transform:scaleY(0)} 100%{transform:scaleY(1)} }
  @keyframes person-in { 0%{transform:translateY(12px);opacity:0} 100%{transform:translateY(0);opacity:1} }
  @keyframes slide-left { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
  @keyframes fadeInUp { 0%{opacity:0;transform:translateY(24px)} 100%{opacity:1;transform:translateY(0)} }
  @keyframes star-pop { 0%{transform:scale(0) rotate(-30deg);opacity:0} 70%{transform:scale(1.2) rotate(5deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
`;

function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}

// ─── Ornament ────────────────────────────────────────────────────
function Ornament({ className = "" }: { className?: string }) {
  return <span className={`inline-block text-accent font-bold leading-none ${className}`} aria-hidden>◆</span>;
}

// ─── Logo with clearbit fallback ─────────────────────────────────
function LogoImg({ domain, image, name, size = 40 }: { domain?: string; image?: string; name: string; size?: number }) {
  const [err, setErr] = useState(false);
  const initials = name.replace(/[^A-Za-z\s]/g, "").split(" ").slice(0, 2).map(w => w[0] ?? "").join("").toUpperCase() || name[0];
  
  // Use local image if provided
  if (image && !err) {
    return (
      <img
        src={image}
        alt={name}
        onError={() => setErr(true)}
        className="rounded object-contain flex-shrink-0 bg-transparent p-0"
        style={{ width: size, height: size }}
      />
    );
  }
  
  if (!domain || err) {
    return (
      <div
        className="rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center font-bold text-primary flex-shrink-0"
        style={{ width: size, height: size, fontSize: size * 0.35 }}
      >
        {initials}
      </div>
    );
  }
  return (
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={name}
      onError={() => setErr(true)}
      className="rounded object-contain flex-shrink-0 bg-transparent p-0"
      style={{ width: size, height: size }}
    />
  );
}

// ─── Star rating ──────────────────────────────────────────────────
function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < n ? "text-accent fill-accent" : "text-muted-foreground"}
          style={{ animation: `star-pop .4s ${i * 0.08}s both` }}
        />
      ))}
    </div>
  );
}

// ─── Service animated illustrations ──────────────────────────────
function DocAnimation() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      {/* folder base */}
      <div className="absolute bottom-6 w-28 h-20 rounded-lg bg-primary/20 border-2 border-primary/30 flex items-end justify-center pb-2">
        <FolderOpen size={32} className="text-primary/50" />
      </div>
      {/* floating docs */}
      {[
        { delay: "0s", left: "calc(50% - 30px)", color: "bg-white border-accent/60" },
        { delay: "0.4s", left: "calc(50% - 10px)", color: "bg-accent/10 border-accent/40" },
        { delay: "0.8s", left: "calc(50% + 10px)", color: "bg-primary/10 border-primary/30" },
      ].map((d, i) => (
        <div
          key={i}
          className={`absolute w-10 h-12 border-2 rounded shadow-md ${d.color} flex flex-col items-center justify-center gap-1`}
          style={{
            left: d.left,
            top: "10px",
            animation: `float-up 2.4s ${d.delay} ease-in-out infinite`,
          }}
        >
          <div className="w-6 h-0.5 bg-current opacity-30 rounded" />
          <div className="w-5 h-0.5 bg-current opacity-20 rounded" />
          <div className="w-4 h-0.5 bg-current opacity-20 rounded" />
        </div>
      ))}
      {/* checkmark */}
      <div className="absolute bottom-8 right-8 w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-lg">
        <CheckCircle2 size={18} className="text-white" />
      </div>
    </div>
  );
}

function ShieldAnimation() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      {/* pulse rings */}
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="absolute w-24 h-24 rounded-full border-2 border-accent/40"
          style={{ animation: `pulse-ring 2s ${i * 0.7}s ease-out infinite` }}
        />
      ))}
      {/* shield */}
      <div className="relative z-10 w-20 h-20 flex items-center justify-center bg-primary rounded-2xl shadow-xl shadow-primary/30">
        <Shield size={40} className="text-accent" />
      </div>
      {/* NR badges */}
      {["NR-10", "NR-35", "EPI", "ASO"].map((label, i) => (
        <div
          key={label}
          className="absolute text-xs font-bold text-primary bg-white border border-primary/20 px-2 py-1 rounded shadow"
          style={{
            top: i < 2 ? `${20 + i * 30}px` : `${80 + (i - 2) * 30}px`,
            right: i % 2 === 0 ? "20px" : "auto",
            left: i % 2 === 1 ? "20px" : "auto",
            animation: `person-in .5s ${0.2 + i * 0.2}s both`,
          }}
        >
          ✓ {label}
        </div>
      ))}
    </div>
  );
}

function PeopleAnimation() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center gap-8">
      {[
        { Icon: Users, label: "Colaborador", delay: "0s" },
        { Icon: Building2, label: "Empresa", delay: "0.3s" },
        { Icon: BarChart3, label: "Contábil", delay: "0.6s" },
      ].map(({ Icon, label, delay }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-2"
          style={{ animation: `person-in .6s ${delay} both` }}
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
            <Icon size={24} className="text-primary" />
          </div>
          <span className="text-xs text-muted-foreground font-medium">{label}</span>
          {/* connector dots */}
          <div className="absolute top-[52px] flex gap-1">
            {[0,1,2,3].map(i => (
              <div key={i} className="w-1 h-1 rounded-full bg-accent/40" style={{animationDelay:`${i*0.2}s`}} />
            ))}
          </div>
        </div>
      ))}
      {/* center arrow document */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg z-10">
        <FileText size={18} className="text-white" />
      </div>
    </div>
  );
}

function HRAnimation() {
  const bars = [60, 80, 45, 95, 70];
  return (
    <div className="relative w-full h-48 flex items-end justify-center gap-3 pb-8">
      {bars.map((h, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div
            className={`w-10 rounded-t ${i === 3 ? "bg-accent" : "bg-primary/30"}`}
            style={{
              height: h * 0.9,
              animation: `bar-grow .8s ${i * 0.15}s both`,
              transformOrigin: "bottom",
            }}
          />
          <div className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center" style={{ animation: `person-in .5s ${0.8 + i * 0.1}s both` }}>
            <Users size={14} className="text-primary" />
          </div>
        </div>
      ))}
      <div className="absolute top-4 right-4 flex gap-0.5">
        {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-accent fill-accent" />)}
      </div>
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────
const services = [
  {
    key: "documental",
    icon: FolderOpen,
    title: "Gestão Documental e Plataformas",
    tagline: "Conformidade em cada arquivo",
    desc: "Garantimos que toda a documentação da empresa e dos colaboradores permaneça organizada, atualizada e em conformidade com as exigências das construtoras e plataformas de integração.",
    items: ["Gestão de plataformas de integração documental", "Cadastro de empresas e colaboradores", "Controle documental trabalhista e previdenciário", "Integração em plataformas", "Regularização de pendências documentais"],
    Animation: DocAnimation,
    color: "#1A3D2B",
  },
  {
    key: "sst",
    icon: HardHat,
    title: "Segurança do Trabalho",
    tagline: "Proteção legal garantida",
    desc: "Organização e gerenciamento da documentação obrigatória de Saúde e Segurança do Trabalho, promovendo conformidade com a legislação vigente e com as exigências das contratantes.",
    items: ["Gestão de treinamentos obrigatórios (NRs)", "Controle de certificados e Fichas de EPI", "Gestão de PGR, PCMSO, LTCAT, ASO", "Ordens de Serviço e APR", "Intermediação com clínicas de Medicina Ocupacional"],
    Animation: ShieldAnimation,
    color: "#C49A2A",
  },
  {
    key: "dp",
    icon: Users,
    title: "Departamento Pessoal",
    tagline: "Processos trabalhistas em dia",
    desc: "Interface entre empresa, colaboradores, contabilidade e RH, garantindo que todos os processos trabalhistas ocorram de forma organizada e nos prazos legais.",
    items: ["Admissões e Demissões", "Transferências e Alterações contratuais", "Controle de férias e Afastamentos", "Folha de pagamento", "Encargos e Suporte documental ao RH"],
    Animation: PeopleAnimation,
    color: "#2D6A4F",
  },
  {
    key: "rh",
    icon: UserCheck,
    title: "Recursos Humanos",
    tagline: "Talentos certos, no tempo certo",
    desc: "Apoio desde a busca por profissionais qualificados até a administração dos benefícios oferecidos aos colaboradores — recrutamento estratégico para a Construção Civil.",
    items: ["Recrutamento e Seleção", "Pesquisa e triagem de candidatos", "Encaminhamento de profissionais", "Gestão de benefícios", "Plataformas: Swile, iFood, Flash, VR, Caju"],
    Animation: HRAnimation,
    color: "#C49A2A",
  },
];

const partners = [
  {
    name: "Advocacia",
    role: "Especialidade em suporte jurídico trabalhista e consultivo para obras e equipes.",
    image: "/src/assets/logo-avila-advogados.jpg",
    icon: "⚖️",
  },
  {
    name: "JF Segurança do Trabalho",
    role: "Segurança do trabalho, documentação técnica e apoio em conformidade operacional.",
    image: "/src/assets/JF.jpg",
    icon: "🦺",
  },
  {
    name: "Feitosa Contabilidade",
    role: "Contabilidade, organização fiscal e suporte para rotinas administrativas.",
    image: "/src/assets/Feitosa.png",
    icon: "📊",
  },
  {
    name: "Exato",
    role: "Plataforma de gestão de RH, pesquisa de candidatos e análise de antecedentes.",
    image: "/src/assets/Exato.png",
    icon: "🔍",
  },
];

const platforms = [
  { name: "Oracle", image: "/src/assets/oracle.png" },
  { name: "HABRAS", image: "/src/assets/HABRAS.webp" },
  { name: "Lumina", image: "/src/assets/lumina.png" },
  { name: "Cyrela", image: "/src/assets/Cyrela.svg" },
  { name: "Sercai", image: "/src/assets/sercai.png" },
  { name: "Siecon", image: "/src/assets/siecon.png" },
  { name: "Sienge", image: "/src/assets/sienge.svg" },
  { name: "Morar", image: "/src/assets/Morar.png" },
  { name: "BR Construtora", image: "/src/assets/BR.png" },
  { name: "Rede Brasil", image: "/src/assets/rede.webp" },
];

const testimonials = [
  { name: "Carlos Mendes", role: "Gestor de Obras", company: "Conselmar Engenharia", photo: "photo-1472099645785-5658abf4ff4e", stars: 5, text: "A JM Carvalho transformou nossa gestão documental. Antes levávamos semanas para regularizar colaboradores; agora é questão de dias. Indispensável para nossa operação." },
  { name: "Fernanda Rocha", role: "Diretora Administrativa", company: "DIASE Construções", photo: "photo-1580489944761-15a19d654956", stars: 5, text: "Excelência no atendimento e total domínio das plataformas de integração. Nossa documentação está sempre em dia graças à equipe da JM." },
  { name: "Ricardo Lima", role: "Sócio-Gerente", company: "GNS Engenharia", photo: "photo-1507003211169-0a1dd7228f2d", stars: 5, text: "Parceria sólida, transparente e de resultados. A gestão de SST que a JM entrega nos dá total segurança nas auditorias das construtoras contratantes." },
  { name: "Ana Paula Costa", role: "Coordenadora de RH", company: "Inova TS Engenharia", photo: "photo-1544005313-94ddf0286df2", stars: 5, text: "O recrutamento especializado para obras é diferenciado. Eles entendem o perfil exato que precisamos e entregam profissionais alinhados com rapidez." },
];

const obrasData = [
  { name: "Nestlé", sub: "Vargem, SC", domain: "nestle.com", image: "/assets/garotto.png", color: "#009BDE" },
  { name: "Nestlé", sub: "Montes Claros, MG", domain: "nestle.com", image: "/obras_realizadas/ObraNESTLESC.jpeg", color: "#009BDE" },
  { name: "Garotto", sub: "Vila Velha, ES", domain: "garotto.com.br", image: "/obras_realizadas/obraGarotto%20.jpg", color: "#8B0000" },
  { name: "UHE Estreito", sub: "GO", domain: null, color: "#1A3D2B" },
  { name: "Arauco Celulose", sub: "MS", domain: "arauco.com", color: "#2E7D32" },
  { name: "Acciona", sub: "Linha 6 Laranja, SP", domain: "acciona.com", color: "#E63900" },
  { name: "Metrocasa Prime", sub: "Sapopemba, SP", domain: null, color: "#1A237E" },
  { name: "ART Vila Mariana", sub: "Empreendimentos, SP", domain: null, color: "#4A148C" },
  { name: "VY2 Imobiliário", sub: "SP", domain: null, color: "#BF360C" },
  { name: "Moema JAZZ", sub: "Empreendimento, SP", domain: null, color: "#1B5E20" },
  { name: "Bio Metano", sub: "Caieiras, SP", domain: null, color: "#33691E" },
  { name: "JMS Empreendimentos", sub: "SP", domain: null, color: "#0D47A1" },
];

const trustMedia = [
  { name: "Nestlé", image: "/obras_realizadas/ObraNESTLESC.jpeg" },
  { name: "Garotto", image: "/obras_realizadas/obraGarotto .jpg" },
  { name: "Obra 1", image: "/obras_realizadas/pexels-gustavodenuncio-27743369.jpg" },
  { name: "Obra 2", image: "/obras_realizadas/pexels-kokorevas-20178416.jpg" },
];

const teamMembers = [
  { name: "Iris Carvalho", role: "Diretoria", phone: "(11) 97128-7399", photo: "photo-1573496359142-b8d87734a5a2" },
  { name: "Regina", role: "Time Comercial", phone: "(11) 96762-3482", photo: "photo-1551836022-deb4988cc6c0" },
  { name: "Aymê", role: "Análise de Docs. de Segurança do Trabalho", phone: "(11) 99907-0937", photo: "photo-1534528741775-53994a69daeb" },
  { name: "Michele", role: "Atendimento ao Cliente e Solicitações", phone: "(11) 999314-9544", photo: "photo-1438761681033-6461ffad8d80" },
];

const vagas = [
  { id: 1, title: "Eletricista Industrial", type: "CLT", location: "São Paulo, SP", area: "Instalações Elétricas", salary: "A combinar", desc: "Execução de instalações elétricas em obras industriais e comerciais. Necessário NR-10 e experiência mínima de 2 anos.", req: ["NR-10", "2 anos de experiência", "Ensino Médio"] },
  { id: 2, title: "Técnico de Segurança do Trabalho", type: "CLT", location: "São Paulo, SP", area: "SST", salary: "A combinar", desc: "Responsável pelo gerenciamento de documentação de SST, treinamentos NRs e acompanhamento em campo.", req: ["Curso Técnico em SST", "NR-35", "Experiência em obras"] },
  { id: 3, title: "Encanador / Instalador Hidráulico", type: "CLT", location: "Interior de SP", area: "Hidráulica", salary: "A combinar", desc: "Instalação de sistemas hidráulicos em obras residenciais e comerciais de médio e grande porte.", req: ["Experiência mínima 2 anos", "Disponibilidade para viagens"] },
  { id: 4, title: "Auxiliar Administrativo", type: "CLT", location: "São Paulo, SP", area: "Administrativo", salary: "A combinar", desc: "Suporte à gestão documental e departamento pessoal, controle de documentação trabalhista e plataformas.", req: ["Ensino Médio Completo", "Pacote Office", "Organização"] },
  { id: 5, title: "Mestre de Obras", type: "CLT", location: "Região Sudeste", area: "Gestão de Obras", salary: "A combinar", desc: "Coordenação de equipes em canteiro de obras, controle de produção, qualidade e prazos.", req: ["5+ anos de experiência", "Liderança comprovada", "Disponibilidade para viagens"] },
  { id: 6, title: "Analista de RH — Recrutamento", type: "CLT", location: "São Paulo, SP", area: "Recursos Humanos", salary: "A combinar", desc: "Recrutamento e seleção de mão de obra especializada para o setor de construção civil.", req: ["Superior em RH / Psicologia", "Experiência em R&S", "Conhecimento em construção civil"] },
];

// ─── Section primitives ──────────────────────────────────────────
function Sec({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`py-20 lg:py-28 px-6 lg:px-10 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}
function SecLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-accent text-xs tracking-[0.4em] uppercase font-semibold mb-4 flex items-center gap-3">
      <Ornament /> {children}
    </p>
  );
}
function SecTitle({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 className={`text-4xl lg:text-5xl font-bold leading-tight ${light ? "text-primary-foreground" : "text-primary"}`}
      style={{ fontFamily: "'Playfair Display', serif" }}>
      {children}
    </h2>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────
function Navbar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Quem Somos", href: "#quem-somos" },
    { label: "Soluções", href: "#solucoes" },
    { label: "Serviços", href: "#valores" },
    { label: "Clientes", href: "#clientes" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || page === "vagas" ? "bg-primary/97 backdrop-blur-sm shadow-lg shadow-black/20" : "bg-transparent"}`}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20 gap-4">
        {/* Logo */}
        <button onClick={() => setPage("home")} className="flex items-center gap-2 shrink-0">
          <span className="font-bold text-2xl leading-none" style={{ color: "#C49A2A", fontFamily: "'Playfair Display', serif" }}>JM</span>
          <span className="w-px h-6 bg-accent/40 mx-1" />
          <div className="flex flex-col leading-none">
            <span className="text-primary-foreground font-medium text-base" style={{ fontFamily: "'Playfair Display', serif" }}>Carvalho</span>
            <span className="text-accent/70 text-[8px] tracking-[0.25em] uppercase font-medium mt-0.5">Consultoria</span>
          </div>
        </button>

        {/* Desktop links */}
        {page === "home" && (
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} className="text-primary-foreground/70 hover:text-accent text-xs xl:text-sm tracking-wide uppercase font-medium transition-colors duration-200">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Right CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => { setPage("vagas"); window.scrollTo(0, 0); }}
            className={`flex items-center gap-2 border px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-colors ${page === "vagas" ? "border-accent bg-accent text-accent-foreground" : "border-accent/50 text-accent hover:bg-accent/10"}`}
          >
            <Briefcase size={13} /> Confira Nossas Vagas
          </button>
          <a href="#contato" onClick={() => setPage("home")} className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2 text-xs font-semibold tracking-wide uppercase hover:bg-accent/90 transition-colors">
            Fale Conosco
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-primary-foreground p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-primary border-t border-accent/20 px-6 pb-6 pt-2">
          {page === "home" && links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="flex items-center justify-between py-4 border-b border-primary-foreground/10 text-primary-foreground/80 hover:text-accent text-xs uppercase tracking-widest font-medium transition-colors">
              {l.label} <ChevronRight size={14} className="text-accent/50" />
            </a>
          ))}
          <button
            onClick={() => { setPage("vagas"); setOpen(false); window.scrollTo(0, 0); }}
            className="mt-4 w-full flex items-center justify-center gap-2 border border-accent/50 text-accent py-3 text-xs font-semibold tracking-widest uppercase"
          >
            <Briefcase size={13} /> Nossas Vagas
          </button>
          <a href="#contato" onClick={() => { setPage("home"); setOpen(false); }}
            className="mt-2 flex items-center justify-center gap-2 bg-accent text-accent-foreground px-5 py-3 font-semibold tracking-widest uppercase text-xs">
            Fale Conosco
          </a>
        </div>
      )}
    </header>
  );
}

// ─── VAGAS PAGE ───────────────────────────────────────────────────
function VagasPage({ onBack }: { onBack: () => void }) {
  const areaColors: Record<string, string> = {
    "Instalações Elétricas": "bg-yellow-100 text-yellow-800",
    "SST": "bg-green-100 text-green-800",
    "Hidráulica": "bg-blue-100 text-blue-800",
    "Administrativo": "bg-purple-100 text-purple-800",
    "Gestão de Obras": "bg-orange-100 text-orange-800",
    "Recursos Humanos": "bg-pink-100 text-pink-800",
  };
  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Banner */}
      <div className="bg-primary px-6 lg:px-10 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(to right, #C49A2A 1px, transparent 1px), linear-gradient(to bottom, #C49A2A 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-7xl mx-auto relative">
          <SecLabel>Oportunidades</SecLabel>
          <SecTitle light>Vagas <span className="text-accent italic">abertas.</span></SecTitle>
          <p className="mt-3 text-primary-foreground/60 max-w-xl">
            A JM Carvalho conecta profissionais qualificados às melhores obras e construtoras do Brasil. Confira nossas vagas e candidate-se.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {vagas.map(v => (
            <div key={v.id} className="bg-card border border-border hover:border-accent/40 hover:shadow-lg hover:shadow-primary/5 transition-all group flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${areaColors[v.area] ?? "bg-muted text-muted-foreground"}`}>
                      {v.area}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-foreground group-hover:text-primary transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {v.title}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-accent border border-accent/30 px-2 py-1 shrink-0">{v.type}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><MapPin size={11} /> {v.location}</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> Tempo integral</span>
                </div>
                <p className="text-sm text-foreground/60 leading-relaxed mb-4">{v.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {v.req.map(r => (
                    <span key={r} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded border border-border">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-border p-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Salário: {v.salary}</span>
                <a
                  href="mailto:adm@jmcarvalhoconsultoria.com.br"
                  className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Candidatar-se <ArrowRight size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 border border-accent/30 bg-accent/5 p-8 text-center">
          <p className="text-foreground/70 mb-2">Não encontrou sua área?</p>
          <p className="font-bold text-foreground mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Envie seu currículo e entraremos em contato.
          </p>
          <a href="mailto:adm@jmcarvalhoconsultoria.com.br"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 font-semibold uppercase tracking-wide text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
            <Mail size={14} /> Enviar Currículo
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── HERO (Video) ─────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay muted loop playsInline
        style={{ filter: "brightness(0.28) saturate(0.6)" }}
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-construction-workers-building-a-structure-1235-large.mp4" type="video/mp4" />
        <source src="https://videos.pexels.com/video-files/3048513/3048513-hd_1920_1080_25fps.mp4" type="video/mp4" />
      </video>

      {/* Gold bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(to right, #C49A2A 1px, transparent 1px), linear-gradient(to bottom, #C49A2A 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 grid lg:grid-cols-[1fr_auto] gap-16 items-center w-full">
        <div>
          <p className="text-accent text-xs tracking-[0.4em] uppercase font-semibold mb-8 flex items-center gap-3">
            <Ornament /> Gestão que Constrói Resultados
          </p>
          <h1 className="text-primary-foreground leading-[1.05] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-5xl lg:text-7xl xl:text-8xl font-bold">
              Nós cuidamos de toda a<br />
              <span className="text-accent italic">burocracia</span>
            </span>
            <span className="text-2xl lg:text-4xl font-bold block mt-4">
              para que sua equipe entre<br />
              na obra sem preocupações.
            </span>
          </h1>
          <div className="flex flex-wrap gap-4">
            <a href="#solucoes" className="inline-flex items-center gap-2.5 bg-accent text-accent-foreground px-7 py-4 font-semibold tracking-wide uppercase text-sm hover:bg-accent/90 transition-colors">
              Nossas Soluções <ArrowRight size={16} />
            </a>
            <a href="#contato" className="inline-flex items-center gap-2.5 border border-primary-foreground/20 text-primary-foreground/80 px-7 py-4 font-medium text-sm hover:border-accent hover:text-accent transition-colors uppercase tracking-wide">
              Fale Conosco
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="hidden lg:flex flex-col gap-4 min-w-[200px]">
          {[
            { n: "11+", label: "Empresas Parceiras" },
            { n: "20+", label: "Obras Atendidas" },
            { n: "4", label: "Pilares de Serviço" },
            { n: "100%", label: "Agilidade" },
          ].map(s => (
            <div key={s.label} className="border border-accent/20 p-5 text-right backdrop-blur-sm bg-black/20">
              <div className="text-4xl font-bold text-accent mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{s.n}</div>
              <div className="text-primary-foreground/50 text-xs tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── QUEM SOMOS ───────────────────────────────────────────────────
function QuemSomos() {
  const pillars = [{ icon: Users, label: "Especialização" }, { icon: CheckCircle2, label: "Organização" }, { icon: HardHat, label: "Conformidade" }, { icon: Handshake, label: "Confiança" }];
  return (
    <Sec id="quem-somos" className="bg-background">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <SecLabel>Quem Somos</SecLabel>
          <SecTitle>Conectamos pessoas,<br /><span className="text-accent italic">organizamos processos.</span></SecTitle>
          <div className="w-12 h-0.5 bg-accent mt-5 mb-7" />
          <div className="space-y-5 text-foreground/70 leading-relaxed">
            <p>Somos uma empresa especializada em <strong className="text-foreground font-semibold">recrutamento e seleção de mão de obra e gestão documental</strong> para o setor da Construção Civil, conectando profissionais qualificados às necessidades das empresas.</p>
            <p>Oferecemos <strong className="text-foreground font-semibold">soluções completas que otimizam processos, reduzem custos operacionais e garantem maior agilidade</strong> na gestão de pessoas — do recrutamento à conformidade documental.</p>
            <p>Nossa equipe atua com <em>seriedade, transparência e excelência</em>, identificando profissionais qualificados para diferentes funções dentro da Construção Civil.</p>
          </div>
          <blockquote className="mt-8 border-l-2 border-accent pl-6">
            <p className="text-foreground/80 italic text-lg leading-relaxed">"Conectamos pessoas, organizamos processos e construímos bases sólidas para o sucesso da sua obra."</p>
            <cite className="text-accent text-xs tracking-widest uppercase font-semibold mt-3 block">— Essa é a nossa essência.</cite>
          </blockquote>
        </div>
        <div>
          <div className="relative mb-8">
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop&auto=format" alt="Construção civil" className="w-full object-cover" style={{ height: 320 }} />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-primary-foreground text-sm font-medium">Uma gestão eficiente vai além da documentação.</p>
              <p className="text-accent/90 text-xs mt-1">Ela conecta pessoas, processos e conformidade.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {pillars.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 border border-border p-4 hover:border-accent/50 hover:bg-secondary/50 transition-all group">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors">
                  <Icon size={16} className="text-primary-foreground group-hover:text-accent-foreground transition-colors" />
                </div>
                <span className="text-sm font-semibold tracking-wide text-foreground/80 uppercase">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Sec>
  );
}

// ─── SOLUÇÕES (animated tabs) ─────────────────────────────────────
function Solucoes() {
  const [active, setActive] = useState(0);
  const svc = services[active];
  const Anim = svc.Animation;

  return (
    <Sec id="solucoes" className="bg-secondary/40">
      <SecLabel>Nossas Soluções</SecLabel>
      <SecTitle>Um portfólio completo <br /><span className="text-accent italic">para sua operação.</span></SecTitle>
      <p className="mt-4 text-foreground/60 max-w-2xl leading-relaxed">Gestão completa de documentos trabalhistas, segurança do trabalho e mobilização de colaboradores para obras de qualquer porte.</p>

      {/* Tab row */}
      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-2">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <button key={s.key} onClick={() => setActive(i)}
              className={`flex flex-col items-start gap-2 p-4 border text-left transition-all ${active === i ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-foreground/60 hover:border-accent/40 hover:text-foreground"}`}>
              <Icon size={18} className={active === i ? "text-accent" : ""} />
              <span className="text-xs font-semibold leading-snug">{s.title}</span>
              {active === i && <span className="text-[10px] text-accent/80 tracking-wide">{s.tagline}</span>}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-3 grid lg:grid-cols-2 gap-0 border border-border bg-card overflow-hidden"
      >
        {/* Left: illustration */}
        <div className="bg-secondary/60 border-r border-border p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: svc.color }}>
              <svc.icon size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{svc.title}</h3>
              <span className="text-accent text-xs tracking-wide font-semibold">{svc.tagline}</span>
            </div>
          </div>
          <Anim />
        </div>

        {/* Right: content */}
        <div className="p-8">
          <p className="text-foreground/60 leading-relaxed mb-6">{svc.desc}</p>
          <div className="w-8 h-0.5 bg-accent mb-5" />
          <ul className="space-y-3">
            {svc.items.map(item => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/70">
                <CheckCircle2 size={15} className="text-accent mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a href="#contato" className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-accent hover:text-accent-foreground transition-colors">
            Solicitar Serviço <ArrowRight size={14} />
          </a>
        </div>
      </motion.div>
    </Sec>
  );
}

// ─── VALORES (modern) ─────────────────────────────────────────────
const valuesData = [
  { n: "01", key: "Chega de Atrasos", icon: Clock, desc: "Entramos em ação para que seus colaboradores tenham toda a documentação exigida antes do início das atividades.", accent: "from-accent/20 to-transparent" },
  { n: "02", key: "Nada de Documentos Vencidos", icon: FileText, desc: "Monitoramos prazos e atualizações para manter sua empresa sempre em conformidade.", accent: "from-primary/20 to-transparent" },
  { n: "03", key: "Sem Problemas com RH", icon: Users, desc: "Assumimos a gestão documental para que sua equipe tenha mais tempo para focar no negócio.", accent: "from-accent/20 to-transparent" },
  { n: "04", key: "Evite Multas", icon: Shield, desc: "Garantimos que a documentação esteja organizada conforme as exigências legais e contratuais.", accent: "from-primary/20 to-transparent" },
  { n: "05", key: "Rapidez", icon: Target, desc: "Processos rápidos para atender obras de curto, médio e longo prazo.", accent: "from-accent/20 to-transparent" },
  { n: "06", key: "Resolvemos Tudo", icon: CheckCircle2, desc: "Centralizamos a gestão documental, segurança do trabalho e apoio ao RH em um único serviço.", accent: "from-primary/20 to-transparent" },
];

function Valores() {
  const [active, setActive] = useState(0);
  const val = valuesData[active];

  const mvv = [
    { icon: Target, title: "Nossa Missão", text: "Ser uma parceira estratégica para empresas da Construção Civil, oferecendo soluções completas em gestão documental, administrativa e operacional." },
    { icon: Eye, title: "Nossa Visão", text: "Ser reconhecida como referência em consultoria e gestão documental para o setor da construção civil, pela excelência e confiança construída em cada parceria." },
    { icon: Diamond, title: "Nosso Compromisso", text: "Assumimos cada projeto com dedicação e responsabilidade, buscando sempre atender às necessidades de nossos clientes com excelência do início ao fim." },
  ];

  return (
    <section id="valores" className="bg-primary">
      {/* MVV top */}
      <div className="py-20 lg:py-24 px-6 lg:px-10 border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto">
          <SecLabel>Missão, Visão e Compromisso</SecLabel>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {mvv.map(({ icon: Icon, title, text }) => (
              <div key={title} className="group p-7 border border-primary-foreground/10 hover:border-accent/40 transition-colors">
                <div className="w-11 h-11 rounded-full border border-accent/30 flex items-center justify-center mb-5 group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                  <Icon size={20} className="text-accent" />
                </div>
                <h3 className="text-lg font-bold text-primary-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
                <p className="text-primary-foreground/50 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values interactive */}
      <div className="py-20 lg:py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <SecLabel>Nossos Serviços </SecLabel>
          <SecTitle light>Soluções que facilitam <span className="text-accent italic">sua operação.</span></SecTitle>

          <div className="mt-12 grid lg:grid-cols-[280px_1fr] gap-4">
            {/* Value selector */}
            <div className="flex lg:flex-col gap-2 flex-wrap">
              {valuesData.map((v, i) => (
                <button key={v.key} onClick={() => setActive(i)}
                  className={`flex items-center gap-3 px-4 py-3 text-left text-sm font-semibold transition-all border ${active === i ? "bg-accent text-accent-foreground border-accent" : "border-primary-foreground/10 text-primary-foreground/50 hover:border-accent/30 hover:text-primary-foreground"}`}>
                  <span className={`text-xs font-mono ${active === i ? "text-accent-foreground/60" : "text-accent/40"}`}>{v.n}</span>
                  <span className="hidden sm:block">{v.key}</span>
                </button>
              ))}
            </div>

            {/* Value panel */}
            <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
              className="border border-primary-foreground/10 p-8 lg:p-12 relative overflow-hidden">
              {/* Big background number */}
              <div className="absolute top-4 right-6 text-[10rem] font-bold leading-none text-primary-foreground/5 select-none pointer-events-none"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {val.n}
              </div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                    <val.icon size={26} className="text-accent" />
                  </div>
                  <div>
                    <span className="text-accent text-xs tracking-widest uppercase font-semibold">Valor {val.n}</span>
                    <h3 className="text-3xl font-bold text-primary-foreground mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>{val.key}</h3>
                  </div>
                </div>
                <p className="text-primary-foreground/60 text-lg leading-relaxed max-w-2xl">{val.desc}</p>
                {/* Progress dots */}
                <div className="flex gap-2 mt-10">
                  {valuesData.map((_, i) => (
                    <button key={i} onClick={() => setActive(i)}
                      className={`h-1 rounded-full transition-all ${active === i ? "bg-accent w-8" : "bg-primary-foreground/20 w-4 hover:bg-primary-foreground/40"}`} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PARCERIAS ─────────────────────────────────────────────────────
function Parcerias() {
  return (
    <Sec id="parcerias" className="bg-background">
      <SecLabel>Parcerias e Tecnologia</SecLabel>
      <SecTitle>Resultados que nascem da <span className="text-accent italic">união certa.</span></SecTitle>
      <p className="mt-4 text-foreground/60 max-w-2xl leading-relaxed">Contamos com parceiros especializados e dominamos plataformas que garantem mais eficiência, segurança e precisão em cada etapa do trabalho.</p>

      <div className="mt-12 flex flex-col gap-10">
        {/* Partners (infinite carousel) */}
        <div>
          <h3 className="text-xs tracking-[0.3em] uppercase font-bold text-foreground/40 mb-6 flex items-center gap-3"><Ornament /> Parceiros Estratégicos</h3>
          <div className="marquee-viewport">
            <div className="marquee py-2">
              {partners.concat(partners).map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="flex items-stretch gap-4 min-w-[340px] max-w-[340px]"
                >
                  <div className="shrink-0 flex items-center justify-center w-28 h-28 rounded-2xl border border-primary/30 bg-primary/15 backdrop-blur-sm">
                    <LogoImg image={p.image} name={p.name} size={76} />
                  </div>
                  <div className="flex-1 rounded-2xl border border-border/70 bg-card/80 px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">{p.icon}</span>
                      <div className="font-bold text-foreground text-sm leading-tight">{p.name}</div>
                    </div>
                    <p className="text-xs leading-relaxed text-foreground/65">{p.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platforms */}
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-primary p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(196,154,42,0.16),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_32%)]" />

          <div className="relative mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-xs tracking-[0.3em] uppercase font-bold text-primary-foreground/70 mb-3 flex items-center gap-3">
                <Ornament /> Plataformas que Dominamos
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-primary-foreground/75">
                Sistemas e soluções que apoiam nossa operação com agilidade, controle e integração.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-accent/25 bg-accent/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary-foreground">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse shadow-[0_0_14px_rgba(196,154,42,0.85)]" />
              {platforms.length} plataformas
            </div>
          </div>

          <div className="relative grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
            {platforms.map(p => (
              <div
                key={p.name}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/8 px-4 py-5 sm:px-5 sm:py-6 flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/12"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-40" />
                <LogoImg image={p.image} name={p.name} size={58} />
                <div className="text-center">
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.24em] uppercase text-primary-foreground/85">
                    Plataforma
                  </span>
                  <div className="mt-3 text-sm font-bold tracking-[0.18em] uppercase text-primary-foreground group-hover:text-white transition-colors">
                    {p.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="relative mt-5 text-xs text-foreground/40 italic">
            Parcerias sólidas e tecnologia de ponta para entregar soluções confiáveis.
          </p>
        </div>
      </div>
    </Sec>
  );
}

// ─── AVALIAÇÕES ─────────────────────────────────────────────────
function Avaliacoes() {
  const [idx, setIdx] = useState(0);
  const n = testimonials.length;
  const prev = () => setIdx(i => (i - 1 + n) % n);
  const next = () => setIdx(i => (i + 1) % n);
  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <Sec className="bg-secondary/50">
      <SecLabel>Avaliações</SecLabel>
      <SecTitle>O que dizem nossos <span className="text-accent italic">clientes.</span></SecTitle>

      <div className="mt-10 relative">
        {/* Cards row */}
        <div className="grid md:grid-cols-3 gap-5">
          {[0, 1, 2].map(offset => {
            const t = testimonials[(idx + offset) % n];
            return (
              <motion.div key={`${idx}-${offset}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: offset * 0.1 }}
                className={`bg-card border p-6 flex flex-col transition-all ${offset === 0 ? "border-accent/40 shadow-lg shadow-primary/5" : "border-border opacity-80"}`}>
                {/* Stars */}
                <div className="mb-4"><Stars n={t.stars} /></div>
                {/* Quote */}
                <p className="text-foreground/70 text-sm leading-relaxed flex-1 italic mb-5">
                  "{t.text}"
                </p>
                {/* Author */}
                <div className="flex items-center gap-3 border-t border-border pt-4">
                  <img
                    src={`https://images.unsplash.com/${t.photo}?w=80&h=80&fit=crop&auto=format&q=80`}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover flex-shrink-0 border-2 border-accent/30"
                  />
                  <div>
                    <div className="font-bold text-foreground text-sm">{t.name}</div>
                    <div className="text-accent text-xs">{t.role}</div>
                    <div className="text-muted-foreground text-xs">{t.company}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        {/* Controls */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className={`h-1 rounded-full transition-all ${idx === i ? "bg-accent w-8" : "bg-border w-4 hover:bg-muted-foreground"}`} />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="w-9 h-9 border border-border hover:border-accent/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} className="w-9 h-9 border border-border hover:border-accent/40 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </Sec>
  );
}

// ─── OBRAS CAROUSEL ───────────────────────────────────────────────
function ObraCard({ obra }: { obra: typeof obrasData[0] }) {
  return (
    <div className="flex-shrink-0 w-60 bg-card border border-border hover:border-accent/40 p-5 flex flex-col gap-3 group transition-all hover:shadow-md">
        <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 overflow-hidden border border-border group-hover:border-accent/30 transition-colors">
          <LogoImg image={(obra as any).image} domain={obra.domain ?? undefined} name={obra.name} size={48} />
        </div>
        <div>
          <div className="font-bold text-foreground text-sm leading-tight">{obra.name}</div>
          <div className="text-accent text-xs mt-0.5 flex items-center gap-1">
            <MapPin size={10} /> {obra.sub}
          </div>
        </div>
      </div>
      <div className="h-0.5 w-full rounded-full" style={{ background: `linear-gradient(to right, ${obra.color}40, transparent)` }} />
      <div className="flex items-center gap-1.5">
        <CheckCircle2 size={12} className="text-accent" />
        <span className="text-xs text-muted-foreground">Atendimento concluído</span>
      </div>
    </div>
  );
}

function ClientesCarousel() {
  const doubled = [...obrasData, ...obrasData];
  return (
    <Sec id="clientes" className="bg-background overflow-hidden">
      <SecLabel>Resultados que Constroem Confiança</SecLabel>
      <SecTitle>Quem confia na <span className="text-accent italic">JM Carvalho.</span></SecTitle>
      <p className="mt-4 text-foreground/60 max-w-2xl">Cada parceria reflete nosso compromisso com a excelência, a organização e a entrega de soluções eficientes.</p>

      {/* Trust media strip */}
      <div className="mt-10 rounded-[2rem] border border-border/70 bg-card/70 p-5 sm:p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4 mb-5">
          <p className="text-xs tracking-[0.3em] uppercase font-bold text-foreground/40 flex items-center gap-3">
            <Ornament /> Marcas e imagens de confiança
          </p>
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/70">
            mídia de apoio
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trustMedia.map(item => (
            <div key={item.name} className="group overflow-hidden rounded-2xl border border-border/70 bg-background/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent" />
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <div>
                  <div className="text-sm font-bold text-foreground">{item.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.24em] text-foreground/40">Quem confia na JM</div>
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_rgba(196,154,42,0.7)]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite carousel */}
      <div className="mt-10 -mx-6 lg:-mx-10 overflow-hidden">
        <div
          className="flex gap-4 px-6"
          style={{ animation: "slide-left 28s linear infinite", width: "max-content" }}
        >
          {doubled.map((obra, i) => <ObraCard key={i} obra={obra} />)}
        </div>
      </div>

      {/* Companies grid below */}
      <div className="mt-10 border-t border-border pt-10">
        <p className="text-xs tracking-[0.3em] uppercase font-bold text-foreground/40 mb-6 flex items-center gap-3"><Ornament /> Empresas Parceiras</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {["C.A.R Instalações Hidráulicas Ltda", "Conselmar Engenharia e Construções Ltda", "DAS Instalações Elétricas e Hidráulicas Ltda", "DIASE Construções Ltda", "Elletro Ramalho Instalação e Manutenção", "FGR Instalações Elétricas e Hidráulicas Ltda", "GNS Engenharia de Instalações Ltda", "Impakto Serviços Elétricos e Hidráulicos Ltda", "Inova TS Engenharia e Construções Ltda", "Zait Engenharia Ltda"].map(e => (
            <div key={e} className="flex items-center gap-2.5 text-sm text-foreground/60 hover:text-foreground transition-colors p-2">
              <div className="w-1 h-4 bg-accent/50 flex-shrink-0" /> {e}
            </div>
          ))}
        </div>
      </div>
    </Sec>
  );
}

// ─── QUOTE SECTION ────────────────────────────────────────────────
function QuoteSection() {
  return (
    <div className="bg-foreground py-24 px-6 text-center relative overflow-hidden">
      {/* Giant background quote mark */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(200px, 30vw, 400px)", lineHeight: 1, color: "rgba(196,154,42,0.04)", fontWeight: 900 }}
        aria-hidden
      >
        "
      </div>
      <div className="relative max-w-3xl mx-auto">
        <Ornament className="text-2xl mb-6 block" />
        <blockquote>
          <p
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "A excelência não é um ato, mas um hábito."
          </p>
          <cite className="text-accent text-sm tracking-[0.4em] uppercase font-bold not-italic">— Aristóteles</cite>
        </blockquote>
        <div className="mt-8 text-primary-foreground/40 text-sm max-w-xl mx-auto leading-relaxed">
          Seguiremos ao lado da sua empresa, transformando desafios em oportunidades e construindo, juntos, um futuro sólido e de grandes conquistas.
        </div>
        <p className="mt-6 text-accent/60 text-xs tracking-[0.5em] uppercase font-semibold">
          CONFIANÇA PARA GERENCIAR · EXCELÊNCIA PARA ENTREGAR
        </p>
      </div>
    </div>
  );
}

// ─── CONTATO ──────────────────────────────────────────────────────
function Contato() {
  return (
    <section id="contato" className="bg-primary">
      {/* Team cards */}
      <div className="py-20 lg:py-24 px-6 lg:px-10 border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto">
          <SecLabel>Nossa Equipe</SecLabel>
          <SecTitle light>Pessoas que fazem a <span className="text-accent italic">diferença.</span></SecTitle>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {teamMembers.map((m, i) => (
              <motion.div key={m.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group border border-primary-foreground/10 hover:border-accent/40 transition-all overflow-hidden"
              >
                {/* Photo */}
                <div className="relative overflow-hidden" style={{ height: 220 }}>
                  <img
                    src={`https://images.unsplash.com/${m.photo}?w=400&h=450&fit=crop&auto=format&q=80`}
                    alt={m.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                  {/* Gold accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
                {/* Info */}
                <div className="p-5">
                  <h4 className="font-bold text-primary-foreground text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{m.name}</h4>
                  <p className="text-accent text-xs tracking-wide mt-1 mb-4 leading-snug">{m.role}</p>
                  <a
                    href={`https://wa.me/55${m.phone.replace(/\D/g, "")}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary-foreground/50 hover:text-accent transition-colors text-sm"
                  >
                    <Phone size={13} /> {m.phone}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact info + Map */}
      <div className="py-20 lg:py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <SecLabel>Fale Conosco</SecLabel>
            <SecTitle light>Conte com a <span className="text-accent italic">JM Carvalho.</span></SecTitle>
            <p className="mt-4 text-primary-foreground/60 leading-relaxed mb-8">
              Mais do que executar documentos, atuamos como parceiros estratégicos na gestão administrativa, documental e operacional das empresas.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 border border-primary-foreground/10 hover:border-accent/30 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <Mail size={16} className="text-accent" />
                </div>
                <div>
                  <div className="text-primary-foreground/40 text-xs tracking-widest uppercase mb-1.5">E-mails</div>
                  <a href="mailto:iris@jmcarvalhoconsultoria.com.br" className="text-primary-foreground/80 text-sm hover:text-accent transition-colors block">iris@jmcarvalhoconsultoria.com.br</a>
                  <a href="mailto:adm@jmcarvalhoconsultoria.com.br" className="text-primary-foreground/60 text-sm hover:text-accent transition-colors block mt-0.5">adm@jmcarvalhoconsultoria.com.br</a>
                  <p className="text-primary-foreground/30 text-xs mt-1">No assunto, informe a solicitação.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-primary-foreground/10 hover:border-accent/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-accent" />
                </div>
                <div>
                  <div className="text-primary-foreground/40 text-xs tracking-widest uppercase mb-1.5">Atendimento</div>
                  <div className="text-primary-foreground/80 text-sm">Segunda a Sexta — Horário Comercial</div>
                  <div className="text-primary-foreground/40 text-xs mt-1">Emergências sujeitas à taxa de imprevistos</div>
                </div>
              </div>
            </div>

            <a href="mailto:iris@jmcarvalhoconsultoria.com.br"
              className="mt-7 inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 text-sm font-semibold tracking-wide uppercase hover:bg-accent/90 transition-colors">
              Enviar E-mail <ArrowRight size={14} />
            </a>
          </div>

          {/* Right — Google Maps */}
          <div>
            <div className="border border-primary-foreground/10 overflow-hidden">
              <div className="bg-primary-foreground/5 px-4 py-3 border-b border-primary-foreground/10 flex items-center gap-2">
                <MapPin size={14} className="text-accent" />
                <span className="text-primary-foreground/60 text-xs tracking-wide">São Paulo, SP — Área de Atuação</span>
              </div>
              <iframe
                title="JM Carvalho Consultoria - São Paulo"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467492.6750433819!2d-46.92498540879766!3d-23.681876476499547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2sSão%20Paulo%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1720000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="320"
                style={{ border: 0, filter: "grayscale(30%) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-3 text-primary-foreground/30 text-xs text-center">
              Atendemos obras e empresas em todo o Brasil
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────
function Footer({ setPage }: { setPage: (p: string) => void }) {
  return (
    <footer className="bg-foreground text-primary-foreground/50 py-10 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-xl text-accent" style={{ fontFamily: "'Playfair Display', serif" }}>JM</span>
              <span className="w-px h-5 bg-accent/30 mx-1" />
              <span className="text-primary-foreground/80 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>Carvalho</span>
              <span className="text-accent/50 text-[8px] tracking-[0.25em] uppercase ml-1">Consultoria</span>
            </div>
            <p className="text-xs tracking-widest uppercase text-primary-foreground/30">Gestão que Constrói Resultados.</p>
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <a href="mailto:iris@jmcarvalhoconsultoria.com.br" className="hover:text-accent transition-colors">iris@jmcarvalhoconsultoria.com.br</a>
            <a href="mailto:adm@jmcarvalhoconsultoria.com.br" className="hover:text-accent transition-colors">adm@jmcarvalhoconsultoria.com.br</a>
            <button onClick={() => { setPage("vagas"); window.scrollTo(0, 0); }}
              className="flex items-center gap-2 text-accent/70 hover:text-accent transition-colors mt-1">
              <Briefcase size={12} /> Ver vagas abertas
            </button>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-primary-foreground/5 text-center text-xs text-primary-foreground/20">
          © {new Date().getFullYear()} JM Carvalho Consultoria. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <GlobalStyles />
      <Navbar page={page} setPage={setPage} />
      {page === "vagas" ? (
        <VagasPage onBack={() => setPage("home")} />
      ) : (
        <>
          <Hero />
          <QuemSomos />
          <Solucoes />
          <Valores />
          <Parcerias />
          <Avaliacoes />
          <ClientesCarousel />
          <QuoteSection />
          <Contato />
        </>
      )}
      <Footer setPage={setPage} />
    </div>
  );
}
