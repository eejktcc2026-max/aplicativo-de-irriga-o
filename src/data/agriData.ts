import { PlantInfo, IrrigationScale, SoilSector, SustainableTip, WaterLog, FarmerUser } from '../types';

export const formatNameFromEmail = (email: string): string => {
  if (!email || !email.includes('@')) return 'Agricultor Carne Gorda/RN';
  const username = email.split('@')[0].trim();
  if (!username) return 'Agricultor Carne Gorda/RN';
  
  const cleanParts = username
    .replace(/([a-zA-Z]+)([0-9]+)/g, '$1 $2')
    .replace(/([0-9]+)([a-zA-Z]+)/g, '$1 $2')
    .split(/[\._\-+\s]+/)
    .filter(Boolean);
    
  if (cleanParts.length > 0) {
    const formatted = cleanParts
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
    return formatted;
  }
  return username.charAt(0).toUpperCase() + username.slice(1);
};

export const INITIAL_USER: FarmerUser = {
  id: 'usr-1',
  name: formatNameFromEmail('eejktcc2026@gmail.com'),
  email: 'eejktcc2026@gmail.com',
  farmName: 'Sítio Carne Gorda',
  location: 'Comunidade Carne Gorda / RN',
  mainCrops: ['Milho', 'Feijão', 'Banana', 'Sorgo', 'Hortaliças'],
  areaHectares: '2.5 hectares',
  isLoggedIn: true,
  accessibleMode: false,
  speechEnabled: true
};

export const IRRIGATION_SCALES: IrrigationScale[] = [
  {
    id: 'baixa',
    title: 'Escala Baixa',
    targetAudience: 'Para Hortas Pequenas & Mudas',
    recommendedCrops: ['Alface', 'Rúcula', 'Cebolinha', 'Coentro', 'Canteiros de Mudas'],
    defaultMinutes: 15,
    flowRate: '1.5 a 2.0 L/m²',
    pressure: 'Baixa (Gotejamento fino)',
    frequency: '1 a 2 vezes ao dia (início da manhã ou fim da tarde)',
    description: 'Irrigação leve e localizada para canteiros pequenos. Evita o encharcamento e preserva as raízes sensíveis das hortaliças.',
    visualCue: '💧 Gotejamento lento e suave, sem poças.',
    color: 'emerald',
    bgGradient: 'from-emerald-950/60 to-emerald-900/30 border-emerald-500/40 text-emerald-300'
  },
  {
    id: 'media',
    title: 'Escala Média',
    targetAudience: 'Para Cultivos Regulares & Legumes',
    recommendedCrops: ['Feijão', 'Tomate', 'Pimentão', 'Mandioca', 'Sorgo em crescimento'],
    defaultMinutes: 30,
    flowRate: '3.5 a 4.5 L/m²',
    pressure: 'Média (Microaspersão / Gotejamento duplo)',
    frequency: 'A cada 1 ou 2 dias conforme a umidade do solo',
    description: 'Vazão equilibrada para plantas de porte médio e tubérculos. Fornece umidade contínua na camada de 15 a 30 cm de profundidade.',
    visualCue: '💧💧 Microaspersão com névoa uniforme cobrindo as linhas.',
    color: 'sky',
    bgGradient: 'from-sky-950/60 to-sky-900/30 border-sky-500/40 text-sky-300'
  },
  {
    id: 'alta',
    title: 'Escala Alta',
    targetAudience: 'Para Plantações Maiores & Pomares',
    recommendedCrops: ['Milho no pendoamento', 'Bananeiras', 'Frutíferas', 'Grandes Talhões'],
    defaultMinutes: 60,
    flowRate: '6.0 a 8.5 L/m²',
    pressure: 'Alta (Aspersão setorial / Tubo perfurado)',
    frequency: 'A cada 2 a 3 dias em dias quentes',
    description: 'Irrigação de alto volume e profundidade para culturas de grande porte e alta evapotranspiração, garantindo grãos e frutos vigorosos.',
    visualCue: '💧💧💧 Aspersor de longo alcance molhando a copa e a base.',
    color: 'indigo',
    bgGradient: 'from-indigo-950/60 to-indigo-900/30 border-indigo-500/40 text-indigo-300'
  }
];

export const PLANTS_DATA: PlantInfo[] = [
  {
    id: 'milho',
    name: 'Milho (Zea mays)',
    scientificName: 'Zea mays',
    recommendedScale: 'Alta',
    waterNeed: '5.5 a 7.0 mm/dia',
    idealFrequency: 'A cada 2 dias (Crítico no florescimento e espigamento)',
    defaultMinutes: 45,
    minMinutes: 15,
    maxMinutes: 90,
    litersPerMinute: 8.5,
    bestTime: '06:00 às 08:00 ou após 17:00',
    description: 'O milho exige bastante água principalmente nas fases de pendoamento, floração e enchimento dos grãos. A falta de água nesta fase diminui o tamanho das espigas.',
    librasDica: '🌽 Sinal Visual: Gesto de segurar a espiga de milho com as duas mãos e descascar.',
    imageTheme: '🌽',
    accentColor: 'from-amber-500 to-yellow-600',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  },
  {
    id: 'sorgo',
    name: 'Sorgo (Sorghum bicolor)',
    scientificName: 'Sorghum bicolor',
    recommendedScale: 'Baixa',
    waterNeed: '3.0 a 4.5 mm/dia',
    idealFrequency: 'A cada 3 ou 4 dias (Muito tolerante à seca)',
    defaultMinutes: 20,
    minMinutes: 10,
    maxMinutes: 60,
    litersPerMinute: 5.0,
    bestTime: 'Manhã cedo',
    description: 'O sorgo possui raízes profundas e folhas que retêm água. É a cultura perfeita para períodos de estiagem e economiza muita água no sítio.',
    librasDica: '🌾 Sinal Visual: Gesto de planta alta com panícula de grãos balançando ao vento.',
    imageTheme: '🌾',
    accentColor: 'from-orange-500 to-amber-700',
    badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/30'
  },
  {
    id: 'banana',
    name: 'Banana (Musa spp.)',
    scientificName: 'Musa spp.',
    recommendedScale: 'Alta',
    waterNeed: '6.0 a 8.5 mm/dia',
    idealFrequency: 'Diário ou a cada 2 dias (Folhas largas transpiram muito)',
    defaultMinutes: 60,
    minMinutes: 20,
    maxMinutes: 120,
    litersPerMinute: 10.0,
    bestTime: 'Início da manhã com sol brando',
    description: 'A bananeira é composta por mais de 85% de água. Exige solo constantemente úmido em torno do pseudocaule, sem criar poças permanentes.',
    librasDica: '🍌 Sinal Visual: Gesto de segurar a banana e descascar três lados com a mão.',
    imageTheme: '🍌',
    accentColor: 'from-yellow-400 to-amber-500',
    badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
  },
  {
    id: 'feijao',
    name: 'Feijão (Phaseolus vulgaris)',
    scientificName: 'Phaseolus vulgaris',
    recommendedScale: 'Média',
    waterNeed: '4.0 a 5.5 mm/dia',
    idealFrequency: 'A cada 2 dias (Evitar molhar as folhas para prevenir fungos)',
    defaultMinutes: 30,
    minMinutes: 15,
    maxMinutes: 60,
    litersPerMinute: 6.0,
    bestTime: 'Fim de tarde diretamente no solo/gotejamento',
    description: 'O feijão tem raiz rasa. Precisa de água regular na fase de floração e formação de vagens. O excesso de umidade pode apodrecer as raízes.',
    librasDica: '🫘 Sinal Visual: Gesto em pinça com os dedos polegar e indicador colhendo grãos de feijão.',
    imageTheme: '🫘',
    accentColor: 'from-emerald-500 to-teal-700',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  }
];

export const INITIAL_SOIL_SECTORS: SoilSector[] = [
  {
    id: 'sec-1',
    name: 'Talhão 1 - Roça de Milho e Feijão',
    crop: 'Milho e Feijão consorciado',
    moisturePercent: 22,
    status: 'seco',
    lastIrrigated: 'Ontem às 06:30',
    recommendedMinutes: 40
  },
  {
    id: 'sec-2',
    name: 'Talhão 2 - Canteiro de Hortaliças',
    crop: 'Alface, Couve e Cheiro-verde',
    moisturePercent: 35,
    status: 'alerta',
    lastIrrigated: 'Hoje às 06:00',
    recommendedMinutes: 15
  },
  {
    id: 'sec-3',
    name: 'Talhão 3 - Bananal da Várzea',
    crop: 'Banana Prata e Nanica',
    moisturePercent: 20,
    status: 'seco',
    lastIrrigated: 'Há 2 dias',
    recommendedMinutes: 50
  },
  {
    id: 'sec-4',
    name: 'Talhão 4 - Área de Sorgo e Forragem',
    crop: 'Sorgo Forrageiro',
    moisturePercent: 55,
    status: 'ideal',
    lastIrrigated: 'Há 3 dias',
    recommendedMinutes: 20
  }
];

export const SUSTAINABLE_TIPS: SustainableTip[] = [
  {
    id: 'tip-1',
    pillar: 'reduza',
    title: 'Reduza o Consumo de Água Irrigando nos Horários Certos',
    subtitle: 'Consuma menos e de forma consciente',
    description: 'Irrigar nas horas mais quentes do dia (11h às 15h) faz até 40% da água evaporar antes de chegar nas raízes. Ao mudar o horário para antes das 8h ou após as 17h, você reduz pela metade o gasto de energia da bomba e economiza milhares de litros.',
    steps: [
      'Ligue a irrigação bem cedinho (entre 06h e 07h30) ou ao entardecer (após 17h).',
      'Cubra o solo com palha seca (mulching): ela retém a umidade da terra por até 3 dias a mais.',
      'Instale torneiras e registros bem vedados para evitar goteiras na tubulação.'
    ],
    farmerBenefit: 'Economia média de 300 a 600 litros de água por dia no pequeno sítio.',
    librasConcept: 'Sinal de "REDUZIR / DIMINUIR": Mãos abertas na horizontal aproximando-se indicando menos volume.',
    implemented: true
  },
  {
    id: 'tip-2',
    pillar: 'reduza',
    title: 'Manejo Inteligente com Teste Prático da Terra',
    subtitle: 'Evite o desperdício de regar solo que já está úmido',
    description: 'Antes de ligar o sistema de irrigação, pegue um punhado de terra a 10 cm de profundidade e aperte na mão. Se formar uma bola que não esfarela, a terra ainda está úmida e não precisa de água hoje.',
    steps: [
      'Faça o teste da terra com as mãos em 3 pontos diferentes da plantação.',
      'Se a terra esfarelar como pó, acione a escala de solo seco.',
      'Ajuste o tempo do relógio para não deixar a água escorrer fora do canteiro.'
    ],
    farmerBenefit: 'Evita a lavagem de nutrientes do solo e previne o apodrecimento da raiz.',
    librasConcept: 'Sinal de "VERIFICAR / OLHAR": Indicador apontando para a palma da mão examinando a terra.',
    implemented: false
  },
  {
    id: 'tip-3',
    pillar: 'reutilize',
    title: 'Dê Novos Usos a Potes, Roupas e Embalagens no Campo',
    subtitle: 'Reutilize materiais do cotidiano para economizar dinheiro',
    description: 'Itens domésticos que iriam para o lixo podem virar excelentes ferramentas no sítio: potes de sorvete viram sementeiras perfeitas, tecidos velhos amarram plantas sem ferir o caule e garrafas viram irrigadores lentos.',
    steps: [
      'Potes plásticos e caixas de leite: fure o fundo e use para germinar mudas de pimentão, tomate e café.',
      'Roupas velhas de algodão: corte em tiras para amarrar os pés de tomate e feijão na estaca (não machuca a planta).',
      'Garrafas PET: encha de água, faça um furinho de agulha na tampa e enterre de ponta-cabeça perto do pé de banana (gotejamento solar contínuo).'
    ],
    farmerBenefit: 'Custo zero em recipientes de mudas e gotejadores caseiros.',
    librasConcept: 'Sinal de "REUTILIZAR / NOVO USO": Duas mãos em círculos giratórios indicando renovação de ciclo.',
    implemented: true
  },
  {
    id: 'tip-4',
    pillar: 'reutilize',
    title: 'Captação e Reuso de Água da Chuva dos Telhados',
    subtitle: 'Aproveite cada gota que cai no galpão ou na casa',
    description: 'Instale calhas simples de bambu ou PVC no telhado da casa ou galpão de ferramentas direcionando para tambores ou cisterna. Essa água limpa e sem cloro é perfeita para irrigar hortaliças.',
    steps: [
      'Coloque uma tela fina na entrada do tambor para filtrar folhas e evitar mosquitos.',
      'Use a água armazenada prioritariamente nos canteiros da horta.',
      'Mantenha o reservatório sempre tampado e na sombra.'
    ],
    farmerBenefit: 'Reserva estratégica para enfrentar semanas de estiagem sem custo.',
    librasConcept: 'Sinal de "CHUVA + GUARDAR": Dedos descendo imitando chuva e mãos segurando o recipiente.',
    implemented: false
  },
  {
    id: 'tip-5',
    pillar: 'recicle',
    title: 'Separe Embalagens de Insumos para Coleta Seletiva',
    subtitle: 'Proteja o solo e os córregos da sua propriedade',
    description: 'Embalagens plásticas de defensivos agrícolas, sacos de adubo e lonas plásticas de silagem não devem ser queimadas nem enterradas no sítio. A queima libera fumaça tóxica e enterrar contamina o lençol freático.',
    steps: [
      'Faça a Tríplice Lavagem dos recipientes vazios (enxágue 3 vezes jogando a água dentro do pulverizador).',
      'Fure o fundo das embalagens para inutilizá-las e guarde no depósito seco.',
      'Entregue nos postos de recebimento da sua cooperativa ou prefeitura (logística reversa).',
      'Separe os sacos plásticos de ração e adubo limpos para o caminhão da coleta seletiva.'
    ],
    farmerBenefit: 'Cumprimento da lei ambiental, saúde da família rural e preservação da terra para os filhos.',
    librasConcept: 'Sinal de "RECICLAGEM / SEPARAÇÃO": Mãos separando objetos em caixas distintas com símbolo de seta.',
    implemented: true
  },
  {
    id: 'tip-6',
    pillar: 'recicle',
    title: 'Compostagem dos Restos de Colheita e Esterco',
    subtitle: 'Transforme sobras em adubo orgânico rico e grátis',
    description: 'Em vez de queimar palhadas e restos de capina, junte tudo em uma pilha com esterco de galinha ou gado. Em 60 a 90 dias você terá um adubo orgânico de altíssima qualidade que melhora a retenção de água do solo.',
    steps: [
      'Alterne camadas de matéria seca (palha, folhas) e matéria úmida (restos de verdura, esterco).',
      'Mantenha a pilha úmida (como esponja espremida) e revire a cada 15 dias.',
      'Espalhe o adubo pronto nos canteiros antes do plantio.'
    ],
    farmerBenefit: 'Solo retém 3x mais umidade, reduzindo a necessidade de regas frequentes.',
    librasConcept: 'Sinal de "TERRA + FOLHAS + TRANSFORMAR": Mãos misturando a terra e abrindo como adubo.',
    implemented: true
  }
];

export const INITIAL_WATER_LOGS: WaterLog[] = [
  {
    id: 'log-1',
    date: 'Hoje, 07:15',
    plantOrSector: 'Talhão de Banana',
    scaleUsed: 'Escala Alta',
    durationMinutes: 45,
    litersUsed: 450,
    litersSaved: 180
  },
  {
    id: 'log-2',
    date: 'Hoje, 06:00',
    plantOrSector: 'Horta Pequena (Alface/Couve)',
    scaleUsed: 'Escala Baixa',
    durationMinutes: 15,
    litersUsed: 90,
    litersSaved: 60
  },
  {
    id: 'log-3',
    date: 'Ontem, 17:30',
    plantOrSector: 'Milharal e Feijoeiro',
    scaleUsed: 'Escala Média',
    durationMinutes: 30,
    litersUsed: 220,
    litersSaved: 110
  },
  {
    id: 'log-4',
    date: 'Há 2 dias',
    plantOrSector: 'Área de Sorgo',
    scaleUsed: 'Escala Baixa',
    durationMinutes: 20,
    litersUsed: 100,
    litersSaved: 75
  }
];

// Dicionário Visual / Gestual para o Modo Acessível para Surdos
export const LIBRAS_VISUAL_CARDS = [
  {
    term: 'Água / Irrigar',
    icon: '💧',
    signalDesc: 'Mão em formato de letra "L" perto da boca, ou dedos abrindo como gotas caindo sobre a terra.',
    meaning: 'Fornecer água na medida certa para as raízes das plantas.'
  },
  {
    term: 'Solo Seco',
    icon: '☀️',
    signalDesc: 'Mão fechando como terra esfarelando, indicando calor e necessidade urgente de água.',
    meaning: 'Umidade abaixo de 30%. É necessário ligar a irrigação.'
  },
  {
    term: 'Planta Crescendo',
    icon: '🌱',
    signalDesc: 'Mão fechada subindo e abrindo os dedos como uma folha brotando para o alto.',
    meaning: 'Desenvolvimento saudável da lavoura e hortaliças.'
  },
  {
    term: 'Reduzir (Consumo Consciente)',
    icon: '📉',
    signalDesc: 'Palmas voltadas para baixo descendo em nível, indicando economia e menos gasto.',
    meaning: 'Usar somente a quantidade necessária de água e insumos.'
  },
  {
    term: 'Reutilizar',
    icon: '🔄',
    signalDesc: 'Mãos em círculos contínuos se conectando em ciclo de novo uso.',
    meaning: 'Dar nova utilidade a potes, roupas velhas e garrafas no sítio.'
  },
  {
    term: 'Reciclar / Separar',
    icon: '♻️',
    signalDesc: 'Dedos em forma de triângulo móvel ou gesto de triagem em recipientes separados.',
    meaning: 'Destinar embalagens para coleta seletiva e compostar restos.'
  }
];
