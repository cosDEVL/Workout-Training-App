const ESERCIZI = [
  {
    id: "0",
    nome: "Panca Piana",
    descrizione: "panca buona per il petto",
    gruppiMuscolari: ["petto", "tricipiti"],
    imgSrc: "img",
    videoSrc: "video",
    custom: false,
  },
  {
    id: "1",
    nome: "Stacco",
    descrizione: "Stacco per la schiena",
    gruppiMuscolari: ["gran dorsale", "dorsale", "lombari"],
    imgSrc: "img",
    videoSrc: "video",
    custom: false,
  },
  {
    id: "2",
    nome: "Squat",
    descrizione: "squat per le gambe",
    gruppiMuscolari: ["quadricipiti", "Femorali", "Glutei"],
    imgSrc: "img",
    videoSrc: "video",
    custom: false,
  },
  {
    id: "3",
    nome: "Lateral raise",
    descrizione: "spalle per le gambe",
    gruppiMuscolari: ["spalle"],
    imgSrc: "img",
    videoSrc: "video",
    custom: true,
  },
];

const SCHEDE = [
  {
    _id: "a",
    nome: "Scheda da powerlifter",
    dataCreazione: "data",
    esercizi: [
      {
        nome: ESERCIZI[_id].nome, // reference a ESERCIZI
        note: "fare piano",
        serie: [
          {
            rep: 10,
            kg: 100,
          },
          {
            rep: 8,
            kg: 120,
          },
          {
            rep: 6,
            kg: 150,
          },
        ],
      },
    ],
  },
];
