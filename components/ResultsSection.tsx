import React from 'react';
import { ExternalLink, Clock, DollarSign, Award, ArrowRight } from 'lucide-react';
import { FlightOption, RouteInsight } from '../types';

interface ResultsSectionProps {
  options: FlightOption[];
  insight: RouteInsight | null;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ options, insight }) => {
  if (!insight) return null;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 animate-fade-in">
      
      {/* AI Insight Header */}
      <div className="mb-10 bg-white border-l-4 border-brand-yellow-500 p-6 rounded shadow-sm flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-brand-blue-800 mb-2 flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-yellow-500" />
            Análise Sky Seeker
          </h3>
          <p className="text-slate-700 mb-4">{insight.summary}</p>
          <div className="flex flex-wrap gap-2">
            {insight.tips.map((tip, idx) => (
              <span key={idx} className="bg-brand-blue-50 text-brand-blue-700 text-xs font-semibold px-3 py-1 rounded border border-brand-blue-100">
                {tip}
              </span>
            ))}
          </div>
        </div>
        {insight.bestTimeToFly && (
           <div className="bg-brand-yellow-500 text-brand-blue-900 p-4 rounded-md min-w-[200px] text-center shadow-sm">
             <span className="block text-xs uppercase font-bold opacity-80 mb-1">Melhor Momento</span>
             <span className="font-bold text-sm">
               {insight.bestTimeToFly}
             </span>
           </div>
        )}
      </div>

      <h3 className="text-2xl font-bold text-brand-blue-800 mb-6 border-b border-slate-200 pb-2">Melhores Opções de Compra</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((option, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden hover:shadow-xl hover:border-brand-blue-200 transition-all duration-300 group flex flex-col">
            
            {/* Header Badge */}
            <div className={`py-2 px-4 text-center text-xs font-bold uppercase tracking-wider
              ${idx === 0 ? 'bg-brand-yellow-500 text-brand-blue-900' : 
                'bg-brand-blue-800 text-white'}`}>
              {option.badges?.[0] || 'Opção Recomendada'}
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                 <h4 className="text-xl font-bold text-brand-blue-900">{option.provider}</h4>
                 {/* Fallback airline logo placeholder */}
                 <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-xl border border-slate-100">
                   ✈️
                 </div>
              </div>

              <p className="text-slate-500 text-sm mb-4 min-h-[40px]">{option.description}</p>
              
              <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-md">
                <div className="flex items-center text-slate-800">
                  <DollarSign className="w-4 h-4 mr-2 text-brand-yellow-500" />
                  <span className="font-bold">{option.priceEstimate || "Preço sob consulta"}</span>
                </div>
                <div className="flex items-center text-slate-700">
                  <Clock className="w-4 h-4 mr-2 text-brand-blue-500" />
                  <span className="text-sm font-medium">{option.duration || "Horários Variados"}</span>
                </div>
              </div>

              <div className="mt-auto">
                <a 
                  href={option.deepLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded font-bold transition-colors uppercase text-sm tracking-wide
                    ${idx === 0 ? 'bg-brand-blue-600 text-white hover:bg-brand-blue-700' : 
                      'bg-white text-brand-blue-600 border-2 border-brand-blue-600 hover:bg-brand-blue-50'}`}
                >
                  Ver Oferta Real
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-center text-xs text-slate-400 mt-2">
                  Redireciona para {option.provider}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsSection;