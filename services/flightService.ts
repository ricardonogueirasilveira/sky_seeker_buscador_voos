
import { GoogleGenAI } from "@google/genai";
import { FlightQuery, RouteInsight } from "../types";

// Helper to extract IATA code if format is "City (CODE)"
const extractCode = (input: string) => {
  const match = input.match(/\(([A-Z]{3})\)$/);
  return match ? match[1] : input;
};

// Helper for Skyscanner format (YYMMDD)
const formatSkyscannerDate = (dateStr: string) => {
  if (!dateStr) return '';
  return dateStr.slice(2).replace(/-/g, '');
};

// Helper maps for official airline sites (Domestic & International)
const airlineLinks: Record<string, string> = {
  // South America
  'latam': 'https://www.latamairlines.com/br/pt',
  'gol': 'https://www.voegol.com.br/',
  'azul': 'https://www.voeazul.com.br/',
  'aerolineas': 'https://www.aerolineas.com.ar/',
  'avianca': 'https://www.avianca.com/',
  'copa': 'https://www.copaair.com/',
  'sky': 'https://www.skyairline.com/brasil',
  'jetsmart': 'https://jetsmart.com/br/pt/',
  
  // North America
  'american': 'https://www.aa.com.br/',
  'united': 'https://www.united.com/',
  'delta': 'https://pt.delta.com/',
  'air canada': 'https://www.aircanada.com/',
  'aeromexico': 'https://aeromexico.com/',

  // Europe
  'tap': 'https://www.flytap.com/',
  'lufthansa': 'https://www.lufthansa.com/',
  'air france': 'https://wwws.airfrance.com.br/',
  'klm': 'https://www.klm.com.br/',
  'british': 'https://www.britishairways.com/',
  'iberia': 'https://www.iberia.com/',
  'ita': 'https://www.itaspa.com/',
  'alitalia': 'https://www.itaspa.com/', // Legacy
  'swiss': 'https://www.swiss.com/',
  'turkish': 'https://www.turkishairlines.com/',
  'ryanair': 'https://www.ryanair.com/',
  'easyjet': 'https://www.easyjet.com/',
  'virgin': 'https://www.virginatlantic.com/',

  // Middle East & Asia
  'emirates': 'https://www.emirates.com/br/portuguese/',
  'qatar': 'https://www.qatarairways.com/',
  'etihad': 'https://www.etihad.com/',
  'ana': 'https://www.ana.co.jp/',
  'jal': 'https://www.jal.co.jp/',
  'singapore': 'https://www.singaporeair.com/',
  'cathay': 'https://www.cathaypacific.com/',
  'korean': 'https://www.koreanair.com/',
  'china': 'https://www.airchina.com.br/',
  'ethiopian': 'https://www.ethiopianairlines.com/'
};

export const getAirlineLink = (airlineName?: string) => {
  if (!airlineName) return null;
  const lowerName = airlineName.toLowerCase();
  
  for (const key in airlineLinks) {
    if (lowerName.includes(key)) {
      return airlineLinks[key];
    }
  }
  return null;
};

export const generateDeepLinks = (query: FlightQuery) => {
  const origin = extractCode(query.origin);
  const destination = extractCode(query.destination);
  const { departDate, returnDate } = query;
  
  // Google Flights
  const googleQuery = `Flights to ${destination} from ${origin} on ${departDate}${returnDate ? ` through ${returnDate}` : ''}`;
  const googleLink = `https://www.google.com/travel/flights?q=${encodeURIComponent(googleQuery)}`;

  // Skyscanner
  const skyscannerLink = `https://www.skyscanner.com/transport/flights/${origin}/${destination}/${formatSkyscannerDate(departDate)}/${returnDate ? formatSkyscannerDate(returnDate) : ''}`;

  // Kayak
  const kayakLink = `https://www.kayak.com.br/flights/${origin}-${destination}/${departDate}${returnDate ? `/${returnDate}` : ''}`;

  // Decolar (Despegar) - Handles International via generic structure
  const decolarLink = `https://www.decolar.com/shop/flights/results/${returnDate ? 'roundtrip' : 'oneway'}/${origin}/${destination}/${departDate}/${returnDate || ''}/${query.passengers}/0/0`;

  return { googleLink, skyscannerLink, kayakLink, decolarLink };
};

export const getRouteInsights = async (query: FlightQuery): Promise<RouteInsight> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key not found");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const originClean = extractCode(query.origin);
    const destClean = extractCode(query.destination);

    const prompt = `
      Atue como um motor de busca de voos global (Expert Travel Agent).
      O usuário quer voar de ${originClean} para ${destClean} partindo em ${query.departDate} (Formato YYYY-MM-DD)${query.returnDate ? ` e voltando em ${query.returnDate}` : ''}.
      
      Use o Google Search para encontrar o MELHOR VOO disponível no mercado internacional ou nacional AGORA.
      Foque em encontrar voos comerciais de companhias aéreas reais (ex: Emirates, Lufthansa, Latam, American Airlines).

      Preciso que você extraia dados específicos:
      1. O menor preço encontrado (ex: "R$ 1.250").
      2. A duração média ou do voo mais rápido (ex: "14h 30m").
      3. A principal companhia aérea que está oferecendo esse preço. Seja específico no nome (ex: "British Airways", "Air Canada").
      4. Um resumo curto e dicas.
      
      Responda ESTRITAMENTE neste formato JSON:
      {
        "cheapestPrice": "R$ Valor",
        "fastestDuration": "00h 00m",
        "mainAirline": "Nome da Cia Aérea",
        "summary": "Resumo de 1 frase sobre a rota.",
        "tips": ["Dica 1", "Dica 2"],
        "bestTimeToFly": "Sugestão de dia/horário",
        "airlines": ["Lista de cias que operam a rota"]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as RouteInsight;

  } catch (error) {
    console.error("AI Insight Error:", error);
    // Fallback data if AI/Search fails
    return {
      summary: `Voando de ${query.origin} para ${query.destination}.`,
      cheapestPrice: "Sob consulta",
      fastestDuration: "Varíavel",
      mainAirline: "Várias Cias",
      tips: ["Verifique a flexibilidade de datas.", "Reserve com antecedência."],
      airlines: ["Latam", "American", "Tap"],
      bestTimeToFly: "Terças e Quartas"
    };
  }
};
