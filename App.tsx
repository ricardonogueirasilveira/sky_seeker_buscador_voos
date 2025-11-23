import React, { useState } from 'react';
import Hero from './components/Hero';
import SearchForm from './components/SearchForm';
import ResultsSection from './components/ResultsSection';
import { FlightQuery, FlightOption, RouteInsight } from './types';
import { generateDeepLinks, getRouteInsights } from './services/flightService';
import { Plane } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{ options: FlightOption[], insight: RouteInsight | null } | null>(null);

  const handleSearch = async (query: FlightQuery) => {
    setIsLoading(true);
    setResults(null);

    try {
      // 1. Generate Deep Links immediately (Client side logic)
      const links = generateDeepLinks(query);

      // 2. Get AI Insights (Async)
      const insight = await getRouteInsights(query);

      // 3. Construct Display Options
      const options: FlightOption[] = [
        {
          provider: 'Skyscanner',
          badges: ['Preço Baixo', 'Econômico'],
          deepLink: links.skyscannerLink,
          logoUrl: '', // placeholder handled in component
          description: 'Geralmente a melhor opção para encontrar tarifas promocionais e companhias low-cost.',
          priceEstimate: 'Ver Preço Real',
          duration: 'Comparar Vários'
        },
        {
          provider: 'Google Flights',
          badges: ['Melhor Interface', 'Datas Flexíveis'],
          deepLink: links.googleLink,
          logoUrl: '',
          description: 'Excelente para visualizar o calendário de preços e comparar datas próximas.',
          priceEstimate: 'Ver Calendário',
          duration: 'Rápida Visualização'
        },
        {
          provider: 'Kayak',
          badges: ['Pacotes', 'Filtros'],
          deepLink: links.kayakLink,
          logoUrl: '',
          description: 'Ótimo para comparar combinações de ida e volta em companhias diferentes.',
          priceEstimate: 'Comparar Ofertas',
          duration: 'Opções Combinadas'
        }
      ];

      setResults({ options, insight });

    } catch (error) {
      console.error("Search failed", error);
      alert("Ocorreu um erro ao buscar informações. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Navbar - Transparent on Hero */}
      <nav className="absolute top-0 left-0 w-full z-20 p-6 flex justify-between items-center border-b border-white/10 bg-brand-blue-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-white font-bold text-xl drop-shadow-md">
          <Plane className="w-6 h-6 text-brand-yellow-500" />
          <span className="tracking-wider">SKY SEEKER</span>
        </div>
      </nav>

      <Hero />
      
      <main className="flex-grow pb-20">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        
        {results && (
          <ResultsSection options={results.options} insight={results.insight} />
        )}

        {!results && !isLoading && (
          <div className="max-w-4xl mx-auto mt-20 px-6 text-center text-slate-500">
            <h3 className="text-xl font-bold mb-3 text-brand-blue-800">Por que usar o Sky Seeker?</h3>
            <p className="mb-10 max-w-2xl mx-auto">Nossa IA analisa a rota e te direciona para onde a passagem está realmente mais barata, economizando seu tempo de abrir 10 abas diferentes.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200 hover:border-brand-yellow-500 transition-colors group">
                <div className="w-12 h-12 bg-brand-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-blue-600 font-bold text-xl group-hover:bg-brand-yellow-500 group-hover:text-brand-blue-900 transition-colors">1</div>
                <h4 className="font-bold text-brand-blue-900 mb-2">Busca Unificada</h4>
                <p className="text-sm text-slate-500">Preencha os dados apenas uma vez e gere links diretos para os maiores buscadores.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200 hover:border-brand-yellow-500 transition-colors group">
                <div className="w-12 h-12 bg-brand-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-blue-600 font-bold text-xl group-hover:bg-brand-yellow-500 group-hover:text-brand-blue-900 transition-colors">2</div>
                <h4 className="font-bold text-brand-blue-900 mb-2">Inteligência Real</h4>
                <p className="text-sm text-slate-500">Nossa IA consulta tendências atuais para te avisar se é um bom momento para comprar.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200 hover:border-brand-yellow-500 transition-colors group">
                <div className="w-12 h-12 bg-brand-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-blue-600 font-bold text-xl group-hover:bg-brand-yellow-500 group-hover:text-brand-blue-900 transition-colors">3</div>
                <h4 className="font-bold text-brand-blue-900 mb-2">Sem Taxas Extras</h4>
                <p className="text-sm text-slate-500">Somos 100% gratuitos. Você compra direto na companhia aérea ou no buscador oficial.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-brand-blue-900 text-slate-400 py-12 border-t border-brand-blue-800">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-white font-bold text-2xl mb-4">
            <Plane className="w-6 h-6 text-brand-yellow-500" />
            SKY SEEKER
          </div>
          <p className="mb-4 text-brand-blue-200">O seu radar para voos baratos.</p>
          <p className="text-sm opacity-50">&copy; {new Date().getFullYear()} Sky Seeker. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;