import React from 'react';
import { Plane } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-brand-blue-800">
      {/* Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" 
        alt="Sky and Airplane Wing" 
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
      />
      
      {/* Overlay Gradient - Deep Blue Brand */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-900/90 via-brand-blue-800/95 to-brand-blue-800"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center pb-20">
        <div className="animate-fly-in mb-6">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-brand-blue-700/50 backdrop-blur-md rounded-full border border-brand-yellow-500/50 mb-4 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
             <Plane className="w-5 h-5 text-brand-yellow-500 mr-2 transform -rotate-45" />
             <span className="text-brand-yellow-500 font-bold tracking-wide text-xs md:text-sm uppercase">Pesquisa Global Inteligente</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-xl tracking-tight">
          SKY SEEKER
        </h1>
        
        <p className="text-lg md:text-xl text-slate-200 max-w-2xl font-light leading-relaxed drop-shadow-md">
          A plataforma que conecta você aos melhores preços de voos nacionais e internacionais. Compare sites oficiais, Decolar e Google Flights em segundos.
        </p>
      </div>
      
      {/* Decorative Bottom Curve matching background color */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
         <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-slate-100"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;