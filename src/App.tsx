/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import Logo from './components/Logo';
import { 
  Phone, 
  MessageSquare, 
  Search, 
  Menu, 
  X, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Truck, 
  CreditCard, 
  Clock, 
  Shield, 
  SlidersHorizontal, 
  ArrowRight, 
  MapPin, 
  Mail, 
  FileText, 
  AlertCircle, 
  ThumbsUp, 
  ExternalLink, 
  Briefcase, 
  Package, 
  Wrench, 
  Info,
  Send,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES, BRANDS, TESTIMONIALS, Product } from './data';

interface CartItem {
  product: Product;
  quantity: number;
}

export default function App() {
  // Navigation & UI States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Quote / Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // FAQ Accordion States
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Quick Filters
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  // Lead Form State
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isWhatsappMenuOpen, setIsWhatsappMenuOpen] = useState(false);

  // Hero Slides
  const heroSlides = [
    {
      title: 'Energia Ininterrupta para Empresas, Indústrias, Agronegócio e Residências',
      subtitle: 'Venda de grupos geradores conforme dimensionamento técnico, podendo ser personalizado com cabines silenciadas com tecnologia de ponta e instalação completa.',
      badge: 'DIMENSIONAMENTO E INSTALAÇÃO COMPLETA',
      buttonText: 'Solicitar Cotação de Gerador',
      actionCategory: 'geradores',
      bgGradient: 'from-brand-blue via-brand-blue/90 to-brand-dark',
    },
    {
      title: 'Plantão Técnico 24h & Manutenção Preventiva/Corretiva',
      subtitle: 'Contratos corporativos mensais e atendimento de emergência ágil para evitar prejuízos na falta de energia.',
      badge: 'SUPORTE TÉCNICO ESPECIALIZADO 24H',
      buttonText: 'Falar com Técnico de Plantão',
      actionCategory: 'servicos',
      bgGradient: 'from-brand-dark via-brand-blue to-slate-900',
    },
    {
      title: 'Peças Originais e Kits de Revisão de Todas as Marcas',
      subtitle: 'Filtros Baudouin, Controladores Deep Sea, Disjuntores Chint, Reguladores de Tensão WEG e muito mais.',
      badge: 'ESTOQUE COMPLETO A PRONTA ENTREGA',
      buttonText: 'Ver Catálogo de Peças',
      actionCategory: 'revisao',
      bgGradient: 'from-slate-900 via-brand-blue/80 to-brand-blue',
    }
  ];

  // Auto Hero Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Sync Cart with LocalStorage on Mount
  useEffect(() => {
    const savedCart = localStorage.getItem('iguacu_geradores_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart data', e);
      }
    }
  }, []);

  // Save Cart to LocalStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('iguacu_geradores_cart', JSON.stringify(newCart));
  };

  // Add Item to Quote List
  const handleAddToQuote = (product: Product) => {
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      saveCart(updated);
    } else {
      saveCart([...cart, { product, quantity: 1 }]);
    }
    
    // Show beautiful toast
    setToastMessage(`"${product.name}" adicionado à sua lista de orçamento!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Remove Item / Update quantity
  const handleUpdateQuantity = (productId: string, delta: number) => {
    const updated = cart.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[];
    saveCart(updated);
  };

  const handleRemoveFromCart = (productId: string) => {
    const updated = cart.filter(item => item.product.id !== productId);
    saveCart(updated);
  };

  // Send Direct Single WhatsApp Message
  const sendSingleWhatsApp = (product: Product) => {
    const phone = '5545999299311'; // Formatted contact number: (45) 9 9929-9311
    const text = `Olá, Iguaçu Geradores! Gostaria de atendimento imediato para o seguinte item:\n\n` +
      `*Produto:* ${product.name}\n` +
      `${product.code ? `*Código/Ref:* ${product.code}\n` : ''}` +
      `*Marca:* ${product.brand}\n` +
      `${product.isConsultation ? '*Valor:* Sob Consulta' : `*Preço:* R$ ${product.discountPrice.toFixed(2)} à vista (ou em até ${product.installments}x sem juros)`}\n\n` +
      `Por favor, me informe a disponibilidade e o valor do frete para minha região.`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Precomputed Consolidated WhatsApp URL for quote cart to allow reliable <a> links
  const consolidatedWhatsAppUrl = useMemo(() => {
    if (cart.length === 0) return '';
    const phone = '5545999299311';
    let text = `Olá, Iguaçu Geradores! Gostaria de solicitar o orçamento para a seguinte lista de itens:\n\n`;
    
    cart.forEach((item, index) => {
      text += `${index + 1}) *${item.quantity}x* - ${item.product.name}\n`;
      if (item.product.code) text += `   _Ref: ${item.product.code}_\n`;
      text += `   _Marca: ${item.product.brand}_\n`;
      text += `   _Valor unitário: ${item.product.isConsultation ? 'Sob Consulta' : `R$ ${item.product.discountPrice.toFixed(2)}`}_\n\n`;
    });

    text += `*Dados do Solicitante:*\n`;
    text += `Olá, estou enviando através do catálogo online. Aguardo contato técnico com as condições comerciais.`;
    
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }, [cart]);

  // Send Consolidated Multi-item WhatsApp Message (Fallback)
  const sendConsolidatedQuote = () => {
    if (!consolidatedWhatsAppUrl) return;
    window.open(consolidatedWhatsAppUrl, '_blank');
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      // Brand filter
      const matchesBrand = selectedBrand === 'all' || product.brand.toLowerCase() === selectedBrand.toLowerCase();
      
      // Search query
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (product.code && product.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesBrand && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'lowest') return a.price - b.price;
      if (sortBy === 'highest') return b.price - a.price;
      if (sortBy === 'alphabetical') return a.name.localeCompare(b.name);
      // Default / Popularity (fallback to original order or features first)
      return (b.tag === 'destaque' ? 1 : 0) - (a.tag === 'destaque' ? 1 : 0);
    });
  }, [selectedCategory, selectedBrand, searchQuery, sortBy]);

  // Lead Form Submission handler
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    setLeadSubmitted(true);
  };

  // Quick helper to scroll to target sections
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 font-sans">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-brand-red text-slate-900 py-2 px-4 text-xs md:text-sm font-semibold z-40 relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-4">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="inline-block w-2.5 h-2.5 bg-brand-blue rounded-full animate-ping"></span>
            <span className="font-bold tracking-wide">PLANTÃO 24 HORAS:</span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <a href="tel:+5545999299311" className="hover:underline flex items-center gap-1 font-extrabold">
                <Phone className="w-3.5 h-3.5 inline text-brand-blue" /> (45) 9 9929-9311
              </a>
              <span className="text-slate-900 font-bold hidden sm:inline">•</span>
              <a href="tel:+5545999979650" className="hover:underline flex items-center gap-1 font-extrabold">
                <Phone className="w-3.5 h-3.5 inline text-brand-blue" /> (45) 9 9997-9650
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="flex items-center gap-1"><Truck className="w-4 h-4 text-brand-blue" /> ENVIOS DE PEÇAS PARA TODO O BRASIL</span>
            <span className="flex items-center gap-1"><CreditCard className="w-4 h-4 text-brand-blue" /> PARCELAMENTO EM ATÉ 12X</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="bg-black/10 px-2 py-0.5 rounded text-[10px] md:text-xs font-bold text-slate-900">
              SUPORTE IMEDIATO VIA WHATSAPP
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="sticky top-0 bg-white shadow-md z-40 transition-all border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden p-2 text-slate-600 hover:text-brand-blue"
              aria-label="Toggle Menu"
              id="btn-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div 
              onClick={() => {
                setSelectedCategory('all');
                scrollToSection('top');
              }}
              className="cursor-pointer flex flex-col justify-start"
              id="brand-logo"
            >
              <div className="flex items-center gap-1">
                <span className="text-2xl md:text-3xl font-extrabold tracking-tighter text-brand-blue font-heading italic uppercase drop-shadow-sm">
                  Iguaçu
                </span>
                <span className="text-2xl md:text-3xl font-extrabold tracking-tighter text-brand-red font-heading italic uppercase drop-shadow-sm">
                  Geradores
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1 block pl-2">
                Vendas • Manutenção • Peças • 24h
              </span>
            </div>
          </div>

          {/* Search bar Desktop */}
          <div className="hidden lg:flex flex-1 max-w-xl relative" id="search-bar-desktop">
            <input 
              type="text" 
              placeholder="O que você está procurando? (Ex: Filtro, Controlador, WEG, etc...)" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                scrollToSection('catalogo');
              }}
              className="w-full pl-4 pr-10 py-2.5 rounded-full bg-slate-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue border-transparent focus:border-transparent text-sm transition-all"
            />
            <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-3" />
          </div>

          {/* Contact & Quote Cart Widget */}
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* Urgent Support Buttons */}
            <div className="hidden sm:flex flex-col lg:flex-row items-stretch lg:items-center gap-2" id="header-support-whatsapp-container">
              <a 
                href="https://wa.me/5545999299311" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-50 px-3.5 py-1.5 rounded-full border border-green-200 hover:bg-green-100 transition-all group"
                id="btn-support-whatsapp-1"
              >
                <MessageSquare className="w-3.5 h-3.5 text-green-500 fill-current" />
                <div className="text-left">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold leading-none">WhatsApp 1</span>
                  <span className="text-xs text-green-700 font-bold leading-none">(45) 9 9929-9311</span>
                </div>
              </a>
              <a 
                href="https://wa.me/5545999979650" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-50 px-3.5 py-1.5 rounded-full border border-green-200 hover:bg-green-100 transition-all group"
                id="btn-support-whatsapp-2"
              >
                <MessageSquare className="w-3.5 h-3.5 text-green-500 fill-current" />
                <div className="text-left">
                  <span className="text-[9px] text-slate-500 block uppercase font-bold leading-none">WhatsApp 2</span>
                  <span className="text-xs text-green-700 font-bold leading-none">(45) 9 9997-9650</span>
                </div>
              </a>
            </div>

            {/* Quote Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-brand-blue transition-all"
              aria-label="Abrir orçamento"
              id="btn-open-quote-drawer"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-red text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 3. HORIZONTAL MENU (CATEGORIES) DESKTOP */}
        <nav className="bg-brand-blue text-white overflow-x-auto scrollbar-none border-t border-brand-blue/30" id="desktop-category-nav">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-start lg:justify-between gap-1 md:gap-4 whitespace-nowrap text-xs md:text-sm font-semibold">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  scrollToSection('catalogo');
                }}
                className={`px-4 py-3 md:py-3.5 border-b-2 transition-all relative uppercase tracking-wider ${
                  selectedCategory === category.id 
                    ? 'border-brand-red text-white bg-white/5 font-bold' 
                    : 'border-transparent text-slate-200 hover:text-white hover:bg-white/5'
                }`}
              >
                {category.name}
                {selectedCategory === category.id && (
                  <motion.div 
                    layoutId="activeCategory"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-red" 
                  />
                )}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* MOBILE SEARCH BAR */}
      <div className="lg:hidden p-4 bg-white shadow-sm border-b border-slate-100" id="search-bar-mobile">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Buscar filtros, disjuntores, geradores..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              scrollToSection('catalogo');
            }}
            className="w-full pl-4 pr-10 py-2.5 rounded-lg bg-slate-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue border-transparent text-sm transition-all"
          />
          <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-3" />
        </div>
      </div>

      {/* MOBILE MENU NAV DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-[280px] bg-white z-50 shadow-2xl p-6 flex flex-col justify-between lg:hidden"
              id="mobile-drawer"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-extrabold tracking-tighter text-brand-blue font-heading italic uppercase">
                      Iguaçu
                    </span>
                    <span className="text-xl font-extrabold tracking-tighter text-brand-red font-heading italic uppercase">
                      Geradores
                    </span>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-500 hover:text-brand-blue">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Categorias</p>
                  {CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setIsMobileMenuOpen(false);
                        scrollToSection('catalogo');
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                        selectedCategory === category.id
                          ? 'bg-brand-blue text-white font-bold'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span>{category.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  ))}
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6 space-y-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Suporte & Contato</p>
                  <div className="space-y-2">
                    <a href="tel:+5545999299311" className="flex items-center gap-2 text-sm text-slate-700 hover:text-brand-blue font-medium">
                      <Phone className="w-4 h-4 text-brand-red shrink-0" />
                      <span>(45) 9 9929-9311</span>
                    </a>
                    <a href="https://wa.me/5545999299311" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium">
                      <MessageSquare className="w-4 h-4 fill-current text-green-500 shrink-0" />
                      <span>WhatsApp 1</span>
                    </a>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-slate-100/50">
                    <a href="tel:+5545999979650" className="flex items-center gap-2 text-sm text-slate-700 hover:text-brand-blue font-medium">
                      <Phone className="w-4 h-4 text-brand-red shrink-0" />
                      <span>(45) 9 9997-9650</span>
                    </a>
                    <a href="https://wa.me/5545999979650" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium">
                      <MessageSquare className="w-4 h-4 fill-current text-green-500 shrink-0" />
                      <span>WhatsApp 2</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl text-center">
                <span className="text-xs text-slate-500 block">Atendimento Técnico</span>
                <span className="text-sm font-bold text-brand-blue">Iguaçu Grupos Geradores</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 4. HERO SECTION WITH CAROUSEL */}
      <section className="relative overflow-hidden bg-brand-dark min-h-[420px] md:min-h-[480px] lg:min-h-[520px] flex items-center" id="top">
        {/* Background Visual Animations */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-brand-blue filter blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-brand-red filter blur-[150px] animate-pulse"></div>
        </div>

        {/* Carousel Content */}
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative z-10 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl text-left"
            >
              <span className="inline-block bg-brand-red text-slate-900 text-[11px] md:text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-6 border border-brand-red/30 shadow-md">
                {heroSlides[activeSlide].badge}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 font-heading">
                {heroSlides[activeSlide].title}
              </h1>
              <p className="text-slate-300 text-base md:text-lg lg:text-xl font-light mb-8 max-w-2xl leading-relaxed">
                {heroSlides[activeSlide].subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <button
                  onClick={() => {
                    setSelectedCategory(heroSlides[activeSlide].actionCategory);
                    scrollToSection('catalogo');
                  }}
                  className="bg-brand-red text-slate-900 hover:bg-brand-red/95 px-8 py-4 rounded-xl text-sm md:text-base font-extrabold shadow-lg shadow-brand-red/20 hover:shadow-brand-red/45 transition-all text-center flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>{heroSlides[activeSlide].buttonText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="https://wa.me/5545999299311?text=Olá,%20Iguaçu%20Geradores!%20Gostaria%20de%20falar%20com%20um%20especialista%20sobre%20geradores."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/40 px-8 py-4 rounded-xl text-sm md:text-base font-bold transition-all text-center flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5 fill-current text-green-400" />
                  Atendimento WhatsApp
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Slide Indicators */}
          <div className="absolute bottom-6 left-4 right-4 flex justify-between items-center z-10">
            <div className="flex gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeSlide ? 'w-8 bg-brand-red' : 'w-2.5 bg-slate-500 hover:bg-slate-400'
                  }`}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>
            <div className="text-white/40 text-xs font-mono hidden sm:block">
              IGUAÇU ENERGIA - EXCELÊNCIA TÉCNICA
            </div>
          </div>
        </div>
      </section>

      {/* 5. BENEFITS BAR */}
      <section className="bg-white border-b border-slate-100 py-6 md:py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          
          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-brand-blue shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base leading-tight">FACILIDADE NO PAGAMENTO</h3>
              <p className="text-xs text-slate-500 mt-0.5">Em até 12x no cartão ou desconto especial à vista no PIX.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-brand-blue shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base leading-tight">LOGÍSTICA AGILIZADA</h3>
              <p className="text-xs text-slate-500 mt-0.5">Envio de peças e acessórios para todo o território nacional.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-brand-blue shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base leading-tight">PEÇAS & SERVIÇOS ORIGINAIS</h3>
              <p className="text-xs text-slate-500 mt-0.5">Trabalhamos apenas com peças certificadas e garantia de fábrica.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0 border border-green-200">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-green-800 text-sm md:text-base leading-tight flex items-center gap-1.5">
                PLANTÃO 24H IMEDIATO
              </h3>
              <p className="text-xs text-green-700 mt-0.5">Suporte emergencial aos domingos, feriados e madrugadas.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. POPULAR QUICK ACCESS CATEGORIES (Tudo em...) */}
      <section className="py-12 px-4 bg-slate-50 max-w-7xl mx-auto w-full">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 border-l-4 border-brand-red pl-3 uppercase tracking-wider font-heading">
          Navegue pelas Categorias Principais
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div 
            onClick={() => { setSelectedCategory('eletrica'); scrollToSection('catalogo'); }}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200/60 hover:border-brand-blue/50 hover:shadow-lg transition-all flex flex-col justify-between h-[180px] relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-blue/5 text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Tudo em</span>
              <h3 className="font-extrabold text-slate-800 group-hover:text-brand-blue text-sm md:text-lg transition-all">
                Controladores & Elétrica
              </h3>
            </div>
            <div className="absolute top-2 right-2 opacity-5 text-brand-blue/10 font-heading text-8xl pointer-events-none font-bold">1</div>
          </div>

          <div 
            onClick={() => { setSelectedCategory('revisao'); scrollToSection('catalogo'); }}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200/60 hover:border-brand-blue/50 hover:shadow-lg transition-all flex flex-col justify-between h-[180px] relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-blue/5 text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Tudo em</span>
              <h3 className="font-extrabold text-slate-800 group-hover:text-brand-blue text-sm md:text-lg transition-all">
                Filtros & Revisão
              </h3>
            </div>
            <div className="absolute top-2 right-2 opacity-5 text-brand-blue/10 font-heading text-8xl pointer-events-none font-bold">2</div>
          </div>

          <div 
            onClick={() => { setSelectedCategory('geradores'); scrollToSection('catalogo'); }}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200/60 hover:border-brand-blue/50 hover:shadow-lg transition-all flex flex-col justify-between h-[180px] relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-blue/5 text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Tudo em</span>
              <h3 className="font-extrabold text-slate-800 group-hover:text-brand-blue text-sm md:text-lg transition-all">
                Grupos Geradores
              </h3>
            </div>
            <div className="absolute top-2 right-2 opacity-5 text-brand-blue/10 font-heading text-8xl pointer-events-none font-bold">3</div>
          </div>

          <div 
            onClick={() => { setSelectedCategory('servicos'); scrollToSection('catalogo'); }}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200/60 hover:border-brand-blue/50 hover:shadow-lg transition-all flex flex-col justify-between h-[180px] relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-blue/5 text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Tudo em</span>
              <h3 className="font-extrabold text-slate-800 group-hover:text-brand-blue text-sm md:text-lg transition-all">
                Manutenção & Serviços
              </h3>
            </div>
            <div className="absolute top-2 right-2 opacity-5 text-brand-blue/10 font-heading text-8xl pointer-events-none font-bold">4</div>
          </div>

        </div>
      </section>

      {/* 7. CORE E-COMMERCE / CATALOG SECTION */}
      <section className="py-16 px-4 bg-white border-t border-slate-100" id="catalogo">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Heading & Interactive Filter bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-slate-100 pb-8">
            <div>
              <span className="text-brand-blue text-xs font-bold tracking-widest block uppercase mb-2">Nosso Portfólio</span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-none font-heading uppercase">
                {CATEGORIES.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-slate-500 text-sm mt-2 max-w-xl">
                Selecione as peças necessárias, adicione ao orçamento coletivo ou clique no botão verde para tirar dúvidas imediatas no WhatsApp.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Brand Selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-400 uppercase">Fabricante:</span>
                <select 
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-2.5 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-brand-blue"
                >
                  <option value="all">Todas as Marcas</option>
                  <option value="Iguaçu">Iguaçu Geradores</option>
                  <option value="Baudouin">Baudouin</option>
                  <option value="WEG">WEG / KVA</option>
                  <option value="DSE">Deep Sea (DSE)</option>
                  <option value="Chint">Chint Electric</option>
                  <option value="Teccom">Teccom</option>
                  <option value="Fleetguard">Fleetguard</option>
                </select>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-400 uppercase">Ordenar:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-2.5 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-brand-blue"
                >
                  <option value="popular">Destaques / Relevância</option>
                  <option value="lowest">Menor Preço</option>
                  <option value="highest">Maior Preço</option>
                  <option value="alphabetical">A - Z (Nome)</option>
                </select>
              </div>

              {/* Clear filters if set */}
              {(selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery !== '') && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBrand('all');
                    setSearchQuery('');
                  }}
                  className="text-xs text-brand-red font-bold hover:underline py-1.5 px-2.5"
                >
                  Limpar Filtros
                </button>
              )}
            </div>
          </div>

          {/* NO PRODUCTS FOUND STATE */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 px-4 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Nenhum produto encontrado</h3>
              <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
                Não encontramos itens correspondentes aos termos digitados ou filtros selecionados. Tente buscar por outros termos ou entre em contato direto via WhatsApp.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setSearchQuery('');
                }}
                className="mt-6 inline-flex items-center gap-2 bg-brand-blue text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-brand-blue/90 transition-all"
              >
                Resetar todos os filtros
              </button>
            </div>
          ) : (
            /* PRODUCT GRID layout */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={product.id}
                    className="group bg-white rounded-2xl border border-slate-200/70 hover:border-brand-blue/30 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between h-full relative"
                  >
                    {/* Badge status (DESTAQUE / LANÇAMENTO) */}
                    {product.tag !== 'normal' && (
                      <div className="absolute top-3 left-3 z-20">
                        <span className={`text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-md shadow-sm ${
                          product.tag === 'destaque' ? 'bg-brand-red text-slate-900' : 'bg-brand-blue text-white'
                        }`}>
                          {product.tag === 'destaque' ? 'Destaque' : 'Lançamento'}
                        </span>
                      </div>
                    )}

                    {/* Brand indicator top right */}
                    <div className="absolute top-3 right-3 z-20">
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-slate-200/50">
                        {product.brand}
                      </span>
                    </div>

                    {/* Highly Professional Schematic Vector Placeholder / Visual overlay */}
                    <div className="relative bg-slate-100 h-48 flex items-center justify-center overflow-hidden border-b border-slate-100 shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/5 to-slate-200/10 z-0"></div>
                      
                      {/* Product Specific Vector graphics */}
                      <div className="relative z-10 w-24 h-24 text-brand-blue/80 group-hover:scale-105 transition-transform duration-300">
                        <ProductVisual category={product.category} id={product.id} />
                      </div>

                      {/* Small hover specs detail container */}
                      <div className="absolute inset-x-0 bottom-0 bg-slate-900/90 text-white p-3 text-xs translate-y-full group-hover:translate-y-0 transition-all duration-300 z-10 font-light backdrop-blur-sm line-clamp-3">
                        {product.description || 'Disponibilidade de entrega expressa de peças sob encomenda.'}
                      </div>
                    </div>

                    {/* Product Metadata & pricing */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Rating stars */}
                        <div className="flex gap-0.5 text-amber-400 mb-1.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 fill-current ${
                                i < product.rating ? 'text-amber-400' : 'text-slate-200'
                              }`} 
                            />
                          ))}
                        </div>

                        {/* Product title */}
                        <h3 className="font-semibold text-slate-800 text-sm md:text-sm leading-snug hover:text-brand-blue transition-colors line-clamp-2 min-h-[40px]">
                          {product.name}
                        </h3>

                        {/* Part Number code */}
                        {product.code && (
                          <span className="inline-block font-mono text-[11px] text-slate-400 mt-1 uppercase">
                            Ref: {product.code}
                          </span>
                        )}
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100">
                        {product.isConsultation ? (
                          <div className="mb-4">
                            <span className="text-slate-500 text-xs block font-medium">Equipamento ou Serviço Especial</span>
                            <span className="text-brand-blue text-base font-extrabold tracking-tight block uppercase mt-0.5">
                              Produto Sob Consulta
                            </span>
                            <span className="text-[10px] text-slate-400 block mt-0.5">
                              Dimensionamento comercial dedicado
                            </span>
                          </div>
                        ) : (
                          <div className="mb-4">
                            {/* Pix Cash Discount Price */}
                            <span className="text-slate-400 text-[10px] block line-through">
                              R$ {(product.price * 1.05).toFixed(2)}
                            </span>
                            <div className="flex items-baseline gap-1.5 mt-0.5">
                              <span className="text-brand-blue text-lg font-black tracking-tight">
                                R$ {product.discountPrice.toFixed(2)}
                              </span>
                              <span className="text-emerald-600 text-[10px] font-bold bg-emerald-50 px-1 py-0.5 rounded">
                                à vista (PIX)
                              </span>
                            </div>
                            
                            {/* Installment terms */}
                            <span className="text-slate-500 text-[11px] block mt-0.5">
                              ou <span className="font-bold">{product.installments}x de R$ {product.installmentValue.toFixed(2)}</span> sem juros
                            </span>
                          </div>
                        )}

                        {/* Green Direct WhatsApp Button & Add to Quote button */}
                        <div className="space-y-2">
                          <a
                            href={`https://wa.me/5545999299311?text=${encodeURIComponent(
                              `Olá, Iguaçu Geradores! Gostaria de atendimento imediato para o seguinte item:\n\n` +
                              `*Produto:* ${product.name}\n` +
                              `${product.code ? `*Código/Ref:* ${product.code}\n` : ''}` +
                              `*Marca:* ${product.brand}\n` +
                              `${product.isConsultation ? '*Valor:* Sob Consulta' : `*Preço:* R$ ${product.discountPrice.toFixed(2)} à vista (ou em até ${product.installments}x sem juros)`}\n\n` +
                              `Por favor, me informe a disponibilidade e o valor do frete para minha região.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-brand-green hover:bg-green-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-green-500/10 cursor-pointer"
                            id={`btn-whatsapp-${product.id}`}
                          >
                            <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                            <span>Atendimento Imediato</span>
                          </a>

                          <button
                            onClick={() => handleAddToQuote(product)}
                            className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                              cart.some(item => item.product.id === product.id)
                                ? 'bg-slate-100 text-brand-blue border border-slate-200'
                                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
                            }`}
                            id={`btn-quote-${product.id}`}
                          >
                            {cart.some(item => item.product.id === product.id) ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-brand-blue" />
                                <span>Adicionado ({cart.find(item => item.product.id === product.id)?.quantity})</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Adicionar ao Orçamento</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* 8. BRANDS LOGO GRID SECTION */}
      <section className="py-14 px-4 bg-slate-50 border-t border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-brand-blue text-xs font-bold tracking-widest uppercase block mb-2">Parceiros Globais</span>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 uppercase tracking-tight leading-none font-heading">
              Trabalhamos com as Maiores Marcas de Geradores
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {BRANDS.map((brand, i) => (
              <div 
                key={i} 
                onClick={() => {
                  setSelectedBrand(brand.name);
                  scrollToSection('catalogo');
                }}
                className="bg-white rounded-xl p-5 border border-slate-200/60 hover:border-brand-blue/30 shadow-sm hover:shadow-md text-center transition-all cursor-pointer group"
              >
                <div className="font-heading font-black text-lg text-slate-700 tracking-tighter group-hover:text-brand-blue group-hover:scale-105 transition-all">
                  {brand.logoText}
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">
                  {brand.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. MAINTENANCE & SUPPORT SERVICE INFORMATION */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden" id="servicos-info">
        {/* Absolute visuals */}
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-brand-blue/5 filter blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-brand-red/5 filter blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Detail */}
          <div className="space-y-6">
            <span className="text-brand-blue text-xs font-bold tracking-widest uppercase block">Energia Sem Interrupções</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-heading">
              Energia Ininterrupta para Empresas, Indústrias, Agronegócio e Residências
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              A <strong className="font-bold text-brand-blue">Iguaçu Geradores</strong> é referência na venda de grupos geradores conforme dimensionamento técnico preciso, projetados sob medida para a sua demanda. Oferecemos grupos geradores personalizados, com ou sem cabine, dimensionados de acordo com a necessidade de cada cliente. Trabalhamos com equipamentos de alta qualidade e realizamos a instalação completa, do projeto à entrega.
            </p>

            {/* List of guarantees */}
            <div className="space-y-4 pt-2">
              <div className="flex gap-3">
                <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3px]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Manutenções Preventivas Programadas</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Realizamos planos de manutenção preventiva personalizados, desenvolvidos conforme a necessidade de cada cliente e a criticidade da operação. A periodicidade pode ser semanal, quinzenal, mensal ou conforme um cronograma específico, garantindo maior confiabilidade, desempenho e vida útil do grupo gerador.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3px]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Plantão de Emergência 24 Horas</h4>
                  <p className="text-xs text-slate-500">Atendimento rápido em todo o estado para solucionar panes elétricas ou falhas na inicialização do gerador.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3px]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Suporte na Instalação de Quadros QTA</h4>
                  <p className="text-xs text-slate-500">Desenvolvimento, montagem e comissionamento de painéis automáticos para transferência sem atraso.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="https://wa.me/5545999299311?text=Olá,%20Iguaçu%20Geradores!%20Gostaria%20de%20solicitar%20uma%20visita%20técnica%20de%20manutenção."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-red text-slate-900 font-extrabold px-6 py-3.5 rounded-xl text-sm shadow-md hover:bg-brand-red/90 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Wrench className="w-4 h-4 text-slate-900" />
                Agendar Visita Técnica
              </a>
              <button
                onClick={() => {
                  scrollToSection('contratos-manutencao');
                }}
                className="bg-slate-100 text-slate-700 font-bold px-6 py-3.5 rounded-xl text-sm hover:bg-slate-200 transition-all"
              >
                Ver Contratos de Manutenção
              </button>
            </div>
          </div>

          {/* Right Lead Form Container */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/70 shadow-lg relative">
            <div className="absolute top-4 right-4 bg-brand-blue/10 text-brand-blue text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Plantão Ativo
            </div>

            <h3 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight mb-2">
              Solicite uma Consultoria Técnica Rápida
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Preencha os campos abaixo para que nosso especialista entre em contato em menos de 15 minutos via ligação ou WhatsApp.
            </p>

            {leadSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-brand-green rounded-full flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-9 h-9 stroke-[3px]" />
                </div>
                <h4 className="text-lg font-extrabold text-slate-900 font-heading">Sua Solicitação foi Registrada!</h4>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Olá <strong className="font-bold text-slate-800">{leadName}</strong>, recebemos seus dados de contato. Para falar com o plantão emergencial agora mesmo, clique no botão verde abaixo para abrir o chat seguro do WhatsApp:
                </p>
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={`https://wa.me/5545999299311?text=${encodeURIComponent(
                      `Olá, Iguaçu Geradores!\n` +
                      `Acabei de preencher o formulário de consultoria técnica rápida no site:\n\n` +
                      `*Nome:* ${leadName}\n` +
                      `*Telefone:* ${leadPhone}\n` +
                      `*E-mail:* ${leadEmail || 'Não informado'}\n` +
                      `*Mensagem:* ${leadMessage || 'Solicito contato para manutenção/peças.'}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-brand-green hover:bg-green-600 text-white font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/20 cursor-pointer block text-center uppercase tracking-wide"
                  >
                    <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                    <span>WhatsApp 1</span>
                  </a>
                  <a
                    href={`https://wa.me/5545999979650?text=${encodeURIComponent(
                      `Olá, Iguaçu Geradores!\n` +
                      `Acabei de preencher o formulário de consultoria técnica rápida no site:\n\n` +
                      `*Nome:* ${leadName}\n` +
                      `*Telefone:* ${leadPhone}\n` +
                      `*E-mail:* ${leadEmail || 'Não informado'}\n` +
                      `*Mensagem:* ${leadMessage || 'Solicito contato para manutenção/peças.'}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-brand-green hover:bg-green-600 text-white font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/20 cursor-pointer block text-center uppercase tracking-wide"
                  >
                    <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                    <span>WhatsApp 2</span>
                  </a>
                </div>
                <button
                  onClick={() => {
                    setLeadName('');
                    setLeadPhone('');
                    setLeadEmail('');
                    setLeadMessage('');
                    setLeadSubmitted(false);
                  }}
                  className="text-xs text-slate-400 hover:text-brand-blue font-bold block mx-auto underline pt-2"
                >
                  Fazer outra solicitação
                </button>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Seu Nome / Razão Social *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: João da Silva / Hospital Central"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Telefone WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: (51) 99999-9999"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">E-mail de Contato</label>
                    <input
                      type="email"
                      placeholder="Ex: contato@empresa.com"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Descreva sua Necessidade</label>
                  <textarea
                    rows={3}
                    placeholder="Ex: Preciso de cotação de filtros para gerador Baudouin de 150kva, ou agendar preventivo."
                    value={leadMessage}
                    onChange={(e) => setLeadMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={leadSubmitted}
                  className={`w-full font-bold py-3 px-4 rounded-xl text-sm text-white flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    leadSubmitted ? 'bg-slate-400' : 'bg-brand-blue hover:bg-brand-blue/95 shadow-lg shadow-brand-blue/15'
                  }`}
                  id="btn-lead-submit"
                >
                  <Send className="w-4 h-4" />
                  <span>Iniciar Atendimento de Plantão</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* NEW SECTION: PERSONALIZED MAINTENANCE CONTRACTS */}
      <section className="py-20 px-4 bg-slate-900 text-white relative overflow-hidden" id="contratos-manutencao">
        {/* Subtle grid pattern or radial glow background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(220,38,38,0.05),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-brand-blue text-xs font-bold tracking-widest uppercase block mb-3">CONTRATOS DE MANUTENÇÃO</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-heading">
              Planos de Manutenção Preventiva Personalizados
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-4 leading-relaxed">
              Garantia de energia 24h por dia, com atendimento prioritário e custos sob controle. Criamos o plano ideal sob medida para a demanda do seu estabelecimento.
            </p>
            <div className="mt-10">
              <a
                href="https://wa.me/5545999299311?text=Olá,%20Iguaçu%20Geradores!%20Preciso%20de%20um%20contrato%20de%20manutenção%20personalizado%20com%20escopo%20sob%20medida."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue/90 text-white font-extrabold py-4 px-8 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-brand-blue/25 cursor-pointer"
              >
                <span>Elaborar Plano Customizado</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. REAL CUSTOMER TESTIMONIALS */}
      <section className="py-16 px-4 bg-white border-t border-slate-100" id="depoimentos">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-blue text-xs font-bold tracking-widest uppercase block mb-2">Quem Confia</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              O Que Nossos Clientes Dizem
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-lg mx-auto">
              Empresas, comércios e condomínios residenciais que contam com o suporte de energia da Iguaçu Geradores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/50 flex flex-col justify-between"
              >
                <div>
                  {/* Rating stars */}
                  <div className="flex gap-0.5 text-amber-400 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                    ))}
                  </div>
                  
                  {/* Text quote */}
                  <p className="text-slate-600 text-sm italic leading-relaxed mb-6">
                    "{testimonial.text}"
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-200/40">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm leading-none">{testimonial.name}</h4>
                    <span className="text-xs text-slate-400 font-medium block mt-1">{testimonial.company}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. INTERACTIVE FAQ SECTION */}
      <section className="py-16 px-4 bg-slate-50 border-t border-slate-100" id="faq">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-blue text-xs font-bold tracking-widest uppercase block mb-2">Dúvidas Frequentes</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-heading uppercase">
              Perguntas sobre Geradores & Suporte
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Selecione uma dúvida para ver a resposta detalhada de nossa equipe técnica.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Como funciona o atendimento do plantão emergencial 24h?",
                a: "Nosso plantão emergencial está disponível 24 horas por dia, 7 dias por semana, inclusive domingos e feriados. Ao acionar os números (45) 9 9929-9311 ou (45) 9 9997-9650, você fala diretamente com um engenheiro ou técnico especializado que dará o primeiro diagnóstico por telefone e, se necessário, enviará uma equipe técnica equipada imediatamente até o local."
              },
              {
                q: "Qual a diferença entre a manutenção preventiva e a corretiva?",
                a: "A manutenção preventiva consiste em inspeções programadas para troca de oleo lubrificante, filtros de combustivel, oleo e ar e verificação de componentes eletricos, e simulação de falta de energia, garantindo que o gerador funcione perfeitamente quando for acionado de surpresa. A manutenção corretiva é realizada após o surgimento de uma falha para consertar ou substituir componentes danificados de forma emergencial."
              },
              {
                q: "Vocês enviam peças de gerador para todo o Brasil?",
                a: "Sim, enviamos toda a nossa linha de peças de reposição via transportadoras rápidas ou Correios para qualquer estado do Brasil, com rastreamento completo."
              },
              {
                q: "Como escolher o tamanho/potência correto do gerador para a minha empresa?",
                a: "A potência de um grupo gerador é medida em kVA e depende diretamente da carga elétrica de todos os equipamentos que precisam continuar funcionando. Nossa equipe técnica oferece assessoria gratuita para dimensionar o seu gerador com base na sua conta de energia ou em medições no local."
              }
            ].map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-800 text-sm md:text-base">{faq.q}</span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 border-t border-slate-100 text-slate-600 text-sm leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. INSTITUTIONAL FOOTER */}
      <footer className="bg-brand-dark text-slate-300 pt-16 pb-8 border-t border-slate-800" id="footer">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Col 1: About company */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <Logo className="h-10 mb-2" />
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold pl-2">
                Sistemas de Energia Integrada
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Especialistas em energia e grupos geradores de energia diesel. Oferecemos vendas de equipamentos de alto padrão, estoque completo de peças sobressalentes originais, além de plantão técnico qualificado 24 horas.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-brand-red shrink-0" /> Rua Marechal Cândido Rondon, 651 - Santa Catarina, São Miguel do Iguaçu - PR, CEP 85877-000</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-brand-red shrink-0" /> iguacugeradores@gmail.com</p>
            </div>
          </div>

          {/* Col 2: Institutional links */}
          <div>
            <h3 className="font-heading font-extrabold text-white text-sm uppercase tracking-wider mb-6 border-l-2 border-brand-red pl-2">
              Institucional
            </h3>
            <ul className="space-y-3 text-xs text-slate-400 font-medium">
              <li><button onClick={() => scrollToSection('top')} className="hover:text-white transition-colors">Sobre a Empresa</button></li>
              <li><button onClick={() => scrollToSection('catalogo')} className="hover:text-white transition-colors">Política de Envio de Peças</button></li>
              <li><button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors">Garantia & Devoluções</button></li>
              <li><button onClick={() => { setSelectedCategory('geradores'); scrollToSection('catalogo'); }} className="hover:text-white transition-colors">Grupos Geradores Novos</button></li>
              <li><button onClick={() => { setSelectedCategory('servicos'); scrollToSection('catalogo'); }} className="hover:text-white transition-colors">Revisão e Manutenção</button></li>
              <li><button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors">Perguntas Frequentes</button></li>
              <li><button onClick={() => scrollToSection('servicos-info')} className="hover:text-white transition-colors">Fale Conosco</button></li>
            </ul>
          </div>

          {/* Col 3: Customer service & schedule */}
          <div>
            <h3 className="font-heading font-extrabold text-white text-sm uppercase tracking-wider mb-6 border-l-2 border-brand-red pl-2">
              Atendimento Técnico
            </h3>
            <ul className="space-y-4 text-xs text-slate-400">
              <li className="space-y-1.5">
                <span className="flex items-center gap-2 font-semibold text-slate-200">
                  <Phone className="w-4 h-4 text-brand-red shrink-0" /> Central & Vendas:
                </span>
                <div className="pl-6 space-y-1">
                  <a href="tel:+5545999299311" className="text-white hover:underline block font-bold">(45) 9 9929-9311</a>
                  <a href="tel:+5545999979650" className="text-white hover:underline block font-bold">(45) 9 9997-9650</a>
                </div>
              </li>
              <li className="space-y-1.5 border-t border-slate-800/60 pt-3">
                <span className="flex items-center gap-2 font-semibold text-slate-200">
                  <MessageSquare className="w-4 h-4 text-brand-green shrink-0 fill-current" /> Plantão 24h WhatsApp:
                </span>
                <div className="pl-6 space-y-1">
                  <a href="https://wa.me/5545999299311" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline block font-bold">(45) 9 9929-9311</a>
                  <a href="https://wa.me/5545999979650" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline block font-bold">(45) 9 9997-9650</a>
                </div>
              </li>
              <li className="text-slate-400 leading-normal pt-2 border-t border-slate-800/60">
                <strong>Horário Administrativo:</strong><br />
                Segunda a Sexta: 08h às 12h e 13:30 às 17:30
              </li>
              <li className="text-green-400 font-semibold flex items-center gap-1.5 pt-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-ping inline-block"></span>
                Técnicos de plantão aos finais de semana e feriados.
              </li>
            </ul>
          </div>

          {/* Col 4: Payments & Security credentials */}
          <div className="space-y-6">
            <div>
              <h3 className="font-heading font-extrabold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-red pl-2">
                Formas de Pagamento
              </h3>
              <p className="text-[10px] text-slate-400 mb-3">Aceitamos cartões de crédito, boleto faturado (sob análise) e PIX com desconto.</p>
              
              {/* Payment Card Icons Grid */}
              <div className="flex flex-wrap gap-2">
                {['Visa', 'MasterCard', 'Elo', 'Boleto', 'Pix', 'Faturado'].map((pay, i) => (
                  <span key={i} className="bg-slate-800 text-[10px] font-bold text-slate-300 px-2 py-1 rounded border border-slate-700/50 uppercase tracking-wider">
                    {pay}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading font-extrabold text-white text-sm uppercase tracking-wider mb-3">
                Segurança & Garantia
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 items-stretch text-center">
                <div className="bg-slate-800/80 px-3 py-2 rounded border border-slate-700 text-[10px] font-bold text-slate-300 flex items-center justify-center gap-1.5 uppercase">
                  <Shield className="w-3.5 h-3.5 text-green-400" /> Google Safe
                </div>
                <div className="bg-slate-800/80 px-3 py-2 rounded border border-slate-700 text-[10px] font-bold text-slate-300 flex items-center justify-center gap-1.5 uppercase">
                  <Check className="w-3.5 h-3.5 text-brand-red" /> Loja Protegida
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer legal notes */}
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800/60 text-center space-y-2">
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Valores válidos somente para vendas corporativas diretas e loja online. Nos reservamos o direito de corrigir possíveis erros gráficos de digitação.<br />
            IGUAÇU GRUPOS GERADORES LTDA • CNPJ: 44.656.764/0001-05<br />
            Rua Marechal Cândido Rondon, 651 - Santa Catarina, São Miguel do Iguaçu - PR - CEP: 85877-000<br />
            © {new Date().getFullYear()} Iguaçu Geradores S.A. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* 13. SIDE DRAWER - CONSOLIDATED QUOTE CART */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[460px] bg-white z-50 shadow-2xl p-6 flex flex-col justify-between"
              id="quote-cart-drawer"
            >
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-brand-blue" />
                    <h3 className="font-heading font-extrabold text-slate-900 text-lg uppercase tracking-tight">
                      Meu Orçamento de Peças
                    </h3>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)} 
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-4">
                      <ShoppingCart className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-slate-800 text-base">Sua lista está vazia</h4>
                    <p className="text-slate-500 text-xs mt-1.5 max-w-[280px]">
                      Navegue pelo nosso catálogo de geradores, peças mecânicas ou componentes elétricos e adicione itens para solicitar uma cotação unificada!
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        scrollToSection('catalogo');
                      }}
                      className="mt-6 bg-brand-blue text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-brand-blue/95 transition-all"
                    >
                      Ver Catálogo de Peças
                    </button>
                  </div>
                ) : (
                  /* Item list container */
                  <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/50 flex gap-2.5 text-xs text-brand-blue font-medium mb-2">
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Adicione múltiplas peças mecânicas e eletrônicas para enviar um único orçamentos via WhatsApp!</span>
                    </div>

                    {cart.map((item) => (
                      <div 
                        key={item.product.id}
                        className="flex gap-4 p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50/50 transition-all"
                      >
                        {/* Schematic Mini indicator */}
                        <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden relative border border-slate-200/30">
                          <div className="w-8 h-8 text-slate-600">
                            <ProductVisual category={item.product.category} id={item.product.id} />
                          </div>
                        </div>

                        {/* Title & dynamic pricing */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">
                            {item.product.name}
                          </h4>
                          {item.product.code && (
                            <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Ref: {item.product.code}</span>
                          )}

                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100/60">
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleUpdateQuantity(item.product.id, -1)}
                                className="w-6 h-6 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center text-xs"
                                aria-label="Diminuir"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-slate-800 px-1">{item.quantity}</span>
                              <button
                                onClick={() => handleUpdateQuantity(item.product.id, 1)}
                                className="w-6 h-6 rounded bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center text-xs"
                                aria-label="Aumentar"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Cost subtotal */}
                            <div className="text-right">
                              {item.product.isConsultation ? (
                                <span className="text-slate-500 font-bold text-[11px] uppercase tracking-wide">Sob Consulta</span>
                              ) : (
                                <span className="text-brand-blue font-bold text-xs">
                                  R$ {(item.product.discountPrice * item.quantity).toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Remove item button */}
                        <button
                          onClick={() => handleRemoveFromCart(item.product.id)}
                          className="text-slate-300 hover:text-brand-red transition-colors self-start p-1"
                          aria-label="Remover item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Subtotal & Call to action */}
              {cart.length > 0 && (
                <div className="pt-6 border-t border-slate-100 bg-white">
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Total de Itens:</span>
                      <span className="font-bold">{cart.reduce((sum, item) => sum + item.quantity, 0)} items</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-bold text-slate-800">Valor Estimado à vista (Pix):</span>
                      <div className="text-right">
                        <span className="text-brand-blue text-lg font-black tracking-tight block">
                          R$ {cart.reduce((sum, item) => sum + (item.product.isConsultation ? 0 : item.product.discountPrice * item.quantity), 0).toFixed(2)}
                        </span>
                        {cart.some(item => item.product.isConsultation) && (
                          <span className="text-[10px] text-brand-red font-bold uppercase tracking-wider block">
                            Contém itens sob consulta
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a
                      href={consolidatedWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-brand-green hover:bg-green-600 text-white font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-500/10 cursor-pointer"
                      id="btn-consolidated-quote-whatsapp"
                    >
                      <MessageSquare className="w-5 h-5 fill-current" />
                      <span>Enviar Orçamento via WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="w-full bg-slate-50 text-slate-600 font-bold py-3 px-4 rounded-xl text-xs hover:bg-slate-100 transition-all text-center block"
                    >
                      Continuar Escolhendo Peças
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* TOAST NOTIFICATION FOR INTERACTION FEEDBACK */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-4 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 z-50 text-xs md:text-sm flex items-center gap-3 max-w-sm"
          >
            <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center text-white shrink-0 font-bold">
              <Check className="w-3.5 h-3.5 text-white" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 14. DEDICATED FIXED FLOATING WHATSAPP BUTTON WITH EMERGENCY BADGE */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Quote floating badge count */}
        {cart.length > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => setIsCartOpen(true)}
            className="bg-brand-blue text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative pointer-events-auto hover:bg-brand-blue/95 transition-transform hover:scale-105"
            aria-label="Abrir Orçamento"
            id="floating-quote-cart"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-white">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </motion.button>
        )}

        {/* Floating WhatsApp Menu */}
        <AnimatePresence>
          {isWhatsappMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.8 }}
              className="bg-white rounded-2xl shadow-2xl p-4 border border-slate-100 flex flex-col gap-2 pointer-events-auto w-64 mr-2 mb-1"
            >
              <div className="text-center pb-2 border-b border-slate-100">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-extrabold block">Plantão Técnico 24h</span>
                <span className="text-xs font-bold text-slate-700">Selecione um canal:</span>
              </div>
              <a
                href="https://wa.me/5545999299311?text=Olá,%20Iguaçu%20Geradores!%20Preciso%20de%20atendimento%20técnico%20de%20plantão."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-50 hover:bg-green-100 p-2.5 rounded-xl border border-green-200 text-green-800 text-xs font-bold transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 shadow-md">
                  <MessageSquare className="w-4 h-4 fill-current" />
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-[10px] text-green-600 font-extrabold uppercase">WhatsApp 1</span>
                  <span className="block text-xs font-black text-slate-800">(45) 9 9929-9311</span>
                </div>
              </a>
              <a
                href="https://wa.me/5545999979650?text=Olá,%20Iguaçu%20Geradores!%20Preciso%20de%20atendimento%20técnico%20de%20plantão."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-50 hover:bg-green-100 p-2.5 rounded-xl border border-green-200 text-green-800 text-xs font-bold transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 shadow-md">
                  <MessageSquare className="w-4 h-4 fill-current" />
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-[10px] text-green-600 font-extrabold uppercase">WhatsApp 2</span>
                  <span className="block text-xs font-black text-slate-800">(45) 9 9997-9650</span>
                </div>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Big WhatsApp button */}
        <motion.button
          onClick={() => setIsWhatsappMenuOpen(!isWhatsappMenuOpen)}
          className={`text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl relative pointer-events-auto hover:scale-105 transition-all duration-300 ${
            isWhatsappMenuOpen ? 'bg-slate-700 rotate-90' : 'bg-brand-green animate-pulse-gentle'
          }`}
          aria-label="Contato de Emergência no WhatsApp"
          id="floating-whatsapp-trigger"
        >
          {isWhatsappMenuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <MessageSquare className="w-8 h-8 fill-current" />
          )}
        </motion.button>
      </div>
    </div>
  );
}

/**
 * Custom Technical Vector Visual component representing different types of industrial generator parts.
 * Adds elite craftsmanship, preventing AI-style "broken image placeholders" with highly detailed SVG layouts.
 */
function ProductVisual({ category, id }: { category: string; id: string }) {
  if (category === 'geradores' || id.includes('gerador')) {
    // Diesel Generator Visual
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-slate-700">
        <rect x="15" y="30" width="70" height="45" rx="4" fill="#e2e8f0" stroke="#0f3a60" strokeWidth="2.5" />
        <rect x="25" y="40" width="20" height="25" rx="1.5" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
        <line x1="30" y1="47" x2="40" y2="47" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="30" y1="52" x2="40" y2="52" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="30" y1="57" x2="35" y2="57" stroke="#94a3b8" strokeWidth="1.5" />
        <rect x="52" y="40" width="22" height="18" rx="2" fill="#0f3a60" />
        <circle cx="63" cy="49" r="3" fill="#38bdf8" />
        <rect x="35" y="20" width="8" height="10" fill="#475569" />
        <rect x="37" y="10" width="4" height="10" fill="#334155" />
        <line x1="20" y1="75" x2="20" y2="82" stroke="#0f3a60" strokeWidth="3" />
        <line x1="80" y1="75" x2="80" y2="82" stroke="#0f3a60" strokeWidth="3" />
        <line x1="10" y1="82" x2="90" y2="82" stroke="#0f3a60" strokeWidth="3" />
      </svg>
    );
  }

  if (category === 'servicos' || id.includes('servico')) {
    // Wrench and Maintenance Technical Visual
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="50" cy="50" r="32" stroke="#e2e8f0" strokeWidth="6" fill="#f8fafc" />
        <path d="M68.5 31.5C65.5 28.5 60.5 28.5 57.5 31.5L29.5 59.5C26.5 62.5 26.5 67.5 29.5 70.5C32.5 73.5 37.5 73.5 40.5 70.5L68.5 42.5C71.5 39.5 71.5 34.5 68.5 31.5Z" fill="#94a3b8" stroke="#0f3a60" strokeWidth="2" />
        <path d="M68.5 31.5L61.5 38.5M57.5 31.5L64.5 38.5" stroke="#0f3a60" strokeWidth="2" />
        <circle cx="34.5" cy="65.5" r="3" fill="#da251c" />
        <path d="M43.5 41.5L34.5 50.5" stroke="#0f3a60" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="50" r="14" stroke="#da251c" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
    );
  }

  if (id.includes('controlador') || id.includes('dse')) {
    // Controller Device module (Deep Sea representation)
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="12" y="18" width="76" height="64" rx="4" fill="#1e293b" stroke="#0f3a60" strokeWidth="3" />
        {/* LCD Screen overlay */}
        <rect x="22" y="28" width="56" height="28" rx="2" fill="#ecfeff" stroke="#0f766e" strokeWidth="1.5" />
        <line x1="28" y1="35" x2="48" y2="35" stroke="#0d9488" strokeWidth="2" />
        <line x1="28" y1="42" x2="68" y2="42" stroke="#14b8a6" strokeWidth="1.5" />
        <line x1="28" y1="49" x2="58" y2="49" stroke="#14b8a6" strokeWidth="1.5" />
        
        {/* Action button mockups */}
        <circle cx="30" cy="68" r="4" fill="#da251c" stroke="#991b1b" strokeWidth="1" /> {/* Stop Red */}
        <circle cx="43" cy="68" r="4" fill="#25d366" stroke="#166534" strokeWidth="1" /> {/* Run Green */}
        <rect x="54" y="64" width="8" height="8" rx="1" fill="#475569" />
        <rect x="66" y="64" width="8" height="8" rx="1" fill="#475569" />
      </svg>
    );
  }

  if (id.includes('filtro') || id.includes('arrefecimento')) {
    // Fluid Filter / Radiator Liquid canister representation
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Canister body */}
        <rect x="25" y="22" width="50" height="58" rx="3" fill="#ffffff" stroke="#0f3a60" strokeWidth="2.5" />
        {/* Top filter lid ridge */}
        <rect x="21" y="16" width="58" height="6" rx="1.5" fill="#334155" stroke="#0f3a60" strokeWidth="2" />
        {/* Filter brand label area */}
        <rect x="25" y="36" width="50" height="22" fill="#0f3a60" />
        <rect x="25" y="44" width="50" height="4" fill="#da251c" />
        <text x="50" y="52" fill="#ffffff" fontSize="5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          BAUDOUIN / FLEET
        </text>
        {/* Grip Ridges */}
        <line x1="33" y1="66" x2="67" y2="66" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
        <line x1="33" y1="72" x2="67" y2="72" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (id.includes('disjuntor') || id.includes('contato') || id.includes('regulador') || id.includes('weg')) {
    // Circuit Breaker / Switch components visual
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="20" y="18" width="60" height="64" rx="4" fill="#f1f5f9" stroke="#0f3a60" strokeWidth="2.5" />
        <rect x="28" y="26" width="44" height="20" rx="1" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
        
        {/* Trip toggles */}
        <rect x="34" y="34" width="8" height="24" rx="1" fill="#0f3a60" />
        <rect x="46" y="34" width="8" height="24" rx="1" fill="#0f3a60" />
        <rect x="58" y="34" width="8" height="24" rx="1" fill="#0f3a60" />
        
        {/* Status indicator line */}
        <rect x="34" y="44" width="32" height="3" fill="#da251c" />
        
        {/* Screws representation */}
        <circle cx="30" cy="72" r="2" fill="#94a3b8" />
        <circle cx="50" cy="72" r="2" fill="#94a3b8" />
        <circle cx="70" cy="72" r="2" fill="#94a3b8" />
      </svg>
    );
  }

  // Fallback: Containment basin / general industrial outline
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-slate-400">
      <path d="M15 28L25 74H75L85 28H15Z" fill="#334155" stroke="#0f3a60" strokeWidth="2.5" />
      <line x1="28" y1="40" x2="72" y2="40" stroke="#475569" strokeWidth="2" />
      <line x1="30" y1="52" x2="70" y2="52" stroke="#475569" strokeWidth="2" />
      <line x1="32" y1="64" x2="68" y2="64" stroke="#475569" strokeWidth="2" />
    </svg>
  );
}
