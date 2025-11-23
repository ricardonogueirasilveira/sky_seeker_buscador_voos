
import React, { useState } from 'react';
import Hero from './components/Hero';
import SearchForm from './components/SearchForm';
import ResultsSection from './components/ResultsSection';
import { FlightQuery, FlightOption, RouteInsight } from './types';
import { generateDeepLinks, getRouteInsights, getAirlineLink } from './services/flightService';
import { Plane, Search, Globe, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{ options: FlightOption[], insight: RouteInsight | null } | null>(null);

  const handleSearch = async (query: FlightQuery) => {
    setIsLoading(true);
    setResults(null);

    try {
      // 1. Generate Deep Links immediately
      const links = generateDeepLinks(query);

      // 2. Get AI Insights with Real Data
      const insight = await getRouteInsights(query);

      // 3. Determine if we have an official airline link
      const officialSiteLink = getAirlineLink(insight.mainAirline);

      // 4. Construct Display Options using AI Data
      const options: FlightOption[] = [
        {
          provider: 'Google Flights',
          badges: ['Calendário', 'Oficial'],
          deepLink: links.googleLink,
          logoUrl: '',
          description: 'Visualize todas as opções em um grid e compre com garantia.',
          priceEstimate: insight.cheapestPrice || 'Verificar',
          duration: insight.fastestDuration || 'Calculando...',
          airline: insight.mainAirline || 'Várias'
        },
        {
          provider: 'Decolar',
          badges: ['Parcelamento', 'Pacotes'],
          deepLink: links.decolarLink,
          logoUrl: '', 
          description: 'Líder na América Latina. Ótimo para parcelar em até 12x.',
          priceEstimate: insight.cheapestPrice ? `~ ${insight.cheapestPrice}` : 'Verificar',
          duration: insight.fastestDuration || 'Calculando...',
          airline: insight.mainAirline || 'Múltiplas'
        },
        {
          provider: 'Skyscanner',
          badges: ['Menor Preço'],
          deepLink: links.skyscannerLink,
          logoUrl: '',
          description: 'Busca em centenas de agências menores para o menor valor absoluto.',
          priceEstimate: insight.cheapestPrice || 'Verificar',
          duration: insight.fastestDuration || 'Calculando...',
          airline: insight.mainAirline || 'Várias'
        },
        {
          provider: 'Kayak',
          badges: ['Flexibilidade'],
          deepLink: links.kayakLink,
          logoUrl: '',
          description: 'Excelente para combinações complexas de companhias diferentes.',
          priceEstimate: insight.cheapestPrice || 'Verificar',
          duration: insight.fastestDuration || 'Calculando...',
          airline: insight.mainAirline || 'Múltiplas'
        }
      ];

      // If we found a specific airline with a known link, add it as the PRIORITY option
      if (officialSiteLink && insight.mainAirline) {
        options.unshift({
          provider: `Site Oficial ${insight.mainAirline}`,
          badges: ['Sem Taxas Extras', 'Segurança'],
          deepLink: officialSiteLink,
          logoUrl: '',
          description: `Compra direta e segura no sistema da ${insight.mainAirline}.`,
          priceEstimate: insight.cheapestPrice,
          duration: insight.fastestDuration,
          airline: insight.mainAirline
        });
      }

      setResults({ options, insight });

    } catch (error) {
      console.error("Search failed", error);
      alert("Ocorreu um erro ao buscar informações. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      
      {/* Navbar - Transparent on Hero */}
      <nav className="absolute top-0 left-0 w-full z-20 p-6 flex justify-between items-center border-b border-white/5 bg-brand-blue-900/60 backdrop-blur-sm">
        <div className="flex items-center gap-3 text-white font-black text-xl drop-shadow-md">
          <div className="bg-brand-yellow-500 p-1 rounded">
             <Plane className="w-5 h-5 text-brand-blue-900 transform -rotate-45" />
          </div>
          <span className="tracking-widest uppercase">SKY SEEKER</span>
        </div>
      </nav>

      <Hero />
      
      <main className="flex-grow pb-20">
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        
        {results && (
          <ResultsSection options={results.options} insight={results.insight} />
        )}

        {!results && !isLoading && (
          <div className="max-w-6xl mx-auto mt-20 px-6">
            <div className="text-center mb-12">
                <h3 className="text-2xl font-black text-brand-blue-900 uppercase mb-3">Portal de Pesquisa Aérea</h3>
                <p className="text-slate-500 max-w-2xl mx-auto">Tecnologia avançada para comparar Sites Oficiais e Agências em uma única interface.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded border-t-4 border-brand-yellow-500 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-blue-50 rounded flex items-center justify-center mb-6 text-brand-blue-800">
                    <Search className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-brand-blue-900 mb-2 uppercase text-sm">Busca Centralizada</h4>
                <p className="text-slate-500 text-sm leading-relaxed">Não perca tempo em múltiplos sites. Inserimos seus dados automaticamente nos motores de busca globais.</p>
              </div>

              <div className="bg-white p-8 rounded border-t-4 border-brand-yellow-500 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-blue-50 rounded flex items-center justify-center mb-6 text-brand-blue-800">
                    <Globe className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-brand-blue-900 mb-2 uppercase text-sm">Cobertura Internacional</h4>
                <p className="text-slate-500 text-sm leading-relaxed">De American Airlines a Emirates. Identificamos voos internacionais e te levamos ao site oficial.</p>
              </div>

              <div className="bg-white p-8 rounded border-t-4 border-brand-yellow-500 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-blue-50 rounded flex items-center justify-center mb-6 text-brand-blue-800">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-brand-blue-900 mb-2 uppercase text-sm">Compra Segura</h4>
                <p className="text-slate-500 text-sm leading-relaxed">Não vendemos passagens. Apenas garantimos que você compre direto da fonte com o menor preço.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-brand-blue-800 text-white py-12 border-t border-brand-blue-900">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
             <div className="flex items-center gap-2 font-black text-2xl mb-2">
                <Plane className="w-6 h-6 text-brand-yellow-500" />
                SKY SEEKER
             </div>
             <p className="text-brand-blue-200 text-sm">Portal de Inteligência em Viagens Aéreas</p>
          </div>
          
          <div className="text-xs text-brand-blue-300 text-center md:text-right">
             <p className="mb-1">&copy; {new Date().getFullYear()} Sky Seeker. Todos os direitos reservados.</p>
             <p>As marcas citadas pertencem aos seus respectivos proprietários.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
