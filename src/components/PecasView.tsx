import React from 'react';
import { 
  Shield, 
  Truck, 
  MessageSquare
} from 'lucide-react';

interface PecasViewProps {
  scrollToSection: (id: string) => void;
}

export default function PecasView({ scrollToSection }: PecasViewProps) {
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
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Nossa equipe de engenheiros auxilia você a identificar o código correto do componente ideal.</p>
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

    </div>
  );
}
