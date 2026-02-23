const SCHEDE = [
  {
    _id: "a",
    nome: "Petto da powerlifer",
    dataCreazione: "DD/MM/YYYY",
    esercizi: [
      {
        nome: "Panca piana", // reference a ESERCIZI
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
      {
        nome: "Panca piana", // reference a ESERCIZI
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
  {
    _id: "a",
    nome: "Gambe da powerlifer",
    dataCreazione: "DD/MM/YYYY",
    esercizi: [
      {
        nome: "Squat", // reference a ESERCIZI
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
  {
    _id: "a",
    nome: "Schiena da powerlifter",
    dataCreazione: "DD/MM/YYYY",
    esercizi: [
      {
        nome: "Stacco da terra", // reference a ESERCIZI
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

export default SCHEDE;
