import React, { useState, useRef, useEffect } from 'react';
import { Search, Calendar, Users, PlaneTakeoff, PlaneLanding } from 'lucide-react';
import { FlightQuery } from '../types';
import { airports, Airport } from '../data/airports';

interface SearchFormProps {
  onSearch: (query: FlightQuery) => void;
  isLoading: boolean;
}

// Internal Autocomplete Component
const AirportAutocomplete = ({ 
  label, 
  icon: Icon, 
  value, 
  onChange, 
  placeholder 
}: { 
  label: string, 
  icon: any, 
  value: string, 
  onChange: (val: string) => void,
  placeholder: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filtered, setFiltered] = useState<Airport[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Filter logic
    if (value.length > 0 && isOpen) {
      const search = value.toLowerCase();
      const results = airports.filter(a => 
        a.city.toLowerCase().includes(search) || 
        a.code.toLowerCase().includes(search) ||
        a.name.toLowerCase().includes(search) ||
        a.country.toLowerCase().includes(search)
      ).slice(0, 8);
      setFiltered(results);
    } else {
      setFiltered([]);
    }
  }, [value, isOpen]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (airport: Airport) => {
    onChange(`${airport.city} - ${airport.name} (${airport.code})`);
    setIsOpen(false);
  };

  return (
    <div className="relative group" ref={wrapperRef}>
      <label className="block text-xs font-bold text-brand-blue-800 uppercase mb-1 ml-1">{label}</label>
      <div className="relative flex items-center bg-white border border-slate-300 rounded-md p-3 transition-all duration-200 focus-within:ring-2 focus-within:ring-brand-blue-500 focus-within:border-brand-blue-500 shadow-sm hover:border-brand-blue-400">
        <Icon className="w-5 h-5 text-brand-blue-600 mr-3 flex-shrink-0" />
        <input 
          type="text" 
          placeholder={placeholder}
          className="bg-transparent w-full outline-none text-brand-blue-900 font-semibold placeholder:text-slate-400 placeholder:font-normal"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {/* Dropdown Results */}
      {isOpen && filtered.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-md shadow-xl border border-slate-200 z-50 overflow-hidden animate-fade-in max-h-80 overflow-y-auto ring-1 ring-black/5">
          <ul>
            {filtered.map((airport) => (
              <li 
                key={airport.code}
                onClick={() => handleSelect(airport)}
                className="px-4 py-3 hover:bg-brand-blue-50 cursor-pointer border-b border-slate-100 last:border-0 transition-colors flex items-center justify-between group/item"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="bg-slate-100 p-2 rounded-md text-slate-400 group-hover/item:bg-brand-blue-100 group-hover/item:text-brand-blue-700 flex-shrink-0">
                    <PlaneTakeoff className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-sm font-bold text-slate-700 truncate">
                      {airport.city}, {airport.country}
                    </span>
                    <span className="text-xs text-slate-500 truncate">{airport.name}</span>
                  </div>
                </div>
                <span className="text-xs font-black bg-slate-100 text-slate-600 px-2 py-1 rounded ml-2 group-hover/item:bg-brand-blue-800 group-hover/item:text-brand-yellow-500 transition-colors">
                  {airport.code}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (origin && destination && departDate) {
      onSearch({ origin, destination, departDate, returnDate, passengers });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 relative z-10 -mt-32">
      <div className="bg-white rounded-lg shadow-[0_20px_50px_rgba(0,32,96,0.2)] p-6 md:p-8 border-t-8 border-brand-yellow-500">
        
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-brand-blue-800 flex items-center gap-2">
            <Search className="w-6 h-6 text-brand-yellow-500" />
            <span className="uppercase tracking-tight">Buscar Passagens</span>
          </h2>
          <div className="hidden md:flex text-sm font-bold text-brand-blue-800 bg-brand-yellow-500 rounded px-4 py-1">
             Melhor Custo Benefício
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
            
            {/* Origin & Destination */}
            <div className="lg:col-span-3">
              <AirportAutocomplete 
                label="Origem" 
                icon={PlaneTakeoff} 
                value={origin} 
                onChange={setOrigin} 
                placeholder="Cidade (Ex: GRU)"
              />
            </div>

            <div className="lg:col-span-3">
              <AirportAutocomplete 
                label="Destino" 
                icon={PlaneLanding} 
                value={destination} 
                onChange={setDestination} 
                placeholder="Cidade (Ex: MIA)"
              />
            </div>

            {/* Dates */}
            <div className="lg:col-span-2 relative group">
              <label className="block text-xs font-bold text-brand-blue-800 uppercase mb-1 ml-1">Ida</label>
              <div className="relative flex items-center bg-white border border-slate-300 rounded-md overflow-hidden transition-all duration-200 hover:border-brand-blue-400 focus-within:ring-2 focus-within:ring-brand-blue-500 h-[50px]">
                <Calendar className="w-5 h-5 text-brand-blue-600 absolute left-3 pointer-events-none" />
                <input 
                  type="date" 
                  className="w-full h-full bg-transparent pl-10 pr-3 outline-none text-brand-blue-900 font-bold cursor-pointer appearance-none"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="lg:col-span-2 relative group">
              <label className="block text-xs font-bold text-brand-blue-800 uppercase mb-1 ml-1">Volta</label>
              <div className="relative flex items-center bg-white border border-slate-300 rounded-md overflow-hidden transition-all duration-200 hover:border-brand-blue-400 focus-within:ring-2 focus-within:ring-brand-blue-500 h-[50px]">
                <Calendar className="w-5 h-5 text-brand-blue-600 absolute left-3 pointer-events-none" />
                <input 
                  type="date" 
                  className="w-full h-full bg-transparent pl-10 pr-3 outline-none text-brand-blue-900 font-bold cursor-pointer appearance-none"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
            </div>

             {/* Passengers */}
             <div className="lg:col-span-2 relative group">
              <label className="block text-xs font-bold text-brand-blue-800 uppercase mb-1 ml-1">Passageiros</label>
              <div className="relative flex items-center bg-white border border-slate-300 rounded-md h-[50px] px-3 transition-all hover:border-brand-blue-400 focus-within:ring-2 focus-within:ring-brand-blue-500">
                <Users className="w-5 h-5 text-brand-blue-600 mr-2" />
                <input 
                  type="number" 
                  min="1" 
                  max="9" 
                  className="bg-transparent w-full outline-none text-brand-blue-900 font-bold"
                  value={passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Button Style from Image: Bright Yellow with Dark Blue Text */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-brand-yellow-500 hover:bg-brand-yellow-400 text-brand-blue-900 font-black py-4 px-6 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg uppercase tracking-wide"
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-4 border-brand-blue-900/30 border-t-brand-blue-900 rounded-full animate-spin"></div>
                Processando...
              </>
            ) : (
              <>
                <Search className="w-6 h-6" />
                Pesquisar Voos
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;