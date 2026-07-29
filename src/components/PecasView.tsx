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

    </div>
  );
}
