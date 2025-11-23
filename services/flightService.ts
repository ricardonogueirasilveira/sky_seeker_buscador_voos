
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

  return { googleLink, skyscannerLink, kayakLink };
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
      Você é um especialista em viagens do Sky Seeker.
      O usuário quer voar de ${originClean} para ${destClean} partindo em ${query.departDate}.
      
      Use o Google Search para encontrar informações RECENTES sobre essa rota:
      1. Preço médio atual.
      2. Melhores companhias aéreas para essa rota.
      3. Dicas rápidas (ex: "compre com antecedência", "voos diretos disponíveis").
      
      Responda em JSON estrito com o formato:
      {
        "summary": "Resumo curto e encorajador sobre a rota e preços atuais.",
        "tips": ["Dica 1", "Dica 2"],
        "bestTimeToFly": "Sugestão de horário ou dia (opcional)",
        "airlines": ["Airline 1", "Airline 2"]
      }
      Não use markdown no output, apenas o JSON puro.
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
    return {
      summary: `Voando de ${query.origin} para ${query.destination}. Prepare suas malas!`,
      tips: ["Verifique a flexibilidade de datas para melhores preços.", "Reserve com pelo menos 3 semanas de antecedência."],
      airlines: ["Latam", "Gol", "Azul"],
      bestTimeToFly: "Terças e Quartas costumam ser mais baratos."
    };
  }
};
