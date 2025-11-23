
export interface Airport {
  code: string;
  city: string;
  name: string;
  country: string;
}

export const airports: Airport[] = [
  // --- BRASIL (Principais) ---
  { code: 'GRU', city: 'São Paulo', name: 'Guarulhos Intl', country: 'Brasil' },
  { code: 'CGH', city: 'São Paulo', name: 'Congonhas', country: 'Brasil' },
  { code: 'VCP', city: 'Campinas', name: 'Viracopos', country: 'Brasil' },
  { code: 'GIG', city: 'Rio de Janeiro', name: 'Galeão Intl', country: 'Brasil' },
  { code: 'SDU', city: 'Rio de Janeiro', name: 'Santos Dumont', country: 'Brasil' },
  { code: 'BSB', city: 'Brasília', name: 'Pres. Juscelino Kubitschek', country: 'Brasil' },
  { code: 'CNF', city: 'Belo Horizonte', name: 'Confins', country: 'Brasil' },
  { code: 'SSA', city: 'Salvador', name: 'Dep. Luís Eduardo Magalhães', country: 'Brasil' },
  { code: 'REC', city: 'Recife', name: 'Guararapes', country: 'Brasil' },
  { code: 'FOR', city: 'Fortaleza', name: 'Pinto Martins', country: 'Brasil' },
  { code: 'CWB', city: 'Curitiba', name: 'Afonso Pena', country: 'Brasil' },
  { code: 'FLN', city: 'Florianópolis', name: 'Hercílio Luz', country: 'Brasil' },
  { code: 'POA', city: 'Porto Alegre', name: 'Salgado Filho', country: 'Brasil' },
  { code: 'GYN', city: 'Goiânia', name: 'Santa Genoveva', country: 'Brasil' },
  { code: 'MAO', city: 'Manaus', name: 'Eduardo Gomes', country: 'Brasil' },
  { code: 'BEL', city: 'Belém', name: 'Val-de-Cans', country: 'Brasil' },
  { code: 'VIX', city: 'Vitória', name: 'Eurico de Aguiar Salles', country: 'Brasil' },
  { code: 'NAT', city: 'Natal', name: 'Gov. Aluízio Alves', country: 'Brasil' },
  { code: 'MCZ', city: 'Maceió', name: 'Zumbi dos Palmares', country: 'Brasil' },
  { code: 'IGU', city: 'Foz do Iguaçu', name: 'Cataratas', country: 'Brasil' },

  // --- AMÉRICA DO SUL ---
  { code: 'EZE', city: 'Buenos Aires', name: 'Ezeiza Intl', country: 'Argentina' },
  { code: 'AEP', city: 'Buenos Aires', name: 'Aeroparque', country: 'Argentina' },
  { code: 'SCL', city: 'Santiago', name: 'Arturo Merino Benítez', country: 'Chile' },
  { code: 'MVD', city: 'Montevidéu', name: 'Carrasco', country: 'Uruguai' },
  { code: 'BOG', city: 'Bogotá', name: 'El Dorado', country: 'Colômbia' },
  { code: 'LIM', city: 'Lima', name: 'Jorge Chávez', country: 'Peru' },
  { code: 'UIO', city: 'Quito', name: 'Mariscal Sucre', country: 'Equador' },
  { code: 'PTY', city: 'Cidade do Panamá', name: 'Tocumen', country: 'Panamá' },
  { code: 'ASU', city: 'Assunção', name: 'Silvio Pettirossi', country: 'Paraguai' },

  // --- AMÉRICA DO NORTE ---
  { code: 'MIA', city: 'Miami', name: 'Miami Intl', country: 'EUA' },
  { code: 'MCO', city: 'Orlando', name: 'Orlando Intl', country: 'EUA' },
  { code: 'JFK', city: 'Nova York', name: 'John F. Kennedy', country: 'EUA' },
  { code: 'EWR', city: 'Nova York', name: 'Newark Liberty', country: 'EUA' },
  { code: 'LGA', city: 'Nova York', name: 'LaGuardia', country: 'EUA' },
  { code: 'LAX', city: 'Los Angeles', name: 'Los Angeles Intl', country: 'EUA' },
  { code: 'LAS', city: 'Las Vegas', name: 'Harry Reid', country: 'EUA' },
  { code: 'SFO', city: 'São Francisco', name: 'San Francisco Intl', country: 'EUA' },
  { code: 'ORD', city: 'Chicago', name: "O'Hare", country: 'EUA' },
  { code: 'ATL', city: 'Atlanta', name: 'Hartsfield-Jackson', country: 'EUA' },
  { code: 'DFW', city: 'Dallas', name: 'Fort Worth', country: 'EUA' },
  { code: 'YYZ', city: 'Toronto', name: 'Pearson Intl', country: 'Canadá' },
  { code: 'YVR', city: 'Vancouver', name: 'Vancouver Intl', country: 'Canadá' },
  { code: 'YUL', city: 'Montreal', name: 'Trudeau', country: 'Canadá' },
  { code: 'MEX', city: 'Cidade do México', name: 'Benito Juárez', country: 'México' },
  { code: 'CUN', city: 'Cancún', name: 'Cancún Intl', country: 'México' },

  // --- EUROPA ---
  { code: 'LIS', city: 'Lisboa', name: 'Humberto Delgado', country: 'Portugal' },
  { code: 'OPO', city: 'Porto', name: 'Francisco Sá Carneiro', country: 'Portugal' },
  { code: 'LHR', city: 'Londres', name: 'Heathrow', country: 'Reino Unido' },
  { code: 'LGW', city: 'Londres', name: 'Gatwick', country: 'Reino Unido' },
  { code: 'CDG', city: 'Paris', name: 'Charles de Gaulle', country: 'França' },
  { code: 'ORY', city: 'Paris', name: 'Orly', country: 'França' },
  { code: 'MAD', city: 'Madri', name: 'Adolfo Suárez', country: 'Espanha' },
  { code: 'BCN', city: 'Barcelona', name: 'El Prat', country: 'Espanha' },
  { code: 'FCO', city: 'Roma', name: 'Fiumicino', country: 'Itália' },
  { code: 'MXP', city: 'Milão', name: 'Malpensa', country: 'Itália' },
  { code: 'AMS', city: 'Amsterdã', name: 'Schiphol', country: 'Holanda' },
  { code: 'FRA', city: 'Frankfurt', name: 'Frankfurt Intl', country: 'Alemanha' },
  { code: 'MUC', city: 'Munique', name: 'Franz Josef Strauss', country: 'Alemanha' },
  { code: 'BER', city: 'Berlim', name: 'Brandenburg', country: 'Alemanha' },
  { code: 'ZRH', city: 'Zurique', name: 'Zurich', country: 'Suíça' },
  { code: 'IST', city: 'Istambul', name: 'Istanbul Intl', country: 'Turquia' },
  { code: 'DUB', city: 'Dublin', name: 'Dublin', country: 'Irlanda' },

  // --- ÁSIA & ORIENTE MÉDIO ---
  { code: 'DXB', city: 'Dubai', name: 'Dubai Intl', country: 'Emirados Árabes' },
  { code: 'DOH', city: 'Doha', name: 'Hamad Intl', country: 'Catar' },
  { code: 'TLV', city: 'Tel Aviv', name: 'Ben Gurion', country: 'Israel' },
  { code: 'HND', city: 'Tóquio', name: 'Haneda', country: 'Japão' },
  { code: 'NRT', city: 'Tóquio', name: 'Narita', country: 'Japão' },
  { code: 'ICN', city: 'Seul', name: 'Incheon', country: 'Coreia do Sul' },
  { code: 'SIN', city: 'Cingapura', name: 'Changi', country: 'Cingapura' },
  { code: 'BKK', city: 'Bangkok', name: 'Suvarnabhumi', country: 'Tailândia' },
  { code: 'HKG', city: 'Hong Kong', name: 'Hong Kong Intl', country: 'China' },
  { code: 'PEK', city: 'Pequim', name: 'Capital Intl', country: 'China' },
  { code: 'PVG', city: 'Xangai', name: 'Pudong', country: 'China' },
  
  // --- OCEANIA & ÁFRICA ---
  { code: 'SYD', city: 'Sydney', name: 'Kingsford Smith', country: 'Austrália' },
  { code: 'MEL', city: 'Melbourne', name: 'Tullamarine', country: 'Austrália' },
  { code: 'AKL', city: 'Auckland', name: 'Auckland', country: 'Nova Zelândia' },
  { code: 'JNB', city: 'Joanesburgo', name: 'O.R. Tambo', country: 'África do Sul' },
  { code: 'CPT', city: 'Cidade do Cabo', name: 'Cape Town Intl', country: 'África do Sul' },
  { code: 'CAI', city: 'Cairo', name: 'Cairo Intl', country: 'Egito' },
];
