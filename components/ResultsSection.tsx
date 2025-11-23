
import React from 'react';
import { ExternalLink, Clock, DollarSign, Award, Plane, CheckCircle2 } from 'lucide-react';
import { FlightOption, RouteInsight } from '../types';

interface ResultsSectionProps {
  options: FlightOption[];
  insight: RouteInsight | null;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ options, insight }) => {
  if (!insight) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 animate-fade-in">
      
      {/* AI Insight Header - Dashboard Style */}
      <div className="mb-10 bg-white border-l-8 border-brand-blue-800 rounded shadow-md overflow-hidden">
        <div className="bg-brand-blue-50 p-4 border-b border-brand-blue-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-yellow-500" />
            <h3 className="text-lg font-bold text-brand-blue-900 uppercase tracking-wider">
                Análise de Rota Inteligente
            </h3>
        </div>
        <div className="p-6 flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-grow">
            <p className="text-slate-800 text-lg mb-4 font-medium">{insight.summary}</p>
            <div className="flex flex-wrap gap-2">
                {insight.tips.map((tip, idx) => (
                <span key={idx} className="bg-white text-brand-blue-700 text-sm font-bold px-3 py-1 rounded border border-brand-blue-200 shadow-sm flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-brand-yellow-500" />
                    {tip}
                </span>
                ))}
            </div>
            </div>
            {insight.bestTimeToFly && (
            <div className="bg-brand-blue-800 text-white p-4 rounded min-w-[200px] text-center shadow-lg border-b-4 border-brand-yellow-500">
                <span className="block text-xs uppercase font-bold text-brand-yellow-500 mb-1">Melhor Momento</span>
                <span className="font-bold text-lg">
                {insight.bestTimeToFly}
                </span>
            </div>
            )}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6 border-b-2 border-slate-200 pb-3">
         <div className="bg-brand-yellow-500 w-2 h-8"></div>
         <h3 className="text-2xl font-black text-brand-blue-900 uppercase">Resultados da Busca</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {options.map((option, idx) => (
          <div key={idx} className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col relative ${idx === 0 ? 'ring-4 ring-brand-yellow-500 ring-opacity-50 transform md:-translate-y-2' : 'border border-slate-200'}`}>
            
            {/* Card Header - Deep Blue like Sidebar */}
            <div className="bg-brand-blue-800 p-4 flex justify-between items-center relative overflow-hidden">
                {idx === 0 && <div className="absolute top-0 right-0 bg-brand-yellow-500 text-brand-blue-900 text-[10px] font-black px-2 py-1 uppercase">Recomendado</div>}
                <div>
                    <span className="block text-[10px] font-bold text-brand-yellow-500 uppercase tracking-widest mb-1">Provedor</span>
                    <h4 className="text-lg font-bold text-white leading-tight">{option.provider}</h4>
                </div>
                {/* Visual accent */}
                <div className="absolute -right-4 -bottom-4 text-white opacity-5">
                    <Plane className="w-16 h-16" />
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              
              <div className="flex items-center gap-2 mb-4">
                 <div className="bg-brand-blue-50 p-2 rounded-full">
                    <Plane className="w-4 h-4 text-brand-blue-600" />
                 </div>
                 <div className="flex flex-col">
                     <span className="text-[10px] uppercase font-bold text-slate-400">Operado por</span>
                     <span className="text-sm font-bold text-brand-blue-900 truncate max-w-[150px]">{option.airline || 'Múltiplas'}</span>
                 </div>
              </div>

              {/* Data Grid */}
              <div className="bg-slate-50 rounded border border-slate-100 p-3 mb-4 grid grid-cols-2 gap-3">
                 <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase mb-1 flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-brand-yellow-500" /> Preço
                    </span>
                    <span className="block text-lg font-black text-brand-blue-900">{option.priceEstimate}</span>
                 </div>
                 <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase mb-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-brand-blue-500" /> Duração
                    </span>
                    <span className="block text-sm font-bold text-slate-700 mt-1">{option.duration}</span>
                 </div>
              </div>

              <div className="flex gap-2 flex-wrap mb-4">
                 {option.badges?.map((badge, bIdx) => (
                     <span key={bIdx} className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200">
                         {badge}
                     </span>
                 ))}
              </div>

              <p className="text-slate-500 text-xs mb-6 flex-grow leading-relaxed border-t border-slate-100 pt-3">
                  {option.description}
              </p>

              <div className="mt-auto">
                <a 
                  href={option.deepLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded font-bold transition-all uppercase text-xs md:text-sm tracking-wide shadow-sm
                    ${idx === 0 ? 'bg-brand-yellow-500 text-brand-blue-900 hover:bg-brand-yellow-400' : 
                      'bg-brand-blue-800 text-white hover:bg-brand-blue-700'}`}
                >
                  Comparar Agora
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsSection;
