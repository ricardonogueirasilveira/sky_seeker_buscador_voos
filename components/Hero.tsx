import React from 'react';
import { Plane, Cloud } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-brand-blue-800">
      {/* Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" 
        alt="Sky and Airplane Wing" 
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
      />
      
      {/* Overlay Gradient - Using Brand Blue */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-blue-900/80 to-brand-blue-800/90"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center pb-20">
        <div className="animate-fly-in mb-4">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full border border-brand-yellow-500/30 mb-4 shadow-[0_0_15px_rgba(255,215,0,0.3)]">
             <Plane className="w-6 h-6 text-brand-yellow-500 mr-2 transform -rotate-45" />
             <span className="text-brand-yellow-500 font-bold tracking-wide text-sm uppercase">Viaje Mais, Gaste Menos</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg tracking-tight">
          SKY SEEKER
        </h1>
        
        <p className="text-lg md:text-xl text-brand-blue-50 max-w-2xl font-light leading-relaxed drop-shadow-md">
          Encontramos os voos mais baratos comparando Google Flights, Skyscanner e Kayak simultaneamente. A melhor rota, o melhor preço, em um só clique.
        </p>
      </div>

      {/* Decorative Curves */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-slate-50"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;