import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  BookOpen,
  Clock,
  ArrowRight,
  X,
  ChevronRight,
  Check,
  Award,
  ExternalLink,
  Type,
  Sun,
  Moon,
  Copy,
  ZoomIn,
  Crop,
  FolderPlus,
  Archive,
  Monitor,
  Figma,
  FileSpreadsheet,
  AlertCircle,
  HelpCircle,
  FileText,
  Download
} from "lucide-react";
import { guidesData } from "./data";
import { Guide } from "./types";
import GuideSimulator from "./components/GuideSimulator";

// Helper to resolve icon name dynamically to its React Component
function getGuideIcon(iconName: string) {
  switch (iconName) {
    case "Copy":
      return <Copy className="w-5 h-5 text-indigo-500" />;
    case "ZoomIn":
      return <ZoomIn className="w-5 h-5 text-teal-500" />;
    case "Crop":
      return <Crop className="w-5 h-5 text-amber-500" />;
    case "FolderPlus":
      return <FolderPlus className="w-5 h-5 text-sky-500" />;
    case "Archive":
      return <Archive className="w-5 h-5 text-orange-500" />;
    case "Monitor":
      return <Monitor className="w-5 h-5 text-blue-500" />;
    case "Figma":
      return <Figma className="w-5 h-5 text-pink-500" />;
    case "FileSpreadsheet":
      return <FileSpreadsheet className="w-5 h-5 text-emerald-500" />;
    default:
      return <BookOpen className="w-5 h-5 text-stone-500" />;
  }
}

export default function App() {
  const [activeGuideId, setActiveGuideId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "rapido" | "manual">("all");
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Apply dark class to document context
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Load saved theme if any
  useEffect(() => {
    const savedTheme = localStorage.getItem("tema");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  const handleToggleTheme = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    localStorage.setItem("tema", nextMode ? "dark" : "light");
  };

  // Get active guide details
  const activeGuide = guidesData.find(g => g.id === activeGuideId);

  // Filter guides based on search query and selected tab category
  const filteredGuides = guidesData.filter(guide => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Typography size map for main fonts (scaled up for enhanced accessibility)
  const getFontSizeClass = (element: "title" | "body" | "heading") => {
    if (element === "title") {
      switch (fontSize) {
        case "small": return "text-3xl md:text-4xl font-extrabold";
        case "medium": return "text-4xl md:text-5xl font-extrabold";
        case "large": return "text-5xl md:text-6xl font-extrabold";
      }
    }
    if (element === "heading") {
      switch (fontSize) {
        case "small": return "text-xl md:text-2xl font-bold";
        case "medium": return "text-2xl md:text-3xl font-bold";
        case "large": return "text-3xl md:text-4xl font-bold";
      }
    }
    // Body text sizing
    switch (fontSize) {
      case "small": return "text-sm md:text-base font-normal";
      case "medium": return "text-base md:text-lg font-normal";
      case "large": return "text-lg md:text-xl font-normal";
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? "dark bg-stone-900 text-stone-100" : "bg-stone-50 text-stone-950"}`}>
      
      {/* Top Navbar Header */}
      <header className="border-b border-stone-200/80 dark:border-stone-800/80 bg-white/70 dark:bg-stone-900/70 backdrop-blur sticky top-0 z-30 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Student branding */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold tracking-tight text-lg text-stone-900 dark:text-white">
                  Inclusão & Tecnologia
                </span>
                <span className="hidden sm:inline-block bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-900">
                  7° Semestre
                </span>
              </div>
              <span className="text-[10px] text-stone-500 font-medium font-mono leading-none">
                Projeto Acadêmico • Cruzeiro do Sul
              </span>
            </div>
          </div>

          {/* Quick Action Controls for Zoom / Theme */}
          <div className="flex items-center gap-3">
            
            {/* Custom Sizing Controller */}
            <div className="flex items-center bg-stone-100 dark:bg-stone-850 p-1 rounded-lg border border-stone-200 dark:border-stone-800">
              <button
                onClick={() => setFontSize("small")}
                className={`p-1 px-2 rounded text-xs font-semibold font-mono transition-all ${
                  fontSize === "small"
                    ? "bg-white dark:bg-stone-750 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-stone-500 dark:text-stone-400 hover:text-stone-800"
                }`}
                title="Letra Pequena"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize("medium")}
                className={`p-1 px-2 rounded text-xs font-semibold font-mono transition-all ${
                  fontSize === "medium"
                    ? "bg-white dark:bg-stone-750 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-stone-500 dark:text-stone-400 hover:text-stone-800"
                }`}
                title="Letra Normal"
              >
                A
              </button>
              <button
                onClick={() => setFontSize("large")}
                className={`p-1 px-2 rounded text-xs font-semibold font-mono transition-all ${
                  fontSize === "large"
                    ? "bg-white dark:bg-stone-750 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-stone-500 dark:text-stone-400 hover:text-stone-800"
                }`}
                title="Letra Grande"
              >
                A+
              </button>
            </div>

            {/* Dark Mode Switch */}
            <button
              onClick={handleToggleTheme}
              className="p-2 rounded-lg bg-stone-100 dark:bg-stone-850 hover:bg-stone-200 dark:hover:bg-stone-750 text-stone-600 dark:text-stone-300 transition-colors border border-stone-200 dark:border-stone-800"
              aria-label="Alternar Tema"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Hero Welcome Unit */}
      <section className="relative overflow-hidden py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern decorative floating academic badge */}
        <div className="absolute -top-4 -right-16 w-56 h-56 bg-indigo-500/5 blur-3xl rounded-full"></div>
        <div className="absolute bottom-4 -left-16 w-56 h-56 bg-teal-500/5 blur-3xl rounded-full"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-800 dark:text-indigo-300 font-mono text-[11px] font-semibold border border-indigo-100 dark:border-indigo-900/60 shadow-sm">
            <Award className="w-3.5 h-3.5 text-indigo-500" />
            <span>Avaliação do 7° Semestre</span>
          </div>

          <h1 className={`${getFontSizeClass("title")} font-display font-extrabold tracking-tight text-stone-900 dark:text-white leading-tight`}>
            Descomplique o Computador
          </h1>
          
          <p className={`${getFontSizeClass("body")} text-stone-855 dark:text-stone-250 max-w-2xl mx-auto font-medium leading-relaxed`}>
            Nós acreditamos que a tecnologia deve ser acessível para todos, independentemente da idade ou experiência. 
            Esqueça explicações confusas ou aplicativos pagos. Criamos guias rápidos e interativos sobre as tarefas digitais mais comuns do dia a dia.
          </p>

          <div className="pt-2 flex flex-wrap gap-3 justify-center text-xs font-mono">
            <span className="bg-stone-200/60 dark:bg-stone-800 text-stone-800 dark:text-stone-200 px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-700 font-bold">
              ✓ 100% Gratuito
            </span>
            <span className="bg-stone-200/60 dark:bg-stone-800 text-stone-800 dark:text-stone-200 px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-700 font-bold">
              ✓ Simuladores Ativos
            </span>
            <span className="bg-indigo-100/80 dark:bg-stone-800 text-indigo-900 dark:text-stone-100 px-3 py-1.5 rounded-md border border-indigo-200 dark:border-stone-700 font-extrabold">
              🎓 7° Semestre Acadêmico
            </span>
          </div>
        </div>
      </section>

      {/* Main Tools / Guidelines index */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Filtering & Live Search Controls */}
        <div className="bg-white dark:bg-stone-850 p-4 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between mb-8 transition-colors">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-900 p-1 rounded-lg border border-stone-250 dark:border-stone-800 w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs font-bold"
                  : "text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
              }`}
            >
              Todos os Guias
            </button>
            <button
              onClick={() => setSelectedCategory("rapido")}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === "rapido"
                  ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs font-bold"
                  : "text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
              }`}
            >
              Guias Rápidos (1 Pág)
            </button>
            <button
              onClick={() => setSelectedCategory("manual")}
              className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === "manual"
                  ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs font-bold"
                  : "text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200"
              }`}
            >
              Manuais e Sistemas
            </button>
          </div>

          {/* Search bar input elements */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 dark:text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pesquisar guias (ex: 'pasta', 'zoom')..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg pl-10 pr-4 py-2 text-xs text-stone-800 dark:text-white placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Dynamic Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGuides.map((guide) => (
              <motion.div
                key={guide.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="bg-white dark:bg-stone-850 rounded-xl border border-stone-200/80 dark:border-stone-800/80 p-5 hover:border-stone-350 dark:hover:border-stone-700 transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.03)] cursor-pointer group flex flex-col justify-between"
                onClick={() => {
                  setActiveGuideId(guide.id);
                  setActiveStepIndex(0);
                }}
              >
                <div>
                  
                  {/* Category badging */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold font-mono uppercase tracking-wider ${
                      guide.category === "rapido"
                        ? "bg-blue-1050/10 dark:bg-blue-950/40 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60"
                        : "bg-teal-1050/10 dark:bg-teal-950/40 text-teal-800 dark:text-teal-400 border border-teal-200 dark:border-teal-900/60"
                    }`}>
                      {guide.category === "rapido" ? "Guia Rápido" : "Manual"}
                    </span>
                    
                    <div className="flex items-center gap-2 text-[11px] font-mono text-stone-700 dark:text-stone-300 font-bold">
                      <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-450" />
                      <span>{guide.timeToRead}</span>
                    </div>
                  </div>

                  {/* Header visual icon + Title */}
                  <div className="flex items-start gap-3 mt-1.5">
                    <div className="p-2.5 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 transition-colors">
                      {getGuideIcon(guide.iconName)}
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-stone-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight text-lg sm:text-xl">
                        {guide.title}
                      </h3>
                      <p className="text-xs text-stone-700 dark:text-stone-300 italic font-medium leading-relaxed">
                        {guide.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Body description */}
                  <p className="text-sm text-stone-800 dark:text-stone-200 mt-4 leading-relaxed font-normal">
                    {guide.description}
                  </p>
                </div>

                {/* Card footer details and click call */}
                <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-stone-600 dark:text-stone-400 uppercase tracking-wider font-mono font-bold">Dificuldade:</span>
                    <span className={`text-[11px] font-mono uppercase tracking-wider px-1.5 rounded font-extrabold ${
                      guide.difficulty === "Fácil"
                        ? "text-emerald-700 dark:text-emerald-400"
                        : guide.difficulty === "Médio"
                        ? "text-amber-700 dark:text-amber-400"
                        : "text-rose-700 dark:text-rose-400"
                    }`}>
                      {guide.difficulty}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform bg-indigo-50 dark:bg-stone-900 px-2.5 py-1 rounded-md border border-indigo-100 dark:border-stone-800 shadow-xs">
                    <span>Acessar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>

          {filteredGuides.length === 0 && (
            <div className="col-span-full bg-white dark:bg-stone-850 p-12 text-center rounded-xl border border-stone-200 border-dashed dark:border-stone-800 text-stone-500">
              <AlertCircle className="w-10 h-10 text-stone-400 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-stone-800 dark:text-white">Nenhum guia encontrado</h4>
              <p className="text-xs mt-1 text-stone-500 max-w-sm mx-auto">
                Tente redefinir a busca ou selecione outra categoria de listagem acima.
              </p>
            </div>
          )}
        </div>

        {/* Minimalist Review Call & Link to Google Form */}
        <section className="mt-16 bg-[#007bff]/5 dark:bg-blue-950/20 border border-blue-100/60 dark:border-blue-900/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden transition-colors">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display font-extrabold text-stone-900 dark:text-white text-lg md:text-xl">
              Sua avaliação ajuda nosso projeto acadêmico!
            </h3>
            <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300 max-w-md font-light leading-relaxed">
              Desenvolvemos este site minimalista para simplificar a informática no <strong>7° Semestre</strong>. Acesse o formulário de feedback do Google para avaliar o site.
            </p>
          </div>

          <a
            href="https://forms.gle/TRDfSQQNTsBEixcR6"
            target="_blank"
            rel="noreferrer"
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-[#007bff] hover:bg-[#0056b3] text-white text-xs font-bold font-mono uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
          >
            <span>Avaliar Projeto Acadêmico</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </section>

      </main>

      {/* Footer copyright section */}
      <footer className="border-t border-stone-200 dark:border-stone-850 py-8 bg-stone-100 dark:bg-stone-950 text-stone-500 text-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          
          <div className="flex justify-center items-center gap-1 flex-wrap text-stone-600 dark:text-stone-400 font-medium">
            <span>Inclusão & Tecnologia</span>
            <span>•</span>
            <span className="font-mono">7° Semestre</span>
            <span>•</span>
            <span>Cruzeiro do Sul</span>
          </div>

          <p className="font-light max-w-lg mx-auto text-[11px] leading-relaxed">
            Feito de maneira minimalista para garantir máxima legibilidade para idosos, iniciantes e públicos diversos. 
            Todas as simulações e códigos rodam localmente sem coletar cookies.
          </p>

          <p className="text-[10px] text-stone-400 dark:text-stone-600 font-mono">
            © {new Date().getFullYear()} Inclusão Digital. Projeto Acadêmico Isento de Fins Lucrativos.
          </p>
        </div>
      </footer>

      {/* Guide detail slide-over overlay modal */}
      <AnimatePresence>
        {activeGuideId && activeGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-900/60 dark:bg-stone-950/80 backdrop-blur-xs z-50 flex justify-end overflow-hidden"
          >
            
            {/* Click outside target */}
            <div className="absolute inset-0" onClick={() => setActiveGuideId(null)}></div>

            {/* Slide over Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="bg-white dark:bg-stone-900 w-full max-w-4xl h-full flex flex-col shadow-2xl relative z-10 overflow-hidden"
            >
              
              {/* Modal Top Header */}
              <div className="border-b border-stone-200 dark:border-stone-850 p-4 sm:p-5 flex items-center justify-between bg-stone-50 dark:bg-stone-950/50">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800">
                    {getGuideIcon(activeGuide.iconName)}
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-stone-900 dark:text-white text-md sm:text-lg leading-snug">
                      {activeGuide.title}
                    </h2>
                    <span className="text-[10px] text-stone-500 font-mono uppercase tracking-wider block">
                      {activeGuide.category === "rapido" ? "Guia Rápido" : "Manual Completo"} • {activeGuide.difficulty}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveGuideId(null)}
                  className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 transition-colors border border-stone-200 dark:border-serif-stone cursor-pointer"
                  title="Fechar Guia"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Sub content scrolling space */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row gap-6">

                {/* Left side: Guide Steps instruction */}
                <div className="flex-1 space-y-6">
                  
                  {/* Summary card info */}
                  <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40">
                    <span className="text-[11px] text-indigo-805 dark:text-indigo-400 uppercase tracking-widest font-mono font-extrabold block mb-1">
                      Resumo da Atividade
                    </span>
                    <p className={`${getFontSizeClass("body")} text-stone-900 dark:text-stone-100 font-normal`}>
                      {activeGuide.description}
                    </p>
                  </div>

                  <h3 className="font-display font-bold text-stone-900 dark:text-white uppercase tracking-wider text-xs border-b pb-2">
                    Passo a Passo Prático
                  </h3>

                  {/* Steps rendered list */}
                  <div className="space-y-4">
                    {activeGuide.steps.map((step, idx) => {
                      const isActiveStep = activeStepIndex === idx;
                      return (
                        <div
                          key={idx}
                          onClick={() => setActiveStepIndex(idx)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer ${
                            isActiveStep
                              ? "bg-stone-150/80 dark:bg-stone-850/70 border-indigo-600/80 scale-[1.01]"
                              : "bg-white dark:bg-stone-950/40 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-850/30"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {/* Step badge layout */}
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-extrabold shrink-0 ${
                              isActiveStep
                                ? "bg-stone-950 text-white dark:bg-white dark:text-stone-950"
                                : "bg-stone-200 text-stone-750 dark:bg-stone-800 dark:text-stone-300"
                            }`}>
                              {idx + 1}
                            </div>
                            
                            <div className="space-y-1 w-full">
                              <h4 className="text-xs font-extrabold text-stone-950 dark:text-white leading-tight">
                                {step.title}
                              </h4>
                              <p className={`${getFontSizeClass("body")} text-stone-855 dark:text-stone-200 font-medium mt-1 leading-relaxed`}>
                                {step.text}
                              </p>

                              {/* Tip block rendering */}
                              {step.tip && (
                                <div className="mt-2.5 p-2 px-3 rounded-lg bg-amber-500/5 dark:bg-amber-500/10 border-l-2 border-amber-500 text-[11px] text-amber-900 dark:text-amber-300 italic font-medium">
                                  {step.tip}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* Right side: Active interactive Playground */}
                <div className="flex-1 lg:max-w-md space-y-4">
                  <div className="lg:sticky lg:top-4 space-y-4">
                    
                    <div className="p-3 bg-stone-100 dark:bg-stone-950/20 rounded-xl border border-stone-200 dark:border-stone-850 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-[#007bff] shrink-0" />
                      <div className="text-left leading-tight">
                        <span className="text-[10px] text-stone-500 font-mono block font-bold">Instrução de Treinamento</span>
                        <span className="text-xs font-bold text-stone-850 dark:text-stone-300">
                          Use a simulação abaixo para colocar em prática
                        </span>
                      </div>
                    </div>

                    {/* Simulation Widget loader matches active step type or default type */}
                    <GuideSimulator
                      key={activeGuide.steps[activeStepIndex]?.interactiveType || activeGuide.id}
                      type={activeGuide.steps[activeStepIndex]?.interactiveType || activeGuide.id}
                    />

                    {/* Simulated downloadable attachment or helper link */}
                    <div className="bg-stone-100/60 dark:bg-stone-950/20 p-4 rounded-xl border border-stone-250 dark:border-stone-850 flex flex-col justify-center items-center text-center space-y-3 w-full">
                      <div className="flex items-center gap-1.5 text-xs text-stone-800 dark:text-stone-300 font-extrabold">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                        <span>Arquivo PDF Sempre Disponível</span>
                      </div>
                      
                      {/* PDF Always Visible Title block */}
                      <div className="bg-white dark:bg-stone-900 p-3 rounded-lg border border-stone-250 dark:border-stone-800 w-full flex items-center justify-between gap-2 shadow-xs">
                        <div className="flex items-center gap-2 text-left">
                          <FileText className="w-5 h-5 text-red-600 shrink-0" />
                          <div className="leading-tight">
                            <p className="text-xs font-extrabold text-stone-900 dark:text-stone-100 font-mono break-all leading-normal">
                              Guia_{activeGuide.id.replace(/-/g, "_")}.pdf
                            </p>
                            <p className="text-[10px] text-stone-605 dark:text-stone-400 font-bold font-mono">
                              {activeGuide.category === "rapido" ? "Guia Prático: " : "Manual: "}{activeGuide.title}
                            </p>
                          </div>
                        </div>
                        <span className="text-[9px] bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 font-extrabold px-1.5 py-0.5 rounded border border-red-100 dark:border-red-900/60 font-mono">
                          PDF
                        </span>
                      </div>

                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Simulador de Download: O PDF "Guia_${activeGuide.id.replace(/-/g, "_")}.pdf" está pronto! O conteúdo instrutivo interativo completo já se encontra totalmente visível e à disposição nesta tela.`);
                        }}
                        className="w-full py-2 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white border border-red-700 text-xs font-extrabold font-mono transition-transform hover:scale-[1.01] flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-4 h-4" />
                        Acessar PDF Integrado
                      </a>
                    </div>

                  </div>
                </div>

              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
