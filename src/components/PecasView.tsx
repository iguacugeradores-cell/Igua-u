import React, { useState } from 'react';
import { 
  Shield, 
  Truck, 
  MessageSquare, 
  Info
} from 'lucide-react';

interface PecasViewProps {
  scrollToSection: (id: string) => void;
}

export default function PecasView({ scrollToSection }: PecasViewProps) {
  // Parts Form State
  const [selectedPartCategory, setSelectedPartCategory] = useState('Todos');
  const [generatorBrand, setGeneratorBrand] = useState('');
  const [partCode, setPartCode] = useState('');
  const [partDescription, setPartDescription] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState(false);

  const partBrands = [
    { name: 'Baudouin', type: 'Motores Diesel' },
    { name: 'Cummins', type: 'Motores Diesel' },
    { name: 'WEG', type: 'Alternadores & Painéis' },
    { name: 'MWM', type: 'Motores de Alta Performance' },
    { name: 'Volvo Penta', type: 'Motores Marítimos e Geradores' },
    { name: 'Perkins', type: 'Motores Industriais' },
    { name: 'Scania', type: 'Motores de Carga Pesada' },
    { name: 'Yanmar', type: 'Motores Compactos' },
    { name: 'FPT', type: 'Sistemas de Energia e Propulsão' }
  ];

  // Prepares the WhatsApp URL with form details
  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(true);
    
    const baseText = `Olá, Iguaçu Geradores! Gostaria de realizar um orçamento de peças sobressalentes para meu grupo gerador através do site:\n\n` +
      `*Categoria das Peças:* ${selectedPartCategory}\n` +
      `*Marca/Modelo do Gerador:* ${generatorBrand || 'Não informado'}\n` +
      `*Código da Peça (se souber):* ${partCode || 'Não informado'}\n` +
      `*Detalhes / Necessidade:* ${partDescription || 'Solicito contato para identificar a peça correta.'}`;
    
    const phone = '5545999299311'; // Main support line
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(baseText)}`;
    
    // Open in a new tab safely
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      
      {/* 2. ADVANTAGES BAR */}
      <section className="bg-white border-b border-slate-100 py-6 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex gap-4 items-start p-2">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-brand-blue border border-slate-100 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-xs md:text-sm uppercase tracking-wide">100% Genuínas</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Trabalhamos estritamente com peças certificadas de fábrica, com garantia oficial de procedência.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start p-2">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-brand-blue border border-slate-100 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-xs md:text-sm uppercase tracking-wide">Despacho de Emergência</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Amplo estoque à pronta-entrega local e logística otimizada para o envio imediato em caso de emergências.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start p-2">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-brand-blue border border-slate-100 shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-xs md:text-sm uppercase tracking-wide">Consultoria Técnica Gratuita</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Nossa equipe de engenheiros auxilia você a identificar o código correto do filtro ou componente ideal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BRANDS SHOWCASE */}
      <section className="py-16 px-4 bg-white border-t border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-brand-blue text-xs font-bold tracking-widest uppercase block mb-1">Compatibilidade Total</span>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight font-heading">
              Atendemos as Principais Marcas Globais
            </h3>
            <p className="text-slate-500 text-xs md:text-sm mt-1.5">Fornecemos peças compatíveis e originais com garantia para os seguintes fabricantes:</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-4">
            {partBrands.map((brand, bIdx) => (
              <div 
                key={bIdx}
                className="bg-slate-50 rounded-xl p-4 border border-slate-200/50 flex flex-col justify-center items-center text-center hover:bg-slate-100/75 hover:border-brand-blue/10 transition-all min-h-[90px]"
              >
                <span className="font-heading font-black text-sm text-slate-800 tracking-tight">{brand.name}</span>
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mt-1 block truncate max-w-full">
                  {brand.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE PARTS INQUIRY FORM */}
      <section className="py-20 px-4 bg-slate-50" id="pecas-formulario">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200/80 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-brand-blue/10 text-brand-blue text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Cotação On-line
            </div>

            <div className="max-w-2xl">
              <p className="text-xs md:text-sm text-slate-500 mt-2 mb-6">
                Preencha os dados abaixo sobre a peça de reposição desejada para que nossa engenharia de vendas consulte a disponibilidade em estoque e entre em contato imediatamente com os melhores valores.
              </p>
            </div>

            <form onSubmit={handleQuerySubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="text-xs font-extrabold text-slate-500 uppercase block mb-1.5">Categoria da Peça</label>
                  <select
                    value={selectedPartCategory}
                    onChange={(e) => setSelectedPartCategory(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  >
                    <option value="Todos">Todas as Categorias</option>
                    <option value="Filtros">Sistemas de Filtragem (Filtros de Óleo, Combustível, Ar)</option>
                    <option value="Motor">Componentes Mecânicos do Motor (Juntas, Correias, Pistões)</option>
                    <option value="Eletrica">Parte Elétrica e Painéis (AVR, Sensores, Carregadores)</option>
                    <option value="Acessorios">Acessórios & Aquecedores (Resistências, Mangueiras)</option>
                    <option value="Outros">Outras Peças de Reposição</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-500 uppercase block mb-1.5">Marca / Modelo do Motor do Gerador</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Baudouin 6M16, Cummins KTA19, WEG"
                    value={generatorBrand}
                    onChange={(e) => setGeneratorBrand(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue"
                  />
                </div>

              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-500 uppercase block mb-1.5">
                  Código de Identificação da Peça <span className="text-slate-400 font-normal italic">(Opcional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Código de referência, Part Number, ou gravação gravada na carcaça"
                  value={partCode}
                  onChange={(e) => setPartCode(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold text-slate-500 uppercase block mb-1.5">
                  Descrição da Peça ou Observações Técnicas <span className="text-slate-400 font-normal italic">(Opcional)</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Ex: Preciso de cotação de filtros de ar e combustível para manutenção de 250 horas do gerador Baudouin 150kva."
                  value={partDescription}
                  onChange={(e) => setPartDescription(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-blue resize-none"
                />
              </div>

              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex gap-3 items-start">
                <Info className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  <strong>Não sabe o código?</strong> Sem problemas! Preencha apenas a marca e descreva brevemente a peça. Nossa equipe técnica entrará em contato para solicitar fotos da peça antiga ou da plaqueta do motor para garantir a identificação correta de forma gratuita.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-green hover:bg-green-600 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/15 cursor-pointer"
              >
                <MessageSquare className="w-4.5 h-4.5 fill-current text-white shrink-0" />
                <span>Enviar Cotação por WhatsApp</span>
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
