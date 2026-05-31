import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Copy,
  Check,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  FolderPlus,
  FileArchive,
  Search,
  Monitor,
  Eye,
  EyeOff,
  Sliders,
  FileText,
  FileSpreadsheet,
  Mic,
  MoreVertical,
  Plus,
  Minus,
  Download,
  CheckCircle2,
  Trash2,
  Folder,
  Layout,
  MousePointer,
  HelpCircle
} from "lucide-react";

interface SimulatorProps {
  type: string;
  key?: string;
}

export default function GuideSimulator({ type }: SimulatorProps) {
  // State for copying and pasting
  const [copiedText, setCopiedText] = useState("");
  const [selectedText, setSelectedText] = useState(false);
  const [pasteValue, setPasteValue] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [pasteSuccess, setPasteSuccess] = useState(false);

  // State for Font Size
  const [zoomLevel, setZoomLevel] = useState(100);
  const [menuOpen, setMenuOpen] = useState(false);

  // State for Crop Image
  const [cropTop, setCropTop] = useState(10);
  const [cropBottom, setCropBottom] = useState(10);
  const [cropLeft, setCropLeft] = useState(15);
  const [cropRight, setCropRight] = useState(15);
  const [isCropped, setIsCropped] = useState(false);

  // State for Folder Creator
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState<string[]>(["Documentos", "Fotos Antigas", "Downloads"]);
  const [showRightClickMenu, setShowRightClickMenu] = useState(false);
  const [rightClickCoords, setRightClickCoords] = useState({ x: 0, y: 0 });
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  // State for Zip Files
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isZipCompressed, setIsZipCompressed] = useState(false);
  const [compressingProgress, setCompressingProgress] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);

  // State for Windows Simulation
  const [winSearchQuery, setWinSearchQuery] = useState("");
  const [winCalcInput, setWinCalcInput] = useState("");
  const [winCalcResult, setWinCalcResult] = useState<number | null>(null);
  const [winActiveTab, setWinActiveTab] = useState<"desktop" | "explorer" | "calc">("desktop");
  const [winFiles, setWinFiles] = useState<string[]>(["Receitas de Bolo.docx", "Foto_Formatura.png", "Fatura_Fevereiro.pdf"]);

  // State for Figma Simulation
  const [figmaLayers, setFigmaLayers] = useState([
    { id: "text", name: "Texto de Cabeçalho", visible: true, color: "#1e293b" },
    { id: "avatar", name: "Símbolo de Perfil", visible: true, color: "#3b82f6" },
    { id: "card", name: "Cartão de Fundo", visible: true, color: "#f5f5f4" },
  ]);
  const [figmaUsers, setFigmaUsers] = useState([
    { id: 1, name: "Victor (7° Semestre)", color: "bg-teal-500", x: 120, y: 80 },
    { id: 2, name: "Maria (Inclusão)", color: "bg-amber-500", x: 210, y: 150 },
  ]);

  // State for Google Docs Simulator
  const [docsContent, setDocsContent] = useState("Meu primeiro documento online...");
  const [docsSyncStatus, setDocsSyncStatus] = useState("Salvo automaticamente na nuvem");
  const [isDictating, setIsDictating] = useState(false);

  // State for Google Sheets Simulator
  const [sheetData, setSheetData] = useState({
    row1: { detail: "Energia (Luz)", value: 150 },
    row2: { detail: "Água", value: 45 },
    row3: { detail: "Internet", value: 99 },
  });

  // State for Canva Simulator
  const [canvaTemplate, setCanvaTemplate] = useState<"clean" | "academic" | "cv">("academic");
  const [canvaTitle, setCanvaTitle] = useState("Inclusão Tecnológica");
  const [canvaBgColor, setCanvaBgColor] = useState("bg-[#fdfbf7]");

  // State for iLovePDF Simulator
  const [pdfFiles, setPdfFiles] = useState<{ name: string; size: string }[]>([
    { name: "RG_Frente.pdf", size: "320 KB" },
    { name: "RG_Verso.pdf", size: "290 KB" },
    { name: "Comprovante_Residencia.pdf", size: "510 KB" },
  ]);
  const [pdfMerged, setPdfMerged] = useState(false);
  const [isMerging, setIsMerging] = useState(false);

  // Handlers for Copy Paste Select
  const handleSelectText = () => {
    setSelectedText(true);
  };

  const handleCopyText = () => {
    setCopiedText("Cruzeiro do Sul - 7° Semestre - Inclusão Digital");
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handlePasteText = () => {
    if (copiedText) {
      setPasteValue(copiedText);
      setPasteSuccess(true);
      setTimeout(() => setPasteSuccess(false), 2000);
    }
  };

  const resetCopyPaste = () => {
    setCopiedText("");
    setSelectedText(false);
    setPasteValue("");
    setCopySuccess(false);
    setPasteSuccess(false);
  };

  // Figma multi-user cursors walk simulation
  useEffect(() => {
    if (type.startsWith("figma")) {
      const interval = setInterval(() => {
        setFigmaUsers(prev =>
          prev.map(u => ({
            ...u,
            x: Math.max(20, Math.min(280, u.x + (Math.random() * 40 - 20))),
            y: Math.max(20, Math.min(180, u.y + (Math.random() * 40 - 20))),
          }))
        );
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [type]);

  // Google Docs Auto Save simulation
  useEffect(() => {
    if (type.startsWith("toolsDocs")) {
      setDocsSyncStatus("Digitando...");
      const timer = setTimeout(() => {
        setDocsSyncStatus("Salvo automaticamente na nuvem");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [docsContent, type]);

  // Simulated Dictation
  const toggleDictation = () => {
    if (isDictating) {
      setIsDictating(false);
    } else {
      setIsDictating(true);
      let count = 0;
      const texts = [" Tecnologia", " para", " todos", " com", " facilidade!"];
      const interval = setInterval(() => {
        if (count < texts.length) {
          setDocsContent(prev => prev + texts[count]);
          count++;
        } else {
          setIsDictating(false);
          clearInterval(interval);
        }
      }, 800);
    }
  };

  // Folder creation right click workspace popup
  const handleWorkspaceRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setRightClickCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setShowRightClickMenu(true);
  };

  const handleCreateNewFolderClick = () => {
    setShowRightClickMenu(false);
    setIsCreatingFolder(true);
    setFolderName("Nova Pasta");
  };

  const confirmFolderCreation = () => {
    if (folderName.trim()) {
      setFolders(prev => [...prev, folderName.trim()]);
      setIsCreatingFolder(false);
      setFolderName("");
    }
  };

  // ZIP compression progress bar
  const handleZipFiles = () => {
    if (selectedFiles.length === 0) return;
    setIsCompressing(true);
    setCompressingProgress(0);
    const interval = setInterval(() => {
      setCompressingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCompressing(false);
          setIsZipCompressed(true);
          return 100;
        }
        return prev + 20;
      });
    }, 250);
  };

  const handleToggleFileSelection = (file: string) => {
    setSelectedFiles(prev =>
      prev.includes(file) ? prev.filter(f => f !== file) : [...prev, file]
    );
  };

  // Convert/Merge PDFs
  const runMergePdfs = () => {
    setIsMerging(true);
    setTimeout(() => {
      setIsMerging(false);
      setPdfMerged(true);
    }, 1500);
  };

  // Calculate sum for Google Sheets
  const sheetTotal = sheetData.row1.value + sheetData.row2.value + sheetData.row3.value;

  // Render proper widget
  return (
    <div className="bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 md:p-6 w-full flex flex-col items-center justify-center font-sans">
      <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-stone-200 dark:border-stone-800">
        <span className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-medium">
          Simulador Interativo Real
        </span>
        <button
          onClick={() => {
            resetCopyPaste();
            setZoomLevel(100);
            setIsCropped(false);
            setFigmaLayers([
              { id: "text", name: "Texto de Cabeçalho", visible: true, color: "#1e293b" },
              { id: "avatar", name: "Símbolo de Perfil", visible: true, color: "#3b82f6" },
              { id: "card", name: "Cartão de Fundo", visible: true, color: "#f5f5f4" },
            ]);
            setPdfMerged(false);
            setFolders(["Documentos", "Fotos Antigas", "Downloads"]);
            setFolderName("");
            setIsCreatingFolder(false);
            setSelectedFiles([]);
            setIsZipCompressed(false);
            setWinSearchQuery("");
            setWinActiveTab("desktop");
          }}
          title="Reiniciar Simulação"
          className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 text-xs flex items-center gap-1 transition-colors bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-750 px-2 py-1 rounded border border-stone-200/60 dark:border-stone-700/60"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar</span>
        </button>
      </div>

      {/* Simulator 1: Copy-Paste Selection */}
      {type.startsWith("copyPaste") && (
        <div className="w-full space-y-4">
          <div className="bg-white dark:bg-stone-950 p-4 rounded-lg border border-stone-200 dark:border-stone-800 text-center relative overflow-hidden">
            <span className="text-[10px] text-stone-400 dark:text-stone-500 absolute top-2 right-3 font-mono">
              Texto de Exemplo
            </span>
            <p
              className={`text-sm select-all cursor-pointer transition-all duration-300 py-3 rounded ${
                selectedText
                  ? "bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-100 ring-2 ring-blue-400"
                  : "text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-900"
              }`}
              onClick={handleSelectText}
            >
              Cruzeiro do Sul - 7° Semestre - Inclusão Digital
            </p>
            {!selectedText && (
              <p className="text-xs text-stone-500 dark:text-stone-400 italic mt-2 flex items-center justify-center gap-1">
                <MousePointer className="w-3 h-3 text-blue-500 animate-pulse" />
                Dê um clique para imitar a seleção (ficar azul)
              </p>
            )}
          </div>

          <div className="flex gap-2 justify-center">
            <button
              onClick={handleCopyText}
              disabled={!selectedText}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                selectedText
                  ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 cursor-pointer hover:bg-stone-800 dark:hover:bg-stone-200"
                  : "bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed"
              }`}
            >
              {copySuccess ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copySuccess ? "Copiado!" : "Copiar (Ctrl+C)"}</span>
            </button>

            <button
              onClick={handlePasteText}
              disabled={!copiedText}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                copiedText
                  ? "bg-[#007bff]/10 dark:bg-[#007bff]/20 text-[#007bff] hover:bg-[#007bff]/20 dark:hover:bg-[#007bff]/30"
                  : "bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed"
              }`}
            >
              {pasteSuccess ? <Check className="w-4 h-4 text-emerald-500" /> : <Plus className="w-4 h-4" />}
              <span>{pasteSuccess ? "Inserido!" : "Colar (Ctrl+V)"}</span>
            </button>
          </div>

          {copiedText && (
            <div className="bg-stone-50 dark:bg-stone-950/50 p-3 rounded-lg border border-stone-200/80 dark:border-stone-850 text-xs">
              <span className="font-semibold text-stone-600 dark:text-stone-400 block mb-1">Clipboard Virtual</span>
              <p className="font-mono text-emerald-600 dark:text-emerald-400 bg-stone-100 dark:bg-stone-900/80 px-2 py-1 rounded">
                {copiedText}
              </p>
            </div>
          )}

          <div className="bg-white dark:bg-stone-950 p-4 rounded-lg border border-stone-200 dark:border-stone-800 text-center">
            <span className="text-[10px] text-stone-400 dark:text-stone-500 block text-left mb-2 font-mono">
              Destino do seu texto
            </span>
            <input
              type="text"
              readOnly
              placeholder="Clique em Colar para preencher aqui"
              value={pasteValue}
              className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700/80 px-3 py-2 rounded text-sm text-stone-800 dark:text-stone-200 font-mono text-center focus:outline-none"
            />
            {pasteValue && (
              <div className="mt-3 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5 animate-bounce">
                <CheckCircle2 className="w-4 h-4" />
                Muito bem! Você dominou o Copiar e Colar!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Simulator 2: Zoom / Font Size */}
      {type.startsWith("fontSize") && (
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between bg-white dark:bg-stone-950 p-3 rounded-lg border border-stone-200 dark:border-stone-800">
            <span className="text-xs text-stone-600 dark:text-stone-300 font-medium">Controle de Zoom Virtual</span>
            <span className="text-sm font-mono font-bold text-[#007bff] bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900">
              {zoomLevel}%
            </span>
          </div>

          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setZoomLevel(prev => Math.min(220, prev + 20))}
              className="p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <ZoomIn className="w-4 h-4 text-emerald-500" />
              <span>Aumentar (+20%)</span>
            </button>

            <button
              onClick={() => setZoomLevel(prev => Math.max(60, prev - 20))}
              className="p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <ZoomOut className="w-4 h-4 text-amber-500" />
              <span>Diminuir (-20%)</span>
            </button>

            <button
              onClick={() => setZoomLevel(100)}
              className="p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-200 dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-800 transition-colors text-xs font-semibold"
            >
              Reiniciar (100%)
            </button>
          </div>

          <div className="relative bg-white dark:bg-stone-950 p-6 rounded-lg border border-stone-200 dark:border-stone-800 min-h-36 flex flex-col justify-center overflow-auto shadow-inner">
            <span className="text-[10px] text-stone-400 dark:text-stone-500 absolute top-2 left-3 font-mono uppercase tracking-wider">
              Visualização de Experiência do Aluno
            </span>

            {/* Simulated scaled container */}
            <div
              style={{ fontSize: `${zoomLevel / 100}rem`, lineHeight: "1.5" }}
              className="transition-all duration-300 text-center"
            >
              <p className="font-semibold text-stone-800 dark:text-stone-100">
                Inclusão para todas as idades.
              </p>
              <p className="text-stone-500 dark:text-stone-400 mt-1 max-w-xs mx-auto">
                No 7° Semestre unimos forças e criamos manuais acessíveis para ajudar você no dia a dia.
              </p>
            </div>
          </div>

          <div className="bg-stone-50 dark:bg-stone-950/30 p-3 rounded-lg border border-stone-250 dark:border-stone-850/80 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-bold text-stone-700 dark:text-stone-300 block mb-1">Como fazer no seu teclado real?</span>
            Mantenha pressionada a tecla <kbd className="bg-stone-200 dark:bg-stone-800 px-1 py-0.5 rounded border border-stone-300 text-stone-700 dark:text-stone-300 font-mono shadow-sm">CTRL</kbd> e clique em <kbd className="bg-stone-200 dark:bg-stone-800 px-1 py-0.5 rounded border border-stone-300 text-stone-700 dark:text-stone-300 font-mono shadow-sm">+</kbd> para expandir, ou <kbd className="bg-stone-200 dark:bg-stone-800 px-1 py-0.5 rounded border border-stone-300 text-stone-700 dark:text-stone-300 font-mono shadow-sm">0</kbd> para resetar!
          </div>
        </div>
      )}

      {/* Simulator 3: Crop Image */}
      {type.startsWith("crop") && (
        <div className="w-full space-y-4">
          <div className="bg-white dark:bg-stone-950 p-4 rounded-lg border border-stone-200 dark:border-stone-800">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-stone-600 dark:text-stone-400 font-semibold">Simulação de Ajuste de Bordas</span>
              <span className="text-xs font-mono bg-stone-100 dark:bg-stone-900 px-2 py-0.5 text-stone-600 dark:text-stone-400">
                {isCropped ? "Foto Recortada ✓" : "Original"}
              </span>
            </div>

            {/* Container for crop design */}
            <div className="relative border border-stone-300 dark:border-stone-800 bg-stone-300 dark:bg-stone-900 rounded overflow-hidden aspect-video max-w-md mx-auto">
              {/* Photo */}
              <div className="absolute inset-0 bg-stone-100 dark:bg-stone-950 flex items-center justify-center">
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                  <div className="relative w-20 h-20 bg-amber-200 dark:bg-amber-900 rounded-full flex items-center justify-center text-4xl mb-2 border-2 border-stone-400">
                    🎓
                  </div>
                  <h4 className="text-sm font-bold text-stone-800 dark:text-stone-100">Victor Gabriel</h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">Cruzeiro do Sul • 7° Semestre</p>
                </div>
              </div>

              {/* Crop Mask */}
              <AnimatePresence>
                {!isCropped && (
                  <div
                    style={{
                      top: `${cropTop}%`,
                      bottom: `${cropBottom}%`,
                      left: `${cropLeft}%`,
                      right: `${cropRight}%`
                    }}
                    className="absolute border-2 border-dashed border-red-500 bg-black/30 transition-all duration-150 pointer-events-none"
                  >
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-600 border border-white"></div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 border border-white"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-red-600 border border-white"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-600 border border-white"></div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Adjust controls */}
          {!isCropped ? (
            <div className="space-y-3 bg-white dark:bg-stone-950 p-4 rounded-lg border border-stone-200 dark:border-stone-800">
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-1">Arraste os limites do corte:</span>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-stone-500 uppercase tracking-widest font-mono">Borda Lateral</label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={cropLeft}
                    onChange={e => {
                      setCropLeft(Number(e.target.value));
                      setCropRight(Number(e.target.value));
                    }}
                    className="w-full accent-[#007bff]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-stone-500 uppercase tracking-widest font-mono">Borda Topo</label>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={cropTop}
                    onChange={e => {
                      setCropTop(Number(e.target.value));
                      setCropBottom(Number(e.target.value));
                    }}
                    className="w-full accent-[#007bff]"
                  />
                </div>
              </div>

              <button
                onClick={() => setIsCropped(true)}
                className="w-full mt-2 py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Check className="w-4 h-4" />
                <span>Aplicar Recorte e Salvar Cópia</span>
              </button>
            </div>
          ) : (
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 rounded-lg p-4 text-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 animate-bounce" />
              <h5 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Corte efetuado e salvo com sucesso!</h5>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Sua nova fotografia compacta foi salva sem as bordas originais.</p>
              <button
                onClick={() => {
                  setIsCropped(false);
                  setCropTop(10);
                  setCropBottom(10);
                  setCropLeft(15);
                  setCropRight(15);
                }}
                className="mt-3 text-xs text-[#007bff] hover:underline font-semibold bg-white dark:bg-stone-850 px-2 py-1 rounded border border-blue-200"
              >
                Tentar Recortar Novamente
              </button>
            </div>
          )}
        </div>
      )}

      {/* Simulator 4: Folder Creator */}
      {type.startsWith("folder") && (
        <div className="w-full space-y-4">
          <div
            onContextMenu={handleWorkspaceRightClick}
            className="bg-white dark:bg-stone-950 rounded-lg p-4 h-56 border border-stone-200 dark:border-stone-800 relative select-none shadow-inner overflow-y-auto cursor-default"
          >
            <span className="text-[10px] text-stone-400 dark:text-stone-500 absolute top-2 right-3 font-mono">
              Clique Direito p/ Painel (ou Celular: use botão abaixo)
            </span>

            {/* List Folders */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6">
              {folders.map((fold, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center p-2 rounded hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors cursor-pointer border border-transparent hover:border-stone-200/50"
                >
                  <Folder className="w-10 h-10 text-amber-400 fill-amber-300 shadow-sm" />
                  <span className="text-xs text-stone-850 dark:text-stone-200 font-extrabold text-center mt-1 break-all text-wrap w-full">
                    {fold}
                  </span>
                </div>
              ))}

              <AnimatePresence>
                {isCreatingFolder && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center p-2 bg-stone-50 dark:bg-stone-900 rounded border border-blue-200 dark:border-blue-900"
                  >
                    <Folder className="w-10 h-10 text-blue-400 fill-blue-300 animate-pulse" />
                    <input
                      type="text"
                      autoFocus
                      value={folderName}
                      onChange={e => setFolderName(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter") confirmFolderCreation();
                      }}
                      className="text-xs font-medium text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-800 border border-blue-400 rounded px-1.5 py-0.5 mt-1 text-center font-mono w-full focus:outline-none"
                    />
                    <button
                      onClick={confirmFolderCreation}
                      className="mt-1 text-[10px] bg-blue-600 hover:bg-blue-700 text-white font-bold rounded px-1.5 py-0.5"
                    >
                      Salvar
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Simulated Right-Click Menu */}
            <AnimatePresence>
              {showRightClickMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ top: `${rightClickCoords.y}px`, left: `${rightClickCoords.x}px` }}
                  className="absolute bg-white dark:bg-stone-800 border border-stone-250 dark:border-stone-700 rounded shadow-lg py-1 w-36 text-xs text-stone-700 dark:text-stone-300 z-20"
                >
                  <button
                    onClick={handleCreateNewFolderClick}
                    className="w-full text-left px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-stone-700 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 font-medium"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                    <span>Nova Pasta</span>
                  </button>
                  <div className="border-t border-stone-150 dark:border-stone-700 my-1"></div>
                  <button
                    onClick={() => setShowRightClickMenu(false)}
                    className="w-full text-left px-3 py-1.5 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-400 font-mono"
                  >
                    Fechar Menu
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick trigger button for mobile / non-right click users */}
          <div className="flex gap-2">
            <button
              onClick={handleCreateNewFolderClick}
              disabled={isCreatingFolder}
              className="flex-1 py-2 px-4 rounded-lg bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900 text-sm font-semibold flex items-center justify-center gap-2 disabled:bg-stone-300 disabled:text-stone-500"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Simular Nova Pasta</span>
            </button>
          </div>
        </div>
      )}

      {/* Simulator 5: Zip Files selection */}
      {type.startsWith("zip") && (
        <div className="w-full space-y-4">
          <div className="bg-white dark:bg-stone-950 p-4 rounded-lg border border-stone-200 dark:border-stone-800">
            <span className="text-xs text-stone-500 dark:text-stone-400 block mb-3 font-semibold">
              Arquivos soltos para compactar:
            </span>

            <div className="space-y-2">
              {["Foto_Formatura.png", "Boleto_Maio.pdf", "Trabalho_7_Semestre.docx"].map((file, idx) => {
                const isSelected = selectedFiles.includes(file);
                return (
                  <div
                    key={idx}
                    onClick={() => handleToggleFileSelection(file)}
                    className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-blue-50 dark:bg-blue-950/20 border-blue-400 dark:border-blue-900"
                        : "bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="rounded accent-blue-600 focus:ring-0"
                    />
                    <FileText className={`w-4 h-4 ${isSelected ? "text-blue-500" : "text-stone-400"}`} />
                    <span className="text-xs text-stone-700 dark:text-stone-300 font-medium font-mono">{file}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleZipFiles}
              disabled={selectedFiles.length === 0 || isZipCompressed || isCompressing}
              className="py-2.5 px-4 rounded-lg bg-[#007bff] hover:bg-[#0056b3] text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:bg-stone-300 dark:disabled:bg-stone-800 disabled:text-stone-500 transition-colors"
            >
              <FileArchive className="w-4 h-4" />
              <span>
                {isZipCompressed
                  ? "Pacote Compactado!"
                  : isCompressing
                  ? "Compactando..."
                  : `Compactar em ZIP (${selectedFiles.length} selecionados)`}
              </span>
            </button>
          </div>

          {/* Compressed file load state */}
          {isCompressing && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-stone-500">
                <span>Gerando arquivos_comprimidos.zip...</span>
                <span>{compressingProgress}%</span>
              </div>
              <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-2 overflow-hidden shadow-inner">
                <div
                  style={{ width: `${compressingProgress}%` }}
                  className="bg-emerald-500 h-full transition-all duration-200"
                ></div>
              </div>
            </div>
          )}

          {isZipCompressed && (
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-lg p-3.5 flex items-center gap-3.5 justify-between">
              <div className="flex items-center gap-2">
                <FileArchive className="w-8 h-8 text-amber-500 fill-amber-300 animate-pulse" />
                <div className="text-left">
                  <h6 className="text-xs font-bold text-stone-800 dark:text-stone-100">arquivos_unidos.zip</h6>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 font-mono">Unificado de forma eficiente</p>
                </div>
              </div>
              <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 font-mono px-2 py-0.5 rounded font-bold">
                ✓ Pronto!
              </span>
            </div>
          )}
        </div>
      )}

      {/* Simulator 13: Windows folders */}
      {type.startsWith("win") && (
        <div className="w-full space-y-4">
          <div className="bg-stone-950 border-4 border-stone-800 rounded-lg overflow-hidden flex flex-col h-64 text-stone-300 font-sans shadow-lg">
            {/* Window bar */}
            <div className="bg-stone-900 border-b border-stone-800 p-2 flex items-center justify-between text-xs select-none">
              <div className="flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-semibold text-stone-300">Explorador de Arquivos Virtual</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              </div>
            </div>

            {/* Sub content tabs */}
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <div className="w-1/3 bg-stone-900 border-r border-stone-800 text-[11px] p-2 space-y-2">
                <div className="text-stone-500 font-bold uppercase tracking-wider text-[9px]">Acesso Rápido</div>
                <div
                  onClick={() => setWinActiveTab("desktop")}
                  className={`flex items-center gap-1.5 p-1 rounded cursor-pointer ${
                    winActiveTab === "desktop" ? "bg-stone-850 text-white font-medium" : "hover:bg-stone-850"
                  }`}
                >
                  <Monitor className="w-3 h-3 text-sky-400" />
                  <span>Área de Trabalho</span>
                </div>
                <div
                  onClick={() => setWinActiveTab("explorer")}
                  className={`flex items-center gap-1.5 p-1 rounded cursor-pointer ${
                    winActiveTab === "explorer" ? "bg-stone-850 text-white font-medium" : "hover:bg-stone-850"
                  }`}
                >
                  <Folder className="w-3 h-3 text-amber-500" />
                  <span>Downloads</span>
                </div>
                <div
                  onClick={() => setWinActiveTab("calc")}
                  className={`flex items-center gap-1.5 p-1 rounded cursor-pointer ${
                    winActiveTab === "calc" ? "bg-stone-850 text-white font-medium" : "hover:bg-stone-850"
                  }`}
                >
                  <Layout className="w-3 h-3 text-emerald-400" />
                  <span>Calculadora</span>
                </div>
              </div>

              {/* Main explorer viewing */}
              <div className="flex-1 bg-stone-950 p-3 overflow-y-auto text-xs">
                {winActiveTab === "desktop" && (
                  <div className="space-y-3">
                    <div className="bg-stone-900 p-2 rounded border border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
                      <span>Procurar arquivo na Área de Trabalho:</span>
                      <Search className="w-3.5 h-3.5 text-stone-500" />
                    </div>

                    <div className="flex items-center gap-1.5 bg-stone-900 p-2 rounded">
                      <Search className="w-4.5 h-4.5 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Digite o nome do arquivo..."
                        value={winSearchQuery}
                        onChange={e => setWinSearchQuery(e.target.value)}
                        className="bg-transparent text-white border-none focus:outline-none w-full placeholder:text-stone-600 text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      {winFiles
                        .filter(f => f.toLowerCase().includes(winSearchQuery.toLowerCase()))
                        .map((file, idx) => (
                          <div
                            key={idx}
                            className="bg-stone-900 border border-stone-800 p-2 rounded flex items-center justify-between"
                          >
                            <span className="font-mono text-emerald-400">{file}</span>
                            <span className="text-[10px] text-stone-500">Desktop</span>
                          </div>
                        ))}
                      {winFiles.filter(f => f.toLowerCase().includes(winSearchQuery.toLowerCase()))
                        .length === 0 && (
                        <p className="text-center text-stone-600 py-4 italic text-xs">Nenhum arquivo correspondente.</p>
                      )}
                    </div>
                  </div>
                )}

                {winActiveTab === "explorer" && (
                  <div className="space-y-2">
                    <div className="text-[11px] text-stone-400 mb-2 font-mono flex justify-between items-center bg-stone-900 px-2 py-1.5 rounded">
                      <span>Pasta de Downloads</span>
                      <span>3 arquivos</span>
                    </div>
                    {["Boleto_Formatura.pdf", "setup_figma.exe", "manual_7_semestre.zip"].map((file, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-1.5 bg-stone-900/60 rounded">
                        <FileText className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-stone-300 font-mono text-[11px]">{file}</span>
                      </div>
                    ))}
                  </div>
                )}

                {winActiveTab === "calc" && (
                  <div className="space-y-2 p-1 text-center">
                    <span className="text-[11px] text-emerald-400 font-mono">Calculadora do Iniciar Integrada</span>
                    <div className="bg-stone-900 p-2.5 rounded font-mono text-right text-lg text-white font-bold h-10 flex items-center justify-end">
                      {winCalcResult !== null ? winCalcResult : winCalcInput || "0"}
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {["7", "8", "9", "+", "4", "5", "6", "*", "1", "2", "3", "-", "C", "0", "=", "/"].map((char, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (char === "C") {
                              setWinCalcInput("");
                              setWinCalcResult(null);
                            } else if (char === "=") {
                              try {
                                if (winCalcInput) {
                                  // Safe evaluation for basic expression
                                  const tokens = winCalcInput.match(/(\d+)|([+\-*/])/g);
                                  if (tokens && tokens.length === 3) {
                                    const n1 = parseFloat(tokens[0]);
                                    const op = tokens[1];
                                    const n2 = parseFloat(tokens[2]);
                                    let res = 0;
                                    if (op === "+") res = n1 + n2;
                                    else if (op === "-") res = n1 - n2;
                                    else if (op === "*") res = n1 * n2;
                                    else if (op === "/") res = n1 / n2;
                                    setWinCalcResult(res);
                                  } else {
                                    setWinCalcInput("Expressao simples (ex: 2+3)");
                                  }
                                }
                              } catch {
                                setWinCalcInput("Erro");
                              }
                            } else {
                              setWinCalcResult(null);
                              setWinCalcInput(prev => prev + char);
                            }
                          }}
                          className="bg-stone-800 hover:bg-stone-700 text-white font-mono rounded p-1"
                        >
                          {char}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-xs bg-white dark:bg-stone-950 p-3 rounded-lg border border-stone-200 dark:border-stone-800/85">
            <span className="font-bold text-stone-700 dark:text-stone-300 block mb-1">Como treinar?</span>
            Clique nas abas da lateral esquerda <span className="font-medium">Área de Trabalho</span>, <span className="font-medium">Downloads</span> ou <span className="font-medium">Calculadora</span> para testar suas interações dentro do Windows!
          </div>
        </div>
      )}

      {/* Simulator 17: Figma editor */}
      {type.startsWith("figma") && (
        <div className="w-full space-y-4">
          <div className="bg-[#2c2c2c] rounded-xl overflow-hidden text-white flex flex-col h-64 relative font-sans shadow-md border-4 border-stone-850">
            {/* Header figma simulated */}
            <div className="bg-[#1e1e1e] border-b border-[#333] p-2 flex items-center justify-between text-xs select-none">
              <span className="font-bold text-xs uppercase tracking-wider text-pink-500 font-mono flex items-center gap-1">
                <span className="w-3 h-3 bg-gradient-to-tr from-pink-500 to-amber-500 rounded-full inline-block"></span>
                FIGMA PLATFORM
              </span>
              <span className="text-[10px] text-stone-400">7° Semestre • Projeto Integrador</span>
            </div>

            {/* Canvas design environment */}
            <div className="flex-1 relative bg-[#1e1e1e] overflow-hidden flex items-center justify-center p-4">
              {/* Actual Canvas */}
              <div className="bg-white rounded p-4 w-4/5 h-4/5 shadow-inner relative flex flex-col items-center justify-center text-center overflow-hidden">
                {/* Headers */}
                {figmaLayers.find(l => l.id === "text")?.visible && (
                  <h4
                    style={{ color: figmaLayers.find(l => l.id === "text")?.color }}
                    className="text-xs uppercase tracking-widest font-extrabold"
                  >
                    INCLUSÃO DE ALUNOS
                  </h4>
                )}

                {/* Avatar Icon shape */}
                {figmaLayers.find(l => l.id === "avatar")?.visible && (
                  <div
                    style={{ backgroundColor: figmaLayers.find(l => l.id === "avatar")?.color }}
                    className="w-12 h-12 rounded-full my-1 border-2 border-white flex items-center justify-center text-xl text-white shadow-md font-bold"
                  >
                    ✓
                  </div>
                )}

                {/* Main Card info */}
                {figmaLayers.find(l => l.id === "card")?.visible && (
                  <div
                    style={{ backgroundColor: figmaLayers.find(l => l.id === "card")?.color }}
                    className="p-1 px-3 rounded border border-stone-200 text-[10px] text-stone-500 mt-1 max-w-xs font-medium"
                  >
                    Ambiente de Produção 7th semester
                  </div>
                )}

                {/* Moving simulation cursor highlights */}
                {figmaUsers.map(u => (
                  <motion.div
                    key={u.id}
                    className="absolute z-10 flex flex-col pointer-events-none"
                    animate={{ x: u.x, y: u.y }}
                    transition={{ type: "spring", stiffness: 40 }}
                  >
                    {/* SVG Cursor arrow */}
                    <svg className="w-3.5 h-3.5 drop-shadow" viewBox="0 0 100 100">
                      <polygon points="0,0 100,40 50,50" className="fill-pink-500 stroke-white stroke-2" />
                    </svg>
                    <span className={`${u.color} text-white font-bold font-mono text-[8px] whitespace-nowrap p-0.5 rounded px-1 -mt-1 ml-3 shadow-md`}>
                      {u.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar toggle buttons */}
            <div className="bg-[#1e1e1e] border-t border-[#333] p-2 text-[10px] flex justify-around">
              {figmaLayers.map(l => (
                <button
                  key={l.id}
                  onClick={() =>
                    setFigmaLayers(prev =>
                      prev.map(item => (item.id === l.id ? { ...item, visible: !item.visible } : item))
                    )
                  }
                  className={`flex items-center gap-1.5 px-2 py-1 rounded border border-[#333] transition-colors ${
                    l.visible ? "bg-stone-800 text-white border-blue-500" : "bg-[#292929] text-stone-500"
                  }`}
                >
                  {l.visible ? <Eye className="w-3.5 h-3.5 text-blue-400" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{l.name}</span>
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 italic text-center">
            Repare como o mouse dos alunos simulam trabalho cooperativo live! Você pode ligar e desligar camadas.
          </p>
        </div>
      )}

      {/* Simulator 20: Google Docs / Sheets / Canva / iLovePDF */}
      {type === "toolsDocs" && (
        <div className="w-full space-y-4">
          <div className="bg-white dark:bg-stone-950 p-4 rounded-lg border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  D
                </div>
                <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">Google Docs Virtual</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                <Check className="w-3 h-3 text-emerald-500" />
                <span>{docsSyncStatus}</span>
              </div>
            </div>

            <textarea
              value={docsContent}
              onChange={e => setDocsContent(e.target.value)}
              className="w-full h-24 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded p-2.5 text-xs font-sans text-stone-800 dark:text-stone-100 placeholder:text-stone-450 focus:outline-none"
              placeholder="Digite o texto que o Google Docs salva automaticamente..."
            />

            <div className="mt-3 flex gap-2">
              <button
                onClick={toggleDictation}
                className={`flex-1 py-1 px-3 text-xs rounded-lg font-semibold flex items-center justify-center gap-2 border transition-all ${
                  isDictating
                    ? "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 border-red-300 animate-pulse"
                    : "bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 border-stone-300 dark:border-stone-700"
                }`}
              >
                <Mic className={`w-3.5 h-3.5 ${isDictating ? "text-red-500" : "text-stone-500"}`} />
                <span>{isDictating ? "Gravando por Voz..." : "Experimentar caneta por voz (Ditado)"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {type === "toolsSheets" && (
        <div className="w-full space-y-4">
          <div className="bg-white dark:bg-stone-950 p-4 rounded-lg border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between mb-3 border-b pb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center text-white text-xs font-bold font-mono">
                  S
                </div>
                <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">Planilha (Google Sheets)</span>
              </div>
              <span className="text-[10px] text-stone-400 font-mono uppercase tracking-wider">Célula SOMA Automática</span>
            </div>

            {/* Sheets list structured */}
            <div className="space-y-2.5">
              <div className="grid grid-cols-2 gap-3 text-xs border-b border-stone-100 dark:border-stone-900 pb-1 font-semibold text-stone-500">
                <span>CONTA DOMÉSTICA</span>
                <span className="text-right">VALOR EM REAIS (R$)</span>
              </div>

              <div className="grid grid-cols-2 gap-3 items-center text-xs">
                <span className="text-stone-700 dark:text-stone-300">{sheetData.row1.detail}</span>
                <input
                  type="number"
                  value={sheetData.row1.value}
                  onChange={e =>
                    setSheetData(prev => ({
                      ...prev,
                      row1: { ...prev.row1, value: Number(e.target.value) || 0 }
                    }))
                  }
                  className="bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-stone-200 rounded px-2 py-1 text-right max-w-28 ml-auto font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-center text-xs border-t pt-1.5 border-dashed border-stone-100 dark:border-stone-900">
                <span className="text-stone-700 dark:text-stone-300">{sheetData.row2.detail}</span>
                <input
                  type="number"
                  value={sheetData.row2.value}
                  onChange={e =>
                    setSheetData(prev => ({
                      ...prev,
                      row2: { ...prev.row2, value: Number(e.target.value) || 0 }
                    }))
                  }
                  className="bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-stone-200 rounded px-2 py-1 text-right max-w-28 ml-auto font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-center text-xs border-t pt-1.5 border-dashed border-stone-100 dark:border-stone-900">
                <span className="text-stone-700 dark:text-stone-300">{sheetData.row3.detail}</span>
                <input
                  type="number"
                  value={sheetData.row3.value}
                  onChange={e =>
                    setSheetData(prev => ({
                      ...prev,
                      row3: { ...prev.row3, value: Number(e.target.value) || 0 }
                    }))
                  }
                  className="bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-stone-200 rounded px-2 py-1 text-right max-w-28 ml-auto font-mono text-xs"
                />
              </div>

              {/* Total line item */}
              <div className="grid grid-cols-2 gap-3 items-center text-sm font-bold border-t-2 border-stone-300 dark:border-stone-800 pt-2 bg-stone-50 dark:bg-stone-900 p-2 rounded">
                <span className="text-stone-800 dark:text-stone-200">TOTAL SOMA</span>
                <span className="text-right text-[#007bff] font-mono text-xs pl-2">
                  R$ {sheetTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs text-stone-500 mt-1 italic text-center">
            Edite os números acima! Veja o <span className="font-semibold text-stone-600 dark:text-stone-400">TOTAL</span> se recalcular na hora de forma totalmente automática.
          </p>
        </div>
      )}

      {type === "toolsCanva" && (
        <div className="w-full space-y-4">
          <div className="bg-white dark:bg-stone-950 p-4 rounded-lg border border-stone-200 dark:border-stone-800">
            <span className="text-xs font-semibold text-stone-600 dark:text-stone-400 block mb-3 text-left">
              Modelos do Canva Prontos:
            </span>

            {/* Grid selector templates */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
              <button
                onClick={() => {
                  setCanvaTemplate("academic");
                  setCanvaBgColor("bg-[#f7fee7]");
                  setCanvaTitle("Inclusão Tecnológica");
                }}
                className={`p-2 rounded border transition-all ${
                  canvaTemplate === "academic" ? "bg-amber-100 border-amber-400 font-bold" : "border-stone-200"
                }`}
              >
                📖 Cartaz
              </button>

              <button
                onClick={() => {
                  setCanvaTemplate("cv");
                  setCanvaBgColor("bg-slate-50");
                  setCanvaTitle("Currículo Profissional");
                }}
                className={`p-2 rounded border transition-all ${
                  canvaTemplate === "cv" ? "bg-[#007bff]/20 border-blue-400 font-bold" : "border-stone-200"
                }`}
              >
                📄 Currículo
              </button>

              <button
                onClick={() => {
                  setCanvaTemplate("clean");
                  setCanvaBgColor("bg-purple-50");
                  setCanvaTitle("Apresentação de Slides");
                }}
                className={`p-2 rounded border transition-all ${
                  canvaTemplate === "clean" ? "bg-purple-100 border-purple-400 font-bold" : "border-stone-200"
                }`}
              >
                🎬 Slides
              </button>
            </div>

            {/* Styled canvas output */}
            <div className={`border border-stone-300 dark:border-stone-850 p-6 rounded ${canvaBgColor} text-stone-900 transition-all duration-300 relative min-h-32 flex flex-col justify-center text-center`}>
              <span className="text-[9px] uppercase font-mono tracking-wider text-purple-600 absolute top-2 right-3 font-semibold">
                Canva Prototipo
              </span>
              <input
                type="text"
                value={canvaTitle}
                onChange={e => setCanvaTitle(e.target.value)}
                className="text-sm font-bold font-display text-center focus:outline-none bg-transparent"
              />
              <p className="text-[10px] text-stone-500 mt-1 uppercase tracking-widest font-semibold">
                Criado no 7° Semestre • Apoio Acadêmico
              </p>
            </div>
          </div>
        </div>
      )}

      {type === "toolsIlovePdf" && (
        <div className="w-full space-y-4">
          <div className="bg-white dark:bg-stone-950 p-4 rounded-lg border border-stone-200 dark:border-stone-800">
            <span className="text-xs text-stone-500 dark:text-stone-400 block mb-2 font-semibold">
              Arquivos na fila de fusão do iLovePDF:
            </span>

            <div className="space-y-1.5 mb-3">
              {pdfFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between text-xs p-2 bg-stone-50 dark:bg-stone-900 rounded border border-stone-200/50">
                  <span className="font-mono text-stone-700 dark:text-stone-300">{file.name}</span>
                  <span className="text-stone-400 text-[10px]">{file.size}</span>
                </div>
              ))}
            </div>

            {!pdfMerged ? (
              <button
                onClick={runMergePdfs}
                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Selecionar & Juntar Tudo em 1 só PDF</span>
              </button>
            ) : (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded text-center space-y-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                <h6 className="text-xs font-bold text-emerald-800 dark:text-emerald-300">fusao_completa_ilovepdf.pdf</h6>
                <p className="text-[10px] text-emerald-600">3 arquivos unificados com sucesso em 1.1 MB!</p>
                <button
                  onClick={() => setPdfMerged(false)}
                  className="mx-auto text-[10px] font-bold text-stone-500 block hover:underline"
                >
                  Fazer outro arquivo
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
